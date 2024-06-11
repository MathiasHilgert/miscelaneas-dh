import { PGEvent } from "./pg-event";

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
            HouseController.lights[i].value = lightsValues[i];
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
        if (HouseController.messageElement.innerText.length > 3) {
            HouseController.messageElement.innerHTML = HouseController.messageElement.innerHTML.slice(0, -1);
            setTimeout(() => {
                HouseController.updateText(messageNumber);
            }, 25);
        } else {
            HouseController.messageElement.innerHTML += message;
        }
    },

    /**
     * Updates the message based on the state of the lights.
     */
    updateMessage: () => {
        window.scrollTo(0, 10000);
        let message = "";
        for (let light of HouseController.lights) {
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
                HouseController.onLightsChange(HouseController.lights);
                HouseController.updateMessage();
            });
            thisElem.appendChild(thisSelect);

            if (HouseController.lights === undefined) HouseController.lights = [];
            HouseController.lights.push(thisSelect);
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
        HouseController.houseContainer = houseContainer;
        HouseController.houseMap = houseMap;
        HouseController.messageElement = whereToWrite;
        HouseController.onLightsChange = onLightsChange;

        HouseController.createHouse(houseContainer, houseMap);
        HouseController.createLights();
    },
};

/**
 * Class that represents a timer that can be used to measure time intervals,
 * in order to execute certain actions when a certain amount of time has passed.
 * 
 * For example, a timer can be used to automatically save the state of an application
 * after 60 seconds of inactivity. When the timer arrives to zero, the application
 * will save the state and timer will start again.
 */
export class Timer {
    /**
     * Creates a new timer.
     * 
     * @param {number} duration - The duration of the timer in milliseconds.
     * @param {function} callback - The callback function to execute when the timer reaches zero.
     */
    constructor(duration, callback) {
        this.duration = duration;
        this.callback = callback;
        this.timer = null;
    }

    /**
     * Starts the timer.
     */
    start() {
        this.stop();
        this.timer = setTimeout(() => {
            this.callback();
            this.start();
        }, this.duration);
    }

    /**
     * Stops the timer.
     */
    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * Resets the timer.
     */
    reset() {
        this.stop();
        this.start();
    }
}

/**
 * The main function that initializes the house controller and handles the event when the user changes the value of a light.
 * @param {string} expectedLetter - The expected letter that the user needs to find.
 */
const CasitaDigital = (expectedLetter) => {
    /**
     * Indicates whether there are pending changes.
     * @type {boolean}
     */
    let areTherePendingChanges = false

    /**
     * Indicates if the user, in the previous state, has met the challenge requirements.
     * @type {boolean}
     */
    let hasUserMetTheChallengeBefore = false;

    /**
     * Checks if the obtained message matches the expected letter and posts the result to the pgEvent.
     * @param {Object} houseController - The house controller object.
     * @param {NodeList} lights - The lights NodeList.
     * @returns {boolean} - Returns true if the obtained message matches the expected letter, otherwise false.
     */
    const hasApproved = (houseController, lights) => houseController.translateLightsToMessage(lights) === expectedLetter;

    /**
     * Saves the state of the lights and posts an event to the server.
     * @param {NodeList} lights - The list of lights.
     * @returns {void}
     */
    const saveState = (houseController, lights) => {
        if (!areTherePendingChanges) {
            console.log("No hay cambios pendientes.");
            return;
        }

        const messageMatches = hasApproved(houseController, lights);
        const message = messageMatches  ? "¡Felicidades! Has encontrado la letra correcta." 
                                        : "¡Oh no! Esa no es la letra correcta. Inténtalo de nuevo.";

        pgEvent.postToPg({
            event: messageMatches ? "SUCCESS" : "FAILURE",
            message: message,
            reasons: [],
            state: JSON.stringify({
                lights: Array.from(lights).map((light) => parseInt(light.value)),
            })
        });

        areTherePendingChanges = false;
        hasUserMetTheChallengeBefore = messageMatches;
    }

    const pgEvent = new PGEvent();
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

    // Create a timer that will save the state of the lights after 15 seconds of inactivity.
    const timer = new Timer(8_000, () => saveState(houseController, houseController.lights));
    timer.start();

    houseController.init(house, squares, messageElement, (lights) => {
        // Restart the timer when the user changes the value of a light.
        areTherePendingChanges = true;
        timer.reset();

        // Check if the user has met the challenge requirements.
        // If the exercise state doesn't really changes, that is, the user
        // continue with a bad answer, we don't want to save the state.
        const userHasMetTheChallenge = hasApproved(houseController, lights);
        if (userHasMetTheChallenge === hasUserMetTheChallengeBefore) {
            return;
        }

        saveState(houseController, lights);
    });

    // If there is a previous state, set the lights values.
    pgEvent.getValues();
    if (pgEvent.data.lights) {
        houseController.setLightsValues(pgEvent.data.lights);
    }
}

export default CasitaDigital;