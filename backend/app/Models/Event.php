<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{     use HasFactory,SoftDeletes;
    protected $fillable = [
        'client_id',
        'category_id',
        'name',
        'description',
        'event_date',
        'event_time',
        'location',
        'address',
        'guest_count',
        'budget',
        'status',
        'progress',
    ];

    protected $casts = [
        'event_date' => 'date',
        'event_time' => 'datetime:H:i',
        'budget' => 'float',
        'progress' => 'integer',
        'status' => 'string',
    ];

    // Relations
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'event_id');
    }

    public function requests()
    {
        return $this->hasMany(Request::class);
    }

    // Scopes
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeForClient($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('event_date', '>=', now());
    }

    // Helpers
    public function budgetUsed()
    {
        // Exemple : somme des services liés à l'événement
        return $this->services()->sum('base_price');
    }

    public function progressPercent()
    {
        return $this->progress . '%';
    }

    // Accessors
    protected function formattedEventDate(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->event_date ? $this->event_date->format('d/m/Y') : null,
        );
    }

    protected function formattedBudget(): Attribute
    {
        return Attribute::make(
            get: fn () => number_format($this->budget, 2, ',', ' ') . ' €',
        );
    }
}