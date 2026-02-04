<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constraned()->onDelete('cascade');
            $table->string('auteur')->nullable();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->text('contenu');
            $table->string('image_principale')->nullable();
            $table->text('resume');
            $table->json('tags')->nullable();
            $table->json('meta_data')->nullable();
            $table->enum('statut', ['brouillon', 'publie', 'archive'])->default('brouillon');
            $table->timestamp('date_publication')->nullable();
            $table->integer('temps_lecture')->default(0);
            $table->integer('vues')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog');
    }
};