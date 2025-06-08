<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'provider_id',
        'title',
        'description',
        'image_url',
        'category',
    ];

    // Relations
    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    // Scopes
    public function scopeForProvider($query, $providerId)
    {
        return $query->where('provider_id', $providerId);
    }
}