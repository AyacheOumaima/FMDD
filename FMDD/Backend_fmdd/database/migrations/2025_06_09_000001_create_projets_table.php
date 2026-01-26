<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsTable extends Migration
{
    public function up(): void
    {
        Schema::create('projets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titre_projet')->nullable();
            $table->text('description_projet')->nullable();
            $table->string('theme')->nullable();
            $table->timestamp('date_projet')->nullable();
            $table->string('statut_projet')->nullable();
            $table->string('image')->nullable();
            $table->text('description_detaillee')->nullable();
            $table->string('organisateur')->nullable();
            $table->string('localisation')->nullable();
            $table->string('duree')->nullable();
            $table->string('image_partenaire')->nullable();
            $table->text('objectif_projet')->nullable();
            $table->text('grande_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projets');
    }
}
