/**
 * Represents a PgEvent.
 * @class
 */
class PgEvent {
    constructor() {
        this.data = {
            type: "house-type",
            event: 0,
            message: "",
            id: "",
            state: "",
        };
    }

    /**
     * Retrieves the values from the query string in the URL.
     */
    getValues() {
        const url = document.location.href;
        const paths = url.split("?");
        if (paths.length < 2) {
            return;
        }
        const queryStrings = paths[1].split("&")
        for (const qs of queryStrings) {
            if (qs.length < 2) {
                continue;
            }
            const values = qs.split("=");
            if (values.length < 2) {
                continue;
            }
            switch (values[0]) {
                case ID:
                    this.data[ID] = values[1];
                    break;
            }
        }
    }

    /**
     * Handles a successful event.
     * @param {string} message - The message associated with the event.
     */
    onSuccessEvent(message) {
        this.data["event"] = "SUCCESS";
        this.data["message"] = message;
        window.top.postMessage(this.data, "*");
    }

    /**
     * Handles a failed event.
     * @param {string} message - The message associated with the event.
     */
    onFailEvent(message) {
        this.data["event"] = "FAILURE";
        this.data["message"] = message;
        window.top.postMessage(this.data, "*");
    }

    /**
     * Sends the state to the parent window.
     * @param {string} state - The state to be sent.
     */
    sendState(state) {
        this.data["event"] = "STATE"
        this.data["state"] = state
        window.top.postMessage(this.data, "*");
    }
}

/**
 * The HouseController object controls the behavior and functionality of a house.
 * @typedef {Object} HouseController
 * @property {HTMLElement} houseContainer - The container element where the house is displayed.
 * @property {Array<Array<string>>} houseMap - The array representing the structure of the house.
 * @property {HTMLElement} messageElement - The HTML element where the message is displayed.
 * @property {function} updateText - Updates the text of an HTML element with a message character based on the given message number.
 * @property {function} updateMessage - Updates the message based on the state of the lights.
 * @property {function} createLights - Creates select elements for lights and appends them to the corresponding elements on the page.
 * @property {function} createHouse - Creates a house based on the provided squares array.
 * @property {function} init - Initializes the HouseController object with the provided parameters.
 */
const HouseController = {
    /**
     * The container element where the house is displayed.
     * @type {HTMLElement}
     */
    houseContainer: null,

    /**
     * The array representing the structure of the house.
     * @type {Array<Array<string>>}
     */
    houseMap: null,

    /**
     * The HTML element where the message is displayed.
     * @type {HTMLElement}
     */
    messageElement: null,

    /**
     * The collection of lights.
     * @type {HTMLCollection}
     */
    lights: [],

    /**
     * On change event handler for the lights.
     * @param {HTMLCollection} lights - The collection of lights.
     */
    onLightsChange: (lights) => {},

    /**
     * The available characters for the message.
     * @type {Array<string>}
     */
    availableChars: [
        " ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", 
        "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
        ".", ",", "!", "?",
    ],

    /**
     * Sets the value of the lights (selects), based on a 0-1 array.
     * @param {Array<number>} lightsValues - The array of values for the lights.
     */
    setLightsValues: (lightsValues) => {
        for (let i = 0; i < lightsValues.length; i++) {
            this.lights[i].value = lightsValues[i];
        }

        HouseController.updateMessage();
    },


    /**
     * Translate the lights values to a message, based on the available characters.
     * @param {HTMLCollection} lights - The collection of lights.
     * @returns {string} The message based on the lights values.
     */
    translateLightsToMessage: (lights) => {
        let message = "";
        for (let light of lights) {
            message += light.value;
        }
        let messageNumber = parseInt(message, 2); // Binary to decimal
        return HouseController.availableChars[messageNumber];
    },

    /**
     * Updates the text of an HTML element with a message character based on the given message number.
     * @param {number} messageNumber - The index of the character in the availableChars array.
     */
    updateText: (messageNumber) => {
         const message = HouseController.availableChars[messageNumber];
        if (this.messageElement.innerText.length > 3) {
            this.messageElement.innerHTML = this.messageElement.innerHTML.slice(0, -1);
            setTimeout(() => {
                HouseController.updateText(messageNumber);
            }, 25);
        } else {
            this.messageElement.innerHTML += message;
        }
    },

    /**
     * Updates the message based on the state of the lights.
     */
    updateMessage: () => {
        window.scrollTo(0, 10000);
        let message = "";
        for (let light of this.lights) {
            let value = light.value;
            message += value;

            if (value == "1") {
                light.classList.add("prendida");
                light.classList.remove("apagada");
            } else {
                light.classList.remove("prendida");
                light.classList.add("apagada");
            }
        }
        let messageNumber = parseInt(message, 2); // Binary to decimal
        HouseController.updateText(messageNumber);
    },

    /**
     * Creates select elements for lights and appends them to the corresponding elements on the page.
     * @returns {void}
     */
    createLights: () => {
        // Create the select elements for the lights.
        let selectElement = document.createElement("SELECT");
        
        let elemOption1 = document.createElement("OPTION");
        elemOption1.innerHTML = "1";
        elemOption1.value = "1";
        selectElement.appendChild(elemOption1);
        
        let elemOption0 = document.createElement("OPTION");
        elemOption0.innerHTML = "0";
        elemOption0.value = "0";
        selectElement.appendChild(elemOption0);

        for (let i = 0; i < 5; i++) {
            let thisElem = document.querySelector(".luz" + i);
            let thisSelect = selectElement.cloneNode(true);
            thisSelect.value = 0;
            thisSelect.addEventListener("change", () => {
                this.onLightsChange(this.lights);
                HouseController.updateMessage();
            });
            thisElem.appendChild(thisSelect);

            if (this.lights === undefined) this.lights = [];
            this.lights.push(thisSelect);
        }
    },

    /**
     * Creates a house based on the provided squares array.
     * 
     * @param {HTMLElement} house - The container element where the house will be created.
     * @param {Array<Array<string>>} squares - The array representing the structure of the house.
     */
    createHouse: (house, squares) => {
        // Create the house, based on the squares array.
        for (let row of squares) {
            let rowElement = document.createElement("TR");
            for (let rowElementClasses of row) {
                if (rowElementClasses != "n") {
                    let cellElement = document.createElement("TD");
                    cellElement.classList.add(rowElementClasses);
                    if (rowElementClasses.includes("luz")) {
                        cellElement.setAttribute("colspan", "2");
                        cellElement.setAttribute("rowspan", "2");
                    }
                    if (rowElementClasses.includes("mensaje")) {
                        cellElement.setAttribute("colspan", "4");
                        cellElement.setAttribute("rowspan", "3");
                        cellElement.setAttribute("id", "caja-mensajes");
                    }
                    rowElement.appendChild(cellElement);
                }
            }
            house.appendChild(rowElement);
        }
    },

    /**
     * Initializes the HouseController object with the provided parameters.
     * @param {HTMLElement} houseContainer - The container element where the house will be created.
     * @param {Array<Array<string>>} houseMap - The array representing the structure of the house.
     * @param {HTMLElement} whereToWrite - The HTML element where the message will be displayed.
     * @param {function} onLightsChange - The event handler for the lights.
     */
    init: (houseContainer, houseMap, whereToWrite, onLightsChange) => {
        this.houseContainer = houseContainer;
        this.houseMap = houseMap;
        this.messageElement = whereToWrite;
        this.onLightsChange = onLightsChange;

        HouseController.createHouse(this.houseContainer, this.houseMap);
        HouseController.createLights();
    },
};

