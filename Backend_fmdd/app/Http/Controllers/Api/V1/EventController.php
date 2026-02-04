<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\File; // Necessary for handling files

class EventController extends Controller
{
    // =========================================================================
    // READ METHODS (Index & Show)
    // =========================================================================

    public function index(Request $request)
    {
        $query = Event::query();
        
        // Handle inclusions (relationships)
        if ($request->has('include')) {
            $includes = explode(',', $request->include);
            if (in_array('intervenants', $includes)) {
                $query->with('intervenants');
            }
            if (in_array('registrations', $includes)) {
                $query->withCount(['registrations', 'acceptedRegistrations as accepted_count']);
            }
        }

        // Filters
        if ($request->has('type')) {
            $query->where('type_evenement', $request->type);
        }

        if ($request->has('categorie')) {
            $query->where('categorie', $request->categorie);
        }

        if ($request->boolean('upcoming', false)) {
            $query->where('date', '>=', now()->toDateString());
        }

        // Sorting
        $sortBy = $request->input('sort_by', 'date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortBy, $sortDirection);

        // Pagination
        $perPage = $request->input('per_page', 10);
        $events = $query->paginate($perPage);

        return response()->json($events);
    }

    public function show($id, Request $request)
    {
        $event = Event::with(['intervenants', 'registrations' => function($query) {
            $query->select('id', 'event_id', 'statut', 'statut_paiement');
        }])->findOrFail($id);

        // Check user registration status logic
        if (auth()->check()) {
            $user = auth()->user();
            $registration = $event->getUserRegistration($user);
            
            $event->user_registration_status = $registration ? [
                'is_registered' => true,
                'status' => $registration->statut,
                'payment_status' => $registration->statut_paiement,
                'can_register' => false,
                'registration_id' => $registration->id
            ] : [
                'is_registered' => false,
                'can_register' => $event->hasAvailableSpots() && $event->isRegistrationOpen(),
                'requires_adherent' => $event->type_evenement === 'payant' && !$user->isAdherentActif()
            ];
        } else {
            $event->user_registration_status = [
                'is_registered' => false,
                'can_register' => $event->hasAvailableSpots() && $event->isRegistrationOpen(),
                'requires_auth' => true
            ];
        }

        // Format response data
        $data = $event->toArray();
        $data['registration_info'] = [
            'is_open' => $event->isRegistrationOpen(),
            'has_spots' => $event->hasAvailableSpots(),
            'total_spots' => $event->limite_de_places,
            'registered_count' => $event->nombre_inscrits,
            'spots_left' => $event->limite_de_places > 0 ? 
                $event->limite_de_places - $event->nombre_inscrits : null,
            'is_full' => !$event->hasAvailableSpots(),
            'registration_deadline' => [
                'date' => $event->date_limite_d_inscription,
                'time' => $event->heure_limite_d_inscription
            ]
        ];

        if (!isset($data['intervenants'])) {
            $data['intervenants'] = $event->intervenants->toArray();
        }

        return response()->json($data);
    }

    // =========================================================================
    // WRITE METHODS (Store, Update, Destroy)
    // =========================================================================

    /**
     * Create a new event.
     */
    public function store(Request $request)
    {
        // 1. Validate
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'heure' => 'nullable',
            'lieu' => 'nullable|string',
            'ville' => 'nullable|string',
            'type_evenement' => 'nullable|string',
            'categorie' => 'nullable|string',
            'image' => 'nullable|image|max:5120', // Max 5MB
            'limite_de_places' => 'nullable|integer',
            'date_limite_d_inscription' => 'nullable|date',
            'heure_limite_d_inscription' => 'nullable',
            'prix' => 'nullable|numeric'
        ]);

        // 2. Upload Image
        if ($request->hasFile('image')) {
            // Stores in storage/app/public/events
            $path = $request->file('image')->store('events', 'public');
            // Adds 'storage/' prefix for frontend access
            $validated['image'] = 'storage/' . $path;
        }

        // 3. Save to DB
        $event = Event::create($validated);

        return response()->json([
            'message' => 'Event created successfully',
            'data' => $event
        ], 201);
    }

    /**
     * Update an existing event.
     */
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        // 1. Validate
        $validated = $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'heure' => 'nullable',
            'ville' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            // Add other fields as 'nullable' or 'sometimes' so partial updates don't fail
        ]);

        // 2. Handle Image Replacement
        if ($request->hasFile('image')) {
            // If there is an old image, delete it to save server space
            if ($event->image && File::exists(public_path($event->image))) {
                File::delete(public_path($event->image));
            }
            
            // Upload new image
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        // 3. Update DB
        $event->update($validated);

        return response()->json([
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }

    /**
     * Delete an event (Soft Delete).
     */
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // NOTE: Since we are using SoftDeletes in the Model, 
        // we do NOT delete the physical image file here.
        // If we deleted the image file, restoring the event later would result in a broken image.
        
        $event->delete(); // This updates 'deleted_at' column in DB

        return response()->json(['message' => 'Event moved to trash successfully']);
    }
}