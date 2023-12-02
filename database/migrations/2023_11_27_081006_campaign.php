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
        Schema::create('campaigns', function ($table) {
            $table->ulid('id');
            $table->foreignUlid('song_id')->constrained(table: 'songs', column: 'id');
            $table->string('numero')->nullable();
            $table->string('codigo');

            $table->string('age')->nullable();
            $table->string('gender')->nullable();
            $table->string('ocupation')->nullable();
            $table->string('formation')->nullable();
            $table->string('location')->nullable();

            $table->string('goals')->default('Avaliações');
            $table->integer('goal_size')->default(0);
            $table->integer('days')->default(0);

            $table->boolean('lifter')->default(true);
            $table->boolean('produtoras')->default(false);
            $table->boolean('djs')->default(false);
            $table->boolean('influencers')->default(false);
            $table->boolean('agentes')->default(false);
            $table->boolean('prmotores')->default(false);
            $table->boolean('blogueiros')->default(false);

            $table->boolean('interna')->default(true);
            $table->boolean('facebook')->default(false);
            $table->boolean('tiktok')->default(false);
            $table->boolean('instagram')->default(false);
            $table->boolean('youtube')->default(false);

            $table->integer('budget')->default(0);
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
