<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBenevolesTable extends Migration
{
    public function up(): void
    {
        Schema::create('benevoles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedInteger('demande_id');
            $table->date('date_approbation')->nullable();
            $table->enum('statut', ['en_attente', 'approuve', 'refuse'])->default('en_attente');
            $table->text('commentaire')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('demande_id')->references('id')->on('demandes_benevolat')->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('benevoles');
    }
}
