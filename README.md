Zmiana .env.example -> .env

Zmienić w .env

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=postgres
DB_PASSWORD=12345

docker compose up --build

docker compose exec backend php artisan key:generate

docker compose exec backend php artisan migrate:fresh --seed
