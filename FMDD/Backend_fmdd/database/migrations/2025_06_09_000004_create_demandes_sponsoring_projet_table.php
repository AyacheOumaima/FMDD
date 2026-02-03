<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandesSponsoringProjetTable extends Migration
{
    public function up(): void
    {
        Schema::create('demandes_sponsoring_projet', function (Blueprint $table) {
            $table->increments('id');
            $table->string('organisation');
            $table->string('contact_nom');
            $table->string('email');
            $table->string('telephone');
            $table->unsignedBigInteger('projet_id');
            $table->string('type_sponsoring_souhaite');
            $table->decimal('montant_propose', 15, 2)->nullable();
            $table->text('contreparties_demandees')->nullable();
            $table->date('date_demande')->nullable();
            $table->enum('statut', ['En attente', 'Approuvée', 'Rejetée'])->default('En attente');
            $table->timestamps();
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes_sponsoring_projet');
    }
}
