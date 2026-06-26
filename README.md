# vue-tailwind

Guía de instalación y uso del proyecto frontend desarrollado con Vue 3, Vite y Tailwind CSS.

## Requisitos

- Node.js 20.x o superior
- pnpm 9.x o superior

## Instalación

1. Clona este repositorio:

```sh
git clone https://github.com/CelJudy/pruebaFE
cd pruebaFE
```

2. Instala pnpm si aún no lo tienes:

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

3. Instala las dependencias del proyecto:

```sh
pnpm install
```

## Ejecución en desarrollo

Inicia el servidor de desarrollo con:

```sh
pnpm dev
```

La aplicación quedará disponible en la URL que indique Vite, normalmente en http://localhost:5173.

## Compilación para producción

Genera la versión lista para producción con:

```sh
pnpm build
```

Para previsualizar el build localmente:

```sh
pnpm preview
```

## Versiones y librerías utilizadas

- Versión del proyecto: 0.0.0
- Vue: 3.5.13
- Vite: 6.0.1
- Vue Router: 4.4.5
- Vue I18n: 10.0.5
- Axios: 1.9.0
- Tailwind CSS: 3.4.17
- PostCSS: 8.4.49
- Autoprefixer: 10.4.20
- @vitejs/plugin-vue: 5.2.1
- vite-plugin-vue-devtools: 7.6.5

## Repositorio del backend

El repositorio del backend se encuentra en:

https://github.com/CelJudy/pruebaBE

Asegúrate de tenerlo corriendo para que la aplicación pueda consumir los servicios API correspondientes.

