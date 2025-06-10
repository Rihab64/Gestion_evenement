<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Provider extends Model
{  use HasFactory;
    protected $fillable = [
        'user_id',
        'company_name',
        'business_type',
        'description',
        'address',
        'phone',
        'website',
        'rating',
        'status',
    ];

    protected $casts = [
        'rating' => 'float',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    
public function scopeFilter($query, $filters)
{
    if (!empty($filters['q'])) {
        $query->where('company_name', 'like', '%'.$filters['q'].'%')
              ->orWhere('business_type', 'like', '%'.$filters['q'].'%');
    }
    if (!empty($filters['location'])) {
        $query->where('address', 'like', '%'.$filters['location'].'%');
    }
    if (!empty($filters['min_rating'])) {
        $query->where('rating', '>=', $filters['min_rating']);
    }
    return $query;
}
}