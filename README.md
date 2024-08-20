# Repositorio de Misceláneas

Bienvenido al **Repositorio de Misceláneas**, un conjunto diverso de proyectos y ejercicios diseñados para exploración, aprendizaje y experimentación. Este repositorio utiliza el modelo de IFrames, una solución moderna y flexible inspirada en PlayGround, que facilita la integración de diferentes módulos y componentes en una misma interfaz, optimizando la reutilización y modularidad.

## Tabla de Contenidos

- [Repositorio de Misceláneas](#repositorio-de-misceláneas)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Estructura del Repositorio](#estructura-del-repositorio)
  - [Requisitos Previos](#requisitos-previos)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Instalación y Configuración](#instalación-y-configuración)
  - [Construcción y Despliegue](#construcción-y-despliegue)
    - [Construye para Producción](#construye-para-producción)
    - [Previsualiza la Versión de Producción Localmente](#previsualiza-la-versión-de-producción-localmente)
    - [Despliega en GitHub Pages](#despliega-en-github-pages)
  - [Proyectos Disponibles](#proyectos-disponibles)
    - [Casita Digital](#casita-digital)
      - [HouseController](#housecontroller)
        - [Propiedades:](#propiedades)
        - [Métodos:](#métodos)
      - [Timer](#timer)
        - [Propiedades:](#propiedades-1)
        - [Métodos:](#métodos-1)
      - [CasitaDigital](#casitadigital)
        - [Propiedades:](#propiedades-2)
        - [Funciones Internas:](#funciones-internas)
      - [PGEvent](#pgevent)
    - [Casita Digital Compleja](#casita-digital-compleja)
      - [CasitaDigitalCompleja](#casitadigitalcompleja)
        - [Propiedades:](#propiedades-3)
        - [Métodos:](#métodos-2)
        - [Timer](#timer-1)
        - [PGEvent](#pgevent-1)
      - [CasitaCompleja](#casitacompleja)
        - [Propiedades:](#propiedades-4)
        - [Funciones Internas:](#funciones-internas-1)
        - [Ejecución:](#ejecución)
  - [Buenas Prácticas](#buenas-prácticas)

## Estructura del Repositorio

Este repositorio está organizado en una serie de subdirectorios, cada uno de los cuales contiene un proyecto o ejercicio independiente. Cada proyecto está diseñado para ser autónomo, permitiendo su integración y uso a través de IFrames. Esto proporciona una manera eficiente de combinar y visualizar múltiples proyectos dentro de un mismo entorno sin interferencias mutuas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Vite](https://vitejs.dev/) (como herramienta de construcción y servidor de desarrollo)
- [Git](https://git-scm.com/) (para clonar y gestionar el repositorio)

## Estructura del proyecto


<!-- 
    Directorio: C:\Users\Mathias\Documents\DigitalHouse\miscelaneas


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         11/6/2024     15:20                dist
d-----         12/6/2024     10:18                node_modules
d-----         12/6/2024     10:18                src


PS C:\Users\Mathias\Documents\DigitalHouse\miscelaneas> Get-ChildItem -Directory -Recurse


    Directorio: C:\Users\Mathias\Documents\DigitalHouse\miscelaneas


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         11/6/2024     15:20                dist
d-----         12/6/2024     10:18                node_modules
d-----         12/6/2024     10:18                src


    Directorio: C:\Users\Mathias\Documents\DigitalHouse\miscelaneas\node_modules


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         11/6/2024     15:09                .vite


    Directorio: C:\Users\Mathias\Documents\DigitalHouse\miscelaneas\src


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         12/6/2024     10:18                casitacompleja
d-----         12/6/2024     10:18                casitadigital
d-----         12/6/2024     10:18                demoCasitaPalabras01
d-----         12/6/2024     10:18                demoCasitaSimple01
d-----         12/6/2024     10:18                demoCreadorLaberinto
d-----         20/8/2024     11:08                shared -->

El proyecto se estructura de la siguiente manera:

- **`dist/`**: Directorio de salida donde se almacenan los archivos generados durante la construcción.
- **`node_modules/`**: Directorio donde se almacenan las dependencias de Node.js.
- **`src/`**: Directorio principal donde se encuentran los proyectos y ejercicios disponibles.

En el directorio `src/`, encontrarás los siguientes subdirectorios, cada uno de los cuales contiene un proyecto o ejercicio independiente:

- **`casitacompleja/`**: Proyecto demo de una casita digital compleja, haciendo uso de bits para formar palabras, utilizando selectores binarios.
- **`casitadigital/`**: Proyecto demo de una casita digital simple, con luces que forman mensajes, utilizando selectores binarios.
- **`demoCasitaPalabras01/`**: Proyecto demo de una casita digital con palabras, utilizando selectores binarios.
- **`demoCasitaSimple01/`**: Proyecto demo de una casita digital simple, utilizando selectores binarios.
- **`demoCreadorLaberinto/`**: Proyecto demo de un creador de laberintos legacy.
- **`shared/`**: Directorio compartido con módulos y utilidades comunes para los proyectos.

Cada proyecto contiene su propio código fuente, archivos de configuración y dependencias, permitiendo su ejecución y despliegue de forma independiente.

Ahora bien, en shared se encuentra el código base compartido entre los proyectos, como los controladores de eventos y temporizadores, o el generador del ejercicio en sí.
La idea es que cada ejercicio haga uso de un controlador expuesto en shared, para que el ejercicio en sí no tenga que preocuparse por la lógica como tal, sino solo de implementar una interfaz de usuario.

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

### Construye para Producción

    ```bash
    npm run build
    ```

    Este comando generará una versión optimizada de los proyectos, lista para ser desplegada.

### Previsualiza la Versión de Producción Localmente

    ```bash
    npm run preview
    ```

### Despliega en GitHub Pages

    ```bash
    npm run deploy
    ```

    Este comando construirá los proyectos y los desplegará automáticamente en la rama `gh-pages` de tu repositorio, haciéndolos accesibles en línea.

## Proyectos Disponibles

### Casita Digital

El código del proyecto "Casita Digital" está diseñado para controlar y gestionar el comportamiento de una casa interactiva representada en una página web. El controlador principal es el objeto `HouseController`, que maneja la estructura de la casa, el estado de las luces y la actualización de los mensajes mostrados.

#### HouseController

El `HouseController` es un objeto que contiene varios métodos y propiedades clave para controlar la casa:

##### Propiedades:

- **houseContainer:** Elemento contenedor donde se muestra la casa.
- **houseMap:** Matriz que representa la estructura de la casa.
- **messageElement:** Elemento HTML donde se muestra el mensaje.
- **lights:** Colección de elementos `select` que representan las luces de la casa.
- **availableChars:** Array de caracteres disponibles para formar mensajes.

##### Métodos:

- **setLightsValues(lightsValues):** Asigna valores a las luces (`selects`) basados en un array de 0s y 1s.
- **translateLightsToMessage(lights):** Traduce los valores de las luces a un mensaje basado en los caracteres disponibles.
- **updateText(messageNumber):** Actualiza el texto de un elemento HTML con un carácter del mensaje según el número del mensaje dado.
- **updateMessage():** Actualiza el mensaje en función del estado de las luces.
- **createLights():** Crea los elementos `select` para las luces y los añade a los elementos correspondientes en la página.
- **createHouse(house, squares):** Crea la estructura de la casa según la matriz proporcionada.
- **init(houseContainer, houseMap, whereToWrite, onLightsChange):** Inicializa el `HouseController` con los parámetros proporcionados.

#### Timer

La clase `Timer` representa un temporizador que se puede utilizar para medir intervalos de tiempo y ejecutar ciertas acciones cuando ha pasado una cantidad específica de tiempo. Esto puede ser útil, por ejemplo, para guardar automáticamente el estado de la aplicación tras un periodo de inactividad.

##### Propiedades:

- **duration:** Duración del temporizador en milisegundos.
- **callback:** Función de callback que se ejecuta cuando el temporizador llega a cero.

##### Métodos:

- **start():** Inicia el temporizador.
- **stop():** Detiene el temporizador.
- **reset():** Reinicia el temporizador.

#### CasitaDigital

La función principal `CasitaDigital` inicializa el controlador de la casa y maneja los eventos cuando el usuario cambia el valor de una luz.

##### Propiedades:

- **areTherePendingChanges:** Indica si hay cambios pendientes.
- **hasUserMetTheChallengeBefore:** Indica si el usuario ha cumplido con el reto en el estado anterior.

##### Funciones Internas:

- **hasApproved(houseController, lights):** Verifica si el mensaje obtenido coincide con la letra esperada.
- **saveState(houseController, lights):** Guarda el estado de las luces y publica un evento en el servidor.

#### PGEvent

El código hace uso de la clase `PGEvent`, importada desde `pg-event`, para manejar la comunicación de eventos al servidor, como los mensajes de éxito o fracaso según el estado de las luces.

### Casita Digital Compleja

El proyecto "Casita Digital Compleja" está diseñado para generar una interfaz de usuario binaria que permite a los usuarios formar una palabra seleccionando valores binarios de forma dinámica. La clase principal es `CasitaDigitalCompleja`, que maneja la conversión entre cadenas binarias y caracteres, la actualización de la interfaz y la verificación de la palabra esperada.

#### CasitaDigitalCompleja

La clase `CasitaDigitalCompleja` contiene varios métodos y propiedades clave para manejar la lógica de la casa interactiva:

##### Propiedades:

- **expectedWord:** La palabra esperada que el usuario debe encontrar.
- **availableChars:** Los caracteres disponibles para construir la palabra.

##### Métodos:

- **binaryStringToChar(binaryString):** Dada una cadena binaria, retorna el carácter correspondiente del array de caracteres disponibles.
- **getBitsNeeded():** Retorna la cantidad de bits necesarios para representar todos los caracteres disponibles.
- **binaryStringToWord(binaryString):** Dada una cadena binaria, retorna la palabra correspondiente.
- **wordToBinaryString(word):** Dada una palabra, retorna la cadena binaria correspondiente.
- **getBinaryStringFromSelects(container):** Obtiene la cadena binaria desde los elementos `SELECT` en el contenedor dado.
- **updatePreviews(container, binaryArray):** Actualiza los elementos de vista previa con la palabra obtenida.
- **generateBinarySelects(container, onBinaryStringChange):** Genera una colección de elementos `SELECT` para cadenas binarias, permitiendo al usuario generar la palabra esperada.
- **setBinarySelects(container, binaryArray):** Establece los valores de los elementos `SELECT` en función de la

 cadena binaria dada.

##### Timer

La clase `Timer` en "Casita Digital Compleja" funciona de manera similar a la de "Casita Digital", proporcionando funcionalidad para medir intervalos de tiempo y ejecutar acciones basadas en esos intervalos.

##### PGEvent

La clase `PGEvent` también se utiliza en este proyecto para la comunicación de eventos al servidor, como el éxito o el fracaso de la verificación de la palabra.

#### CasitaCompleja

La clase `CasitaCompleja` es un wrapper que coordina la lógica de `CasitaDigitalCompleja`, gestionando el flujo de trabajo y la interacción entre los diferentes componentes del proyecto.

##### Propiedades:

- **availableBits:** Array que representa los bits disponibles para construir la palabra.
- **numBits:** Número de bits necesarios para la palabra esperada.

##### Funciones Internas:

- **binaryStringToWord(binaryString):** Función auxiliar para convertir una cadena binaria a una palabra.
- **updateUI():** Actualiza la interfaz de usuario con la palabra obtenida o muestra un mensaje de error si la palabra no coincide.

##### Ejecución:

- **start():** Inicia la aplicación, configurando los selectores de bits y los eventos asociados.
- **stop():** Detiene la aplicación y limpia el estado actual.

## Buenas Prácticas

Este repositorio sigue las mejores prácticas de desarrollo de software, incluyendo:

- **Modularidad:** Cada proyecto está diseñado como un módulo independiente, permitiendo su integración y uso en diferentes contextos.
- **Reutilización:** Se fomenta la reutilización de código a través de la modularidad y la integración de componentes.
- **Documentación:** Se proporciona documentación detallada para cada proyecto, incluyendo descripciones, propiedades, métodos y ejemplos de uso. Para esto, consulta [JS Docs](https://jsdoc.app/).
- **Optimización:** Se utilizan herramientas modernas como Vite para optimizar la construcción y despliegue de los proyectos.
- **SOLID:** Se siguen los principios SOLID de diseño de software para garantizar la escalabilidad y mantenibilidad de los proyectos. Para más información, consulta [SOLID](https://en.wikipedia.org/wiki/SOLID).