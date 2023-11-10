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
        Schema::create('festival_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('festival_id')->constrained(table: 'festivais', column: 'id');
            $table->string('user_id');
            $table->string('as');
            $table->integer('how_much')->nullable();
            $table->mediumText('suggestion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('festival_users');
    }
};
