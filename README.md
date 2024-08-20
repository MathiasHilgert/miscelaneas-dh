# Repositorio de Misceláneas

Bienvenido al **Repositorio de Misceláneas**, un conjunto diverso de proyectos y ejercicios diseñados para exploración, aprendizaje y experimentación. Este repositorio aprovecha el modelo de IFrames, una solución moderna y flexible inspirada por PlayGround, que facilita la integración de diferentes módulos y componentes en una misma interfaz, optimizando tanto la reutilización como la modularidad.

## Estructura del Repositorio

Este repositorio está organizado en una serie de subdirectorios, cada uno de los cuales contiene un proyecto o ejercicio independiente. Cada proyecto está diseñado para ser autónomo, permitiendo su integración y uso a través de IFrames. Esto proporciona una manera eficiente de combinar y visualizar múltiples proyectos dentro de un mismo entorno sin interferencias mutuas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Vite](https://vitejs.dev/) (como herramienta de construcción y servidor de desarrollo)
- [Git](https://git-scm.com/) (para clonar y gestionar el repositorio)

## Instalación y Configuración

1. **Clona este repositorio en tu máquina local:**
```bash
git clone https://github.com/tu-usuario/repositorio-miscelaneas.git
cd repositorio-miscelaneas
```

2. Instala las dependencias necesarias:

```bash
npm install
```

3. **Ejecuta el servidor de desarrollo:**

```bash
npm run dev
```

Este comando iniciará un servidor de desarrollo utilizando Vite, permitiéndote visualizar y trabajar en los proyectos en tiempo real.

## Construcción y Despliegue

Para construir y desplegar los proyectos en producción, utiliza los siguientes comandos:

### Construye para producción

```bash
npm run build
```

Este comando generará una versión optimizada de los proyectos, lista para ser desplegada.

### Previsualiza la versión de producción localmente

```bash
npm run preview
```

### Despliega en GitHub Pages

```bash
npm run deploy
```

Este comando construirá los proyectos y los desplegará automáticamente en la rama `gh-pages` de tu repositorio, haciéndolos accesibles en línea.