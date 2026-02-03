<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsBenevolesTable extends Migration
{
    public function up(): void
    {
        Schema::create('projets_benevoles', function (Blueprint $table) {
            $table->unsignedBigInteger('projet_id');
            $table->unsignedInteger('benevole_id');
            $table->string('role', 100)->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->integer('heures_effectuees')->nullable();
            $table->primary(['projet_id', 'benevole_id']);
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
            $table->foreign('benevole_id')->references('id')->on('benevoles')->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('projets_benevoles');
    }
}
