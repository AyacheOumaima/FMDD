<?php

namespace App\Http\Controllers;

use App\Http\Resources\EquipeFmddResource;
use App\Models\EquipeFmdd;
use Illuminate\Http\Request;

class EquipeFmddController extends Controller
{
    /**
     * Afficher la liste des membres de l'équipe FMDD.
     */
    public function index()
    {
        $membres = EquipeFmdd::where('actif', true)
            ->orderBy('ordre_affichage')
            ->get();
            
        return EquipeFmddResource::collection($membres);
    }

    /**
     * Afficher les détails d'un membre spécifique.
     */
    public function show(EquipeFmdd $membre)
    {
        return new EquipeFmddResource($membre);
    }
}