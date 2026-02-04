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
        Schema::table('temoignages', function (Blueprint $table) {
              $table->enum('statut', ['en_attente', 'accepte', 'refuse'])->default('en_attente')->after('is_visible');
            $table->boolean('is_a_la_une')->default(false)->after('statut');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('temoignages', function (Blueprint $table) {
            $table->dropColumn(['statut', 'is_a_la_une']);
        });
    }
};
