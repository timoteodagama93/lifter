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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->string('category');
            $table->string('producer')->nullable();
            $table->text('description')->nullable();
            $table->string('saved_name');
            $table->string('original_name');
            $table->text('url');
            $table->string('mime_type');
            $table->string('extension');
            $table->integer('stars')->default(0);
            $table->integer('plays')->default(0);
            $table->integer('likes')->default(0);
            $table->integer('reprodution_time')->default(0);
            $table->integer('downloads')->default(0);
            $table->integer('shares')->default(0);
            $table->boolean('destaque')->default(false);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
