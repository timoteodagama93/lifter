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
        Schema::create('songs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('artist_id')->constrained(table: 'artists', column: 'id');
            $table->string('title');
            $table->string('genre');
            $table->string('artist');
            $table->string('gravadora')->nullable();
            $table->string('mime_type');
            $table->string('extension');
            $table->string('participacoes')->nullable();
            $table->string('letra')->nullable();
            $table->string('cover')->nullable();
            $table->string('url');
            $table->string('path')->nullable();
            $table->integer('stars')->default(0);
            $table->integer('downloads')->default(0);
            $table->integer('shares')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
