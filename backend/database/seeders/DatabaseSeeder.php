<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@bakery.local'],
            [
                'name' => 'Admin',
                'last_name' => 'Main',
                'password' => Hash::make('Password'),
                'phone' => '123456789',
                'role' => 'ADMIN',
            ]

        );
        User::updateOrCreate(
            ['email' => 'client@bakery.local'],
            [
                'name' => 'Client',
                'last_name' => 'Main',
                'password' => Hash::make('client12345'),
                'phone' => '123456789',
                'role' => 'CLIENT',
            ]
        );

        $this->call(ProductSeeder::class);
    }
}
