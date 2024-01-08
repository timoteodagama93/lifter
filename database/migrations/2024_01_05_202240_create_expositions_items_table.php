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
        Schema::create('expositions_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exposition_id')->nullable()->constrained(table: 'expositions', column: 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->string('category');
            $table->text('description')->nullable();
            $table->integer('likes')->default(0);
            $table->integer('shares')->default(0);
            $table->integer('downloads')->default(0);
            $table->integer('comments')->default(0);
            $table->integer('stars')->default(0);
            $table->string('mime_type');
            $table->string('extension');
            $table->text('item_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expositions_items');
    }
};
