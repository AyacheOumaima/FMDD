<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('contact_us', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('nom_complet');
            $table->string('email');
            $table->string('objet');
            $table->text('message');
            $table->enum('statut', ['non_lu', 'lu', 'traite', 'archive'])->default('non_lu');
            $table->timestamp('date_lecture')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_us');
    }
}; 