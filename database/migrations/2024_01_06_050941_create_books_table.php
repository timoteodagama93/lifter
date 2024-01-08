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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estante_id')->nullable()->constrained(table: 'estantes', column: 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->string('category');
            $table->text('resume')->nullable();
            $table->integer('likes')->default(0);
            $table->integer('shares')->default(0);
            $table->integer('downloads')->default(0);
            $table->integer('comments')->default(0);
            $table->integer('stars')->default(0);
            $table->integer('views')->default(0);
            $table->string('mime_type')->nullable();
            $table->string('extension')->nullable();
            $table->text('book_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
