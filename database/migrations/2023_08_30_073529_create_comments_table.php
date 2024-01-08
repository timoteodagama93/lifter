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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained(table: 'users', column: 'id');
            $table->string('collection_id');
            $table->string('collection_type');
            $table->string('comment');
            $table->boolean('public')->default(true);
            $table->boolean('status_saw')->default(false);
            $table->integer('likes')->default(0);
            $table->integer('dislikes')->default(0);
            $table->integer('answers')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
