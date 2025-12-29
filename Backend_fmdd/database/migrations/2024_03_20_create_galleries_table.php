<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image');
            $table->json('categories')->nullable();
            $table->enum('type', ['image', 'video'])->default('image');
            $table->string('url_video')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('actif')->default(true);
            $table->integer('ordre')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('galleries');
    }
}; 