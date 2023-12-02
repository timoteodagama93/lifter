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
        Schema::create('jurados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id');
            $table->string('contest_id');
            $table->string('name');
            $table->string('active')->default(false);
            $table->integer('given_votes')->default(0);
            $table->string('contact')->nullable();
            $table->string('ocupation');
            $table->string('bio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurados');
    }
};
