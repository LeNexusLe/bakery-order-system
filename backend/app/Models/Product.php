<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
        'is_active'
    ];

   
    protected $appends = ['image_url'];

    
    public function getImageUrlAttribute()
    {
        return asset('storage/' . $this->image);
    }
}
