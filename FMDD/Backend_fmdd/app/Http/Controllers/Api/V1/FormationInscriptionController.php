<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FormationInscription;
use Illuminate\Http\Request;

class FormationInscriptionController extends Controller
{
    //
     public function store(Request $request)
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'nom_complet' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required'
        ]);

        FormationInscription::create($request->all());

        return response()->json([
            'message' => 'Inscription enregistrée avec succès'
        ], 201);
    }
}
