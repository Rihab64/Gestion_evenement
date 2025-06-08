<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {  
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
           $table->unsignedBigInteger('category_id')->nullable();
            $table->string('name');
            $table->text('description');
            $table->date('event_date');
            $table->time('event_time');
            $table->string('location');
            $table->text('address');
            $table->integer('guest_count');
            $table->decimal('budget', 10, 2);
            $table->enum('status', ['draft', 'planning', 'confirmed', 'completed', 'cancelled'])->default('draft');
            $table->integer('progress')->default(0);
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->index('client_id');
            $table->index('category_id');
            $table->index('status');
        });
    }

    public function down(): void
    {    Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('events');
    }
};