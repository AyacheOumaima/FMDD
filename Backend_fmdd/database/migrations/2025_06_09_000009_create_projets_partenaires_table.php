<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsPartenairesTable extends Migration
{
    public function up(): void
    {
        Schema::create('projets_partenaires', function (Blueprint $table) {
            $table->unsignedBigInteger('projet_id');
            $table->unsignedInteger('partenaire_id'); // Corrigé pour correspondre à la table partenaires
            $table->string('type_partenariat', 100)->nullable();
            $table->text('engagement')->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->primary(['projet_id', 'partenaire_id']);
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
            $table->foreign('partenaire_id')->references('id')->on('partenaires')->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('projets_partenaires');
    }
}
