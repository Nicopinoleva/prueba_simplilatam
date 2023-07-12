# Prueba desarrollador full-stack simplilatam

Desarrollada por Nicolás Pino Leva

# Tecnologías

La apliacación se desarrolló con las siguientes tecnologías:
- Backend: Django
- Frontend: ReactJS+TypeScript
- Servidor: Nginx
- Base de datos: postgresql


## Para levantar
- En el repositorio se encuentra un archivo Makefile para poder subir la aplicación de manera local. Se resume en lo siguiente:
```bash
make build
```
- Construye los contenedores de Django y React.

```bash
make up_react
make up_django
make up_postgresql
make up_nginx
```
- Levanta todos los componentes y la aplicación estaría lista para su uso.

# Configurar .env
Se deben incluir credenciales de acceso a la bdd en el .env.
