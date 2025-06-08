<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('service_id');
            $table->text('message')->nullable();
            $table->string('budget_range')->nullable();
            $table->enum('status', ['pending', 'quoted', 'accepted', 'rejected', 'cancelled'])->default('pending');
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('provider_id')->references('id')->on('providers')->onDelete('cascade');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->index(['client_id', 'provider_id', 'event_id', 'service_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};