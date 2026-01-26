<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Apropos;
use App\Models\EquipeFmdd;
use App\Models\Histoire;
use App\Models\Objectif;
use App\Models\Partenaire;
use App\Models\ServiceProfil;
use Illuminate\Http\JsonResponse;

class AproposController extends Controller
{
    /**
     * Récupérer toutes les informations de la section À propos
     */
    public function index(): JsonResponse
    {
        try {
            $data = [
                'apropos' => Apropos::first(),
                'equipe' => EquipeFmdd::where('actif', true)
                    ->orderBy('ordre_affichage')
                    ->get(),
                'objectifs' => Objectif::where('actif', true)
                    ->orderBy('ordre_affichage')
                    ->get(),
                'histoire' => Histoire::where('actif', true)
                    ->orderBy('date_evenement', 'desc')
                    ->get(),
                'partenaires' => Partenaire::where('actif', true)
                    ->orderBy('ordre_affichage')
                    ->get(),
                'services_profils' => ServiceProfil::where('actif', true)
                    ->orderBy('ordre_affichage')
                    ->get()
            ];

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des données',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer uniquement les informations générales
     */
   public function getInfosGenerales(): JsonResponse
{
    return response()->json(
        Apropos::first() ?? []
    );
}


    /**
     * Récupérer l'équipe FMDD
     */
    public function getEquipe(): JsonResponse
    {
        $equipe = EquipeFmdd::where('actif', true)
            ->orderBy('ordre_affichage')
            ->get();

        return response()->json($equipe);
    }

    /**
     * Récupérer les objectifs
     */
    public function getObjectifs(): JsonResponse
    {
        $objectifs = Objectif::where('actif', true)
            ->orderBy('ordre_affichage')
            ->get();

        return response()->json($objectifs);
    }

    /**
     * Récupérer l'histoire
     */
    public function getHistoire(): JsonResponse
    {
        $histoire = Histoire::where('actif', true)
            ->orderBy('date_evenement', 'desc')
            ->get();

        return response()->json($histoire);
    }

    /**
     * Récupérer les partenaires
     */
    public function getPartenaires(): JsonResponse
    {
        $partenaires = Partenaire::where('actif', true)
            ->orderBy('ordre_affichage')
            ->get();

        return response()->json($partenaires);
    }

    /**
     * Récupérer les services par profil
     */
 public function getServicesProfils(): JsonResponse
{
    $services = ServiceProfil::where('actif', true)
        ->orderBy('ordre_affichage')
        ->get();

    return response()->json($services);
}

}
