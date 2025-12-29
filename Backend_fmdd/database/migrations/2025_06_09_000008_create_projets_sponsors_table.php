<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsSponsorsTable extends Migration
{
    public function up(): void
    {
        Schema::create('projets_sponsors', function (Blueprint $table) {
            $table->unsignedBigInteger('projet_id');
            $table->unsignedInteger('sponsor_id');
            $table->string('type_sponsoring', 100)->nullable();
            $table->decimal('montant', 15, 2)->nullable();
            $table->text('contreparties')->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->primary(['projet_id', 'sponsor_id']);
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
            $table->foreign('sponsor_id')->references('id')->on('sponsors')->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('projets_sponsors');
    }
}
