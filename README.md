# build backend and frontend from their dockerfile  
docker-compose build be

docker-compose build fe

# set the .env for the backend
cp be/.env.example be/.env

# run composer and excute requirment for the be to run 
docker-compose up -d
docker-compose exec be composer install
docker-compose exec be php artisan key:generate
docker-compose exec be php artisan storage:link
docker-compose exec be php artisan migrate
docker-compose exec nginx chmod 777 -R var/www/