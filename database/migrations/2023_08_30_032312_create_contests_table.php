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
        Schema::create('contests', function (Blueprint $table) {
            $table->ulid('id');
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id');
            $table->string('designacao');
            $table->string('descricao');
            $table->string('estilo_musical');
            $table->date('inicio_inscricoes')->nullable();
            $table->date('inicio_votacoes')->nullable();
            $table->date('termino_inscricoes')->nullable();
            $table->date('termino_votacoes')->nullable();
            $table->date('total_premios')->nullable();
            $table->date('tipo_premio')->nullable();
            $table->date('lugar_1')->nullable();
            $table->date('lugar_2')->nullable();
            $table->date('lugar_3')->nullable();
            $table->date('premios_extras')->nullable();
            $table->boolean('activo')->default(true);
            $table->string('estado')->default('PUBLICADO');
            $table->string('url_cover')->nullable();
            $table->string('cover_mime_type')->nullable();
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
        Schema::dropIfExists('contests');
    }
};
