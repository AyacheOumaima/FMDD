<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // La colonne 'auteur' existe déjà dans la table 'blog', donc on ne fait rien ici
    }

    public function down(): void
    {
        // On ne retire pas la colonne 'auteur' car elle fait partie de la migration principale
    }
};
