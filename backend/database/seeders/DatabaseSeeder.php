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
                'password' => Hash::make('Password'),
                'role' => 'ADMIN',
            ]

        );
        User::updateOrCreate(
            ['email' => 'client@bakery.local'],
            [
                'name' => 'Client',
                'password' => Hash::make('client12345'),
                'role' => 'CLIENT',
            ]
        );
    }
}
