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
        Schema::create('festivais', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('resumo');
            $table->mediumText('o_que_e');
            $table->mediumText('para_quem_e');
            $table->date('inicio')->nullable();
            $table->date('termino')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('festivais');
    }
};
