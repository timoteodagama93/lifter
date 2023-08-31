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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('saldo')->default(0);
            $table->bigInteger('total_ganho')->default(0);
            $table->bigInteger('total_saques')->default(0);
            $table->bigInteger('total_transferido')->default(0);
            $table->bigInteger('total_investido')->default(0);
            $table->bigInteger('total_doado')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
