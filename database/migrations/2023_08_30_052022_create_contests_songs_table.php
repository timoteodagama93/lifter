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
            $table->ulid();
            $table->string('designacao');
            $table->string('descricao');
            $table->string('estilo_musical');
            $table->date('inicio_inscricoes')->nullable();
            $table->date('inicio_votacoes')->nullable();
            $table->date('termino_inscricoes')->nullable();
            $table->date('termino_votacoes')->nullable();
            $table->boolean('activo')->default(true);
            $table->string('estado')->default('PUBLICADO');
            $table->string('url_cover')->nullable();
            $table->string('url_schedule')->nullable();
            $table->string('url_beneficios')->nullable();
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
