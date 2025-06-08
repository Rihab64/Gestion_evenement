<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'provider_id',
        'category_id',
        'name',
        'description',
        'price_type',
        'base_price',
        'is_active',
    ];

    protected $casts = [
        'base_price' => 'float',
        'is_active' => 'boolean',
        'price_type' => 'string',
    ];

    // Relations
    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_services');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
   public function scopeFilter($query, $filters)
{
    if (!empty($filters['q'])) {
        $query->where(function($q) use ($filters) {
            $q->where('name', 'like', '%'.$filters['q'].'%')
              ->orWhere('description', 'like', '%'.$filters['q'].'%');
        });
    }
    if (!empty($filters['category_id'])) {
        $query->where('category_id', $filters['category_id']);
    }
    if (!empty($filters['location'])) {
        $query->where('location', 'like', '%'.$filters['location'].'%');
    }
    if (!empty($filters['min_price'])) {
        $query->where('base_price', '>=', $filters['min_price']);
    }
    if (!empty($filters['max_price'])) {
        $query->where('base_price', '<=', $filters['max_price']);
    }
    if (!empty($filters['min_rating'])) {
        $query->where('rating', '>=', $filters['min_rating']);
    }
    return $query;
}
}