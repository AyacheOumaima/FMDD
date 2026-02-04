<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Adherent;
use App\Models\User;
use App\Models\Projet;
use App\Models\Formation;
use App\Models\Event;
use App\Models\Insertion;
use App\Models\Temoignage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function stats()
    {
        $stats = [
            // Adherents statistics
            'total_adherents' => Adherent::count(),
            'adherents_actifs' => Adherent::where('statut_cotisation', Adherent::STATUT_PAYEE)->count(),
            'adherents_en_attente' => Adherent::where('statut_cotisation', Adherent::STATUT_EN_ATTENTE)->count(),
            'adherents_expires' => Adherent::where('statut_cotisation', Adherent::STATUT_EXPIREE)->count(),
            
            // Global statistics
            'total_users' => User::count(),
            'total_projets' => Projet::count(),
            'total_formations' => Formation::count(),
            'total_evenements' => Event::count(),
            'total_insertions' => Insertion::count(),
            'total_temoignages' => Temoignage::count(),
            
            'cotisations_mensuelles' => DB::table('adherents')
                ->whereYear('created_at', date('Y'))
                ->select(
                    DB::raw('MONTH(created_at) as month'),
                    DB::raw('COUNT(*) as total')
                )
                ->groupBy('month')
                ->get()
        ];

        return response()->json($stats);
    }

    public function adherents()
    {
        $adherents = Adherent::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($adherents);
    }

    public function payments()
    {
        $payments = Adherent::with('user')
            ->select(
                'id',
                'user_id',
                'statut_cotisation',
                'date_debut_adhesion',
                'date_fin_adhesion',
                'created_at'
            )
            ->orderBy('date_debut_adhesion', 'desc')
            ->paginate(10);

        return response()->json($payments);
    }
}
