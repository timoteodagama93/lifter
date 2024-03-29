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
        Schema::create('artists', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->foreignId('user_id')->nullable()->constrained(table: 'users', column: 'id')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('name');
            $table->string('genres');
            $table->boolean('active')->default(false);
            $table->string('contact');
            $table->string('country');
            $table->string('about');
            $table->string('city');
            $table->string('url_cover')->nullable();
            $table->string('path_cover')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artists');
    }
};
