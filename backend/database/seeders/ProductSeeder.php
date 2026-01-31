<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    
    public function run(): void
    {
        Product::insert([
            [
                'name' => 'Tort czekoladowy',
                'description' => 'Bogaty tort z kremem czekoladowym',
                'price' => 89.99,
                'stock' => 10,
                'image' => 'products/tort_czekoladowy.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Tort truskawkowy',
                'description' => 'Lekki tort ze świeżymi truskawkami',
                'price' => 94.99,
                'stock' => 6,
                'image' => 'products/tort_truskawkowy.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Sernik nowojorski',
                'description' => 'Kremowy sernik na spodzie z herbatników',
                'price' => 64.99,
                'stock' => 8,
                'image' => 'products/sernik_nowojorski.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Ciasto marchewkowe',
                'description' => 'Ciasto z kremem marchewkowym',
                'price' => 54.99,
                'stock' => 12,
                'image' => 'products/ciasto_marchewkowe.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Brownie',
                'description' => 'Mocno czekoladowe brownie',
                'price' => 39.99,
                'stock' => 20,
                'image' => 'products/brownie.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Makaroniki',
                'description' => 'Kolorowe ciasteczka migdałowe',
                'price' => 29.99,
                'stock' => 30,
                'image' => 'products/makaroniki.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Szarlotka',
                'description' => 'Domowa szarlotka z kruszonką',
                'price' => 49.99,
                'stock' => 14,
                'image' => 'products/szarlotka.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Tarta cytrynowa',
                'description' => 'Krucha tarta z kremem cytrynowym',
                'price' => 44.99,
                'stock' => 9,
                'image' => 'products/tarta_cytrynowa.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Red Velvet',
                'description' => 'Delikatne ciasto kakaowe z kremem śmietankowym',
                'price' => 74.99,
                'stock' => 7,
                'image' => 'products/red_velvet.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Tiramisu',
                'description' => 'Włoski deser z mascarpone',
                'price' => 69.99,
                'stock' => 9,
                'image' => 'products/tiramisu.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'Ciasto pomarańczowe',
                'description' => 'Aromatyczne ciasto z kremem pomarańczowym',
                'price' => 79.99,
                'stock' => 5,
                'image' => 'products/ciasto_pomaranczowe.jpg',
                'is_active' => true,
            ],

        ]);
    }
}