const main = () => {
    const pgEvent = new PgEvent();
    const expectedLetter = "J";
    let hasSuccess = false;

    const house = document.getElementById('casa');
    const squares = [
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], 
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], 
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 't', 't', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c', 'c', 'c'], 
        ['c', 'c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 'mensaje', 'n', 'n', 'n', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c', 'c'],
        ['c', 'c', 'c', 'c', 'c', 'ti', 't', 't', 't', 'n', 'n', 'n', 'n', 't', 't', 't', 'td', 'c', 'c', 'c', 'c', 'c'], 
        ['c', 'c', 'c', 'c', 'ti', 't', 't', 't', 't', 'n', 'n', 'n', 'n', 't', 't', 't', 't', 'td', 'c', 'c', 'c', 'c'], 
        ['c', 'c', 'c', 'ti', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 'td', 'c', 'c', 'c'], 
        ['c', 'c', 'ti', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 'td', 'c', 'c'], 
        ['c', 'tiab', 'p', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'p', 'tdab', 'c'], 
        ['c', 'c', 'p', 'bl', 'luz0', 'n', 'bl', 'luz1', 'n', 'bl', 'luz2', 'n', 'bl', 'luz3', 'n', 'bl', 'luz4', 'n', 'bl', 'p', 'c', 'c'], 
        ['c', 'c', 'p', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'n', 'n', 'bl', 'p', 'c', 'c'], 
        ['v', 'v', 'p', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'bl', 'p', 'v', 'v'], 
        ['v', 'v', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'v', 'v'], 
        ['v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v'], 
        ['v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v'],
    ];
    const messageElement = document.getElementById("mensaje");
    
    // Create the house table and set up the "onLightsChange" event handler,
    // which will be called when the user changes the value of a light to check if
    // the user has met the challenge requirements.
    const houseController = Object.create(HouseController);
    houseController.init(house, squares, messageElement, (lights) => {
        // If the user has already succeeded, don't check again.
        if (hasSuccess) {
            return;
        }

        // Check if the obtained message is the expected one.
        const message = houseController.translateLightsToMessage(lights);
        if (message !== expectedLetter) {
            pgEvent.onFailEvent("¡Oh no! Esa no es la letra correcta. Inténtalo de nuevo.");
        } else {
            pgEvent.onSuccessEvent("¡Bien hecho! Has encontrado la letra correcta.");
            hasSuccess = true;
        }
        
        // Get each light value and send the state.
        const lightsValues = [];
        for (let light of lights) {
            lightsValues.push(parseInt(light.value));
        }
        pgEvent.sendState(lightsValues);
    });

    // If there is a previous state, set the lights values.
    pgEvent.getValues();
    if (pgEvent.data.state) {
        const lightsValues = pgEvent.data.state.split(",");
        houseController.setLightsValues(lightsValues);
    }
}
main();