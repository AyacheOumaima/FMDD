<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('insertions', function (Blueprint $table) {
            $table->id();
            $table->string('poste');          // poste
            $table->string('entreprise');        // entreprise
            $table->string('ville');           // ville
            $table->date('date_début')->nullable(); // date de début
            $table->string('type_contrat');   // type de contrat
            $table->string('image')->nullable();   // photo
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('insertions');
    }
};
