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
        Schema::create('estantes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained(table: 'users', column: 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->string('author');
            $table->string('category');
            $table->text('description');
            $table->string('saved_name')->nullable();
            $table->string('original_name')->nullable();
            $table->text('mime_type')->nullable();
            $table->text('extension')->nullable();
            $table->string('cover')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estantes');
    }
};
