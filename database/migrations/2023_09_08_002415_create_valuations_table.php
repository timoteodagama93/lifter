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
        Schema::create('valuations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id');
            $table->string('collection_id');
            $table->string('collection_type');
            $table->integer('stars')->default(0);
            $table->integer('points')->default(0);
            $table->boolean('negative')->default(false);
            $table->string('why_negative')->nullable();
            $table->string('emotion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('valuations');
    }
};
