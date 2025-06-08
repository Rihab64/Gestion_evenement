<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ajoute uniquement les colonnes qui n'existent pas déjà
            // $table->enum('user_type', ['client', 'provider', 'admin'])->default('client')->after('id')->index();
            // $table->string('phone')->nullable()->after('email')->index();
            // $table->timestamp('email_verified_at')->nullable()->after('email');
            // $table->rememberToken()->after('password');
            // $table->enum('status', ['active', 'inactive', 'banned'])->default('active')->after('user_type')->index();
            // created_at et updated_at existent déjà dans la table users par défaut
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ne rien supprimer car rien n'a été ajouté ici
            // $table->dropColumn(['user_type', 'phone', 'status', 'email_verified_at', 'remember_token']);
        });
    }
};