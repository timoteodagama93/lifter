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
        Schema::create('users_platforms_integrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(table: 'users', column: 'id')->onDelete('CASCADE')
                ->onUpdate('CASCADE');
            $table->string('platform_name');
            $table->integer('shares')->default(0);
            $table->integer('publications')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_platforms_integrations');
    }
};
