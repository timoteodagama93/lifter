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
        Schema::create('profissionals', function (Blueprint $table) {
            $table->id();
            $table->ulid();
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id');
            $table->string('name');
            $table->string('category');
            $table->string('level')->default('Junior');
            $table->integer('points')->default(0);
            $table->bigInteger('wallet_credit')->default(0);
            $table->string('contact')->nullable();
            $table->string('country')->nullable();
            $table->string('about')->nullable();
            $table->string('city')->nullable();
            $table->text('url_cover')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profissionals');
    }
};
