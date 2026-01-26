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
        Schema::create('partenaires', function (Blueprint $table) {
            $table->unsignedInteger('id', true); // Correction : unsignedInteger pour compatibilité clé étrangère
            $table->string('nom', 200);
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('site_web')->nullable();
            $table->enum('type', ['strategique', 'financier', 'technique', 'academique', 'autre'])->default('autre');
            $table->integer('ordre_affichage')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partenaires');
    }
};
