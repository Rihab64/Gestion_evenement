<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'phone',
        'status',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'user_type' => 'string',
        'status' => 'string',
        'email_verified_at' => 'datetime',
    ];

    // Relations
    public function client()
    {
        return $this->hasOne(Client::class);
    }

    public function provider()
    {
        return $this->hasOne(Provider::class);
    }

    // Helpers
    public function isClient(): bool
    {
        return $this->user_type === 'client';
    }

    public function isProvider(): bool
    {
        return $this->user_type === 'provider';
    }

    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }

    // Scopes
    public function scopeClients($query)
    {
        return $query->where('user_type', 'client');
    }

    public function scopeProviders($query)
    {
        return $query->where('user_type', 'provider');
    }

    public function scopeAdmins($query)
    {
        return $query->where('user_type', 'admin');
    }
}