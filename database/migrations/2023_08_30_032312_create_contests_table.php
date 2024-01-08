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
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('designacao');
            $table->string('categoria');
            $table->string('subcategoria');
            $table->string('descricao');
            $table->date('inicio')->nullable();
            $table->date('fim')->nullable();
            $table->boolean('activo')->default(false);
            $table->string('estado')->default('PUBLICADO');
            $table->string('url_cover')->nullable();
            $table->string('cover_mime_type')->nullable();
            $table->string('cover_extension')->nullable();
            $table->string('url_beneficios')->nullable();
            $table->string('url_termos_condicoes')->nullable();
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
