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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained(table: 'users', indexName: 'id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->longText('post_text');
            $table->string('community')->default('musica');
            $table->string('from')->default('comunidade');
            $table->string('mime_type')->nullable();
            $table->string('file_url')->nullable();
            $table->string('file_path')->nullable();
            $table->integer('likes')->default(0);
            $table->integer('dislikes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
