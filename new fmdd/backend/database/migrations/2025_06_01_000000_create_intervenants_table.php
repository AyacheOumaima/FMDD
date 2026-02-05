<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('intervenants', function (Blueprint $table) {
            $table->id();
            // Correction : utiliser 'events' au lieu de 'evenements'
            $table->foreignId('evenement_id')->constrained('events')->onDelete('cascade');
            $table->string('nom');
            $table->string('prenom');
            $table->string('fonction')->nullable();
            $table->string('email');
            $table->string('telephone', 20)->nullable();
            $table->text('biographie')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intervenants');
    }
};