<?php

use Illuminate\Database\DBAL\TimestampType;
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
        Schema::create('contests_songs', function (Blueprint $table) {
            $table->id();
            $table->string('contest_name');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('url_cover')->nullable();
            $table->string('url_terms')->nullable();
            $table->string('url_conditions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contests_songs');
    }
};