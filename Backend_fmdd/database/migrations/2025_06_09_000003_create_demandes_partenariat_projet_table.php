<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandesPartenariatProjetTable extends Migration
{
    public function up(): void
    {
        Schema::create('demandes_partenariat_projet', function (Blueprint $table) {
            $table->increments('id');
            $table->string('organisation');
            $table->string('contact_nom');
            $table->string('email');
            $table->string('telephone');
            $table->unsignedBigInteger('projet_id');
            $table->string('type_partenariat_souhaite');
            $table->text('engagement_propose')->nullable();
            $table->text('retour_demande')->nullable();
            $table->date('date_demande')->nullable();
            $table->enum('statut', ['En attente', 'Approuvée', 'Rejetée'])->default('En attente');
            $table->timestamps();
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes_partenariat_projet');
    }
}
