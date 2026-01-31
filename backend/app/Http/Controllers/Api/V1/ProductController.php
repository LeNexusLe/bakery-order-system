<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->where('is_active', true);


        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('description', 'ilike', "%{$search}%");
            });
        }

 
        if ($request->filled('min_price') && is_numeric($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price') && is_numeric($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }

   
        $allowedSorts = ['name', 'price', 'stock', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts)
            ? $request->sort
            : 'name';

        $direction = $request->direction === 'desc'
            ? 'desc'
            : 'asc';

     
        $query->orderBy($sort, $direction)
              ->orderBy('id', 'desc');

        return $query->paginate(9);
    }

    public function show(Product $product)
    {
        abort_if(!$product->is_active, 404);

        return $product;
    }
}
