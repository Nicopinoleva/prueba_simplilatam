DOCKER_COMPOSE=docker-compose --file docker-compose.yml
EXEC_DJANGO=docker-compose --file docker-compose.yml exec django python manage.py

build:
	docker-compose --file docker-compose.yml build
build_django:
	docker-compose --file docker-compose.yml build django
build_react:
	docker-compose --file docker-compose.yml build react

up:
	docker-compose --file docker-compose.yml up
up_django:
	docker-compose --file docker-compose.yml up django
up_postgresql:
	docker-compose --file docker-compose.yml up postgresql
up_nginx:
	docker-compose --file docker-compose.yml up nginx
up_react:
	docker-compose --file docker-compose.yml up react

restart:
	docker-compose --file docker-compose.yml restart $(target)

stop:
	docker-compose --file docker-compose.yml stop
stop_django:
	docker-compose --file docker-compose.yml stop django
stop_nginx:
	docker-compose --file docker-compose.yml stop nginx
stop_react:
	docker-compose --file docker-compose.yml stop react

clean:
	docker system prune --volumes -f

codegen:
	cd react-simplilatam && npm run codegen

pdm_add:
	docker-compose --file docker-compose.yml exec django pdm add $(app)
pdm_remove:
	docker-compose --file docker-compose.yml exec django pdm remove $(app)
pdm_list:
	docker-compose --file docker-compose.yml exec django pdm list
pdm_update:
	docker-compose --file docker-compose.yml exec django pdm update $(app)

startapp:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py startapp $(app)
makemigrations:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py makemigrations
makemigrations_app:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py makemigrations $(app)
migrate:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py migrate
migrate_app:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py migrate_schemas $(app) $(n)

shell_django:
	docker-compose --file docker-compose.yml exec django bash
shell_react:
	docker-compose --file docker-compose.yml exec react sh
shell_nginx:
	docker-compose --file docker-compose.yml exec nginx sh
shell_postgresql:
	docker-compose --file docker-compose.yml exec postgres sh

debug:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py debug
test:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py test --verbosity=3
test_app:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py test $(app) --verbosity=3 --keepdb
test_debug:
	docker-compose --file docker-compose.yml exec django pdm run python manage.py test --verbosity=3 --keepdb definicion_docs.tests.models
