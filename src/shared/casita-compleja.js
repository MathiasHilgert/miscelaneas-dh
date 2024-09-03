import { PGEvent } from "./pg-event";

/**
 * Represents a binary exercise UI generator in order to allow the user
 * to find a word by selecting binary values, in a dinamic way.
 * @class
 */
class CasitaDigitalCompleja {
    /**
     * Represents a complex house.
     * @constructor
     * @param {string} expectedWord - The expected word for the house.
     * @param {string} availableChars - The available characters for constructing the house.
     */
    constructor(expectedWord, availableChars) {
        this.expectedWord = expectedWord;
        this.availableChars = availableChars;
    }

    /**
     * Dado un string binario, devuelve el char correspondiente
     * del array availableChars o "_" si no se encuentra.
     * @param {string} binaryString
     * @returns {string} char de availableChars o "_"
     */
    binaryStringToChar(binaryString) {
        const index = parseInt(binaryString, 2);
        return this.availableChars[index] !== undefined ? this.availableChars[index] : "_";
    }

    /**
     * Returns the amount of bits needed to represent the entire
     * availableChars array
     * @returns {number} amount of bits
     */
    getBitsNeeded() {
        return Math.ceil(Math.log2(this.availableChars.length));
    }

    /**
     * Given a binary string, it returns the corresponding word
     * @param {string} binaryString
     * @returns {string} word
     */
    binaryStringToWord(binaryString) {
        const bitsNeeded = this.getBitsNeeded();
        const word = [];
        for (let i = 0; i < binaryString.length; i += bitsNeeded) {
            const charBinary = binaryString.slice(i, i + bitsNeeded);
            word.push(this.binaryStringToChar(charBinary));
        }
        return word.join("");
    }

    /**
     * Given a word, it returns the corresponding binary string
     * @param {string} word
     * @returns {string} binary string
     */
    wordToBinaryString(word) {
        const bitsNeeded = this.getBitsNeeded();
        const binaryString = [];
        for (const element of word) {
            const char = element;
            const charIndex = this.availableChars.indexOf(char);
            const charBinary = charIndex.toString(2).padStart(bitsNeeded, "0");
            binaryString.push(charBinary);
        }
        return binaryString.join("");
    }

    /**
     * Get the binary string from the SELECT elements
     * @param {HTMLElement} container
     * @returns {Array<Array<string>>} Array of chars, each one with an array of bits.
     */
    getBinaryStringFromSelects(container) {
        const selects = container.querySelectorAll(".binary-select__select");
        const bitsNeeded = this.getBitsNeeded();
        const binaryString = [];
        for (let i = 0; i < selects.length; i += bitsNeeded) {
            const charBinary = [];
            for (let j = 0; j < bitsNeeded; j++) {
                charBinary.push(selects[i + j].value);
            }
            binaryString.push(charBinary);
        }
        return binaryString;
    }

    /**
     * Updates the preview element with the obtained word
     * 
     * It generates the following HTML structure in the given parent element:
     * <div class="char-preview">
     *    <span class="char-preview__char">A</span>
     * </div>
     * 
     * @param {HTMLElement} preview - The preview element
     * @param {Array<Array<string>>} binaryArray - The binary array
     * @returns {void}
     */
    updatePreview(preview, binaryArray) {
        const binaryString = binaryArray.flat().join("");
        const obtainedWord = this.binaryStringToWord(binaryString);

        // Split the obtained word into an array of chars
        const obtainedWordChars = obtainedWord.split("");

        // Create a div for each char
        preview.innerHTML = "";
        obtainedWordChars.map((char) => {
            const charDiv = document.createElement("div");
            charDiv.classList.add("char-preview");

            const charSpan = document.createElement("span");
            charSpan.classList.add("char-preview__char");
            charSpan.textContent = char;

            charDiv.appendChild(charSpan);
            preview.appendChild(charDiv);
        });
    }

    /**
     * Generate a collection of SELECT elements for binary strings,
     * in order to generate the expected word.
     * 
     * When the user selects a value from a SELECT element, the
     * onBinaryStringChange function is called.
     * 
     * It generates the SELECT elements inside the container element,
     * in the following format:
     *  <div class="binary-select">
     *      <div class="binary-select__char">
     *          <select class="binary-select__select">
     *              <option value="0">0</option>
     *              <option value="1">1</option>
     *         </select>
     *         <!-- more SELECT elements, one for each char bit -->
     * 
     *         <p class="binary-select__char-preview">A</p>
     *     </div>
     *    <!-- more divs, one for each char -->
     * </div>
     * 
     * @param {HTMLElement} container
     * @param {Function} onBinaryStringChange
     */
    generateBinarySelects(container, onBinaryStringChange) {
        // Well... here we go.

        // First, check how many chars we have in the expected word
        const expectedWordChars = this.expectedWord.split("");

        // Then, we create a div for each char
        expectedWordChars.map((char) => {
            // Create the div for the char
            const charDiv = document.createElement("div");
            charDiv.classList.add("binary-select__char");

            // Then, we need to calculate the amount of bits needed
            // to represent the available chars.
            const bitsNeeded = this.getBitsNeeded();

            // Now, we create a SELECT element for each bit, with 0 and 1 values.
            const selects = [];
            for (let i = 0; i < bitsNeeded; i++) {
                const select = document.createElement("select");
                select.classList.add("binary-select__select");

                // Add the options (0 and 1 are the only options)
                const options = ["0", "1"];
                options.forEach((optionValue) => {
                    const option = document.createElement("option");
                    option.value = optionValue;
                    option.text = optionValue;
                    select.appendChild(option);
                });

                // Add the event listener
                select.addEventListener("change", (e) => {
                    // Update the class for the select.
                    this.toggleSelect(select);

                    // Call the custom event listener.
                    onBinaryStringChange(this.getBinaryStringFromSelects(container));
                });

                // Append the select to the char div
                charDiv.appendChild(select);
                selects.push(select);
            }

            // Append the char div to the container
            container.appendChild(charDiv);
        });
    }

    /**
     * Toggle the class "binary-select__select--selected" for a SELECT element
     * @param {HTMLElement} select
     * @returns {void}
     */
    toggleSelect(select) {
        if (select.value === "1") {
            select.classList.add("binary-select__select--selected");
        } else {
            select.classList.remove("binary-select__select--selected");
        }
    }

    /**
     * Given a binary array, it sets the SELECT elements to the
     * corresponding values.
     * For example, given the binary array [[0, 1], [1, 0]].
     * 
     * @param {HTMLElement} container
     * @param {Array<Array<string>>} binaryArray
     * @returns {void}
     */
    setBinarySelects(container, binaryArray) {
        const selects = container.querySelectorAll(".binary-select__select");
        for (let i = 0; i < binaryArray.length; i++) {
            const charBinary = binaryArray[i];
            for (let j = 0; j < charBinary.length; j++) {
                selects[i * charBinary.length + j].value = charBinary[j];
            }
        }

        // Update the class for the selects.
        selects.forEach((select) => {
            this.toggleSelect(select);
        });
    }
}
const CasitaCompleja = (params) => {
    const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ?".split("");
    const expectedWord = params.expectedWord.toUpperCase();
    const pgEvent = new PGEvent();
    let hasSucceded = false;

    const generator = new CasitaDigitalCompleja(expectedWord, availableChars);

    const evaluateWord = (binaryArray) => {
        const binaryString = binaryArray.flat().join("");
        const obtainedWord = generator.binaryStringToWord(binaryString);

        if (!params.onHouseChange) return;

        const allSelects = params.container.querySelectorAll(".binary-select__select");
        const bitsNeeded = generator.getBitsNeeded();

        const results = Array.from({ length: Math.ceil(allSelects.length / bitsNeeded) }, (_, i) => {
            const group = Array.from(allSelects).slice(i * bitsNeeded, (i + 1) * bitsNeeded);
            const actualChar = generator.binaryStringToChar(group.map(select => select.value).join(""));
            return {
                index: (i + 1).toString(),
                htmlElement: group[0].closest(".binary-select__char"),
                isOK: actualChar === expectedWord[i],
                actualChar: actualChar,
            };
        });

        params.onHouseChange(results);

        if (params.isFreeMode) {
            generator.updatePreview(params.preview, binaryArray);
            return;
        }

        const event = obtainedWord !== expectedWord ? "FAILURE" : "SUCCESS";
        const message = obtainedWord !== expectedWord
            ? "¡Oh no! Esa no es la palabra correcta. Inténtalo de nuevo."
            : "Bien hecho! Has encontrado la letra correcta.";
        pgEvent.postToPg({
            event, message,
            reasons: [],
            state: JSON.stringify({ selectors: binaryString })
        });

        hasSucceded = obtainedWord === expectedWord;
        generator.updatePreview(params.preview, binaryArray);
    };

    generator.generateBinarySelects(params.container, evaluateWord);

    let binaryArray = [];
    pgEvent.getValues();
    binaryArray = pgEvent.data.state?.selectors?.match(/.{1,2}/g)
        || generator.wordToBinaryString(params.initialWord?.toUpperCase() || expectedWord.replace(/[A-Z]/g, "?")).match(/.{1,2}/g);

    generator.setBinarySelects(params.container, binaryArray);
    generator.updatePreview(params.preview, binaryArray);

    if (!params.onHouseChange) return;

    const allSelects = params.container.querySelectorAll(".binary-select__select");
    const bitsNeeded = generator.getBitsNeeded();

    const results = Array.from({ length: Math.ceil(allSelects.length / bitsNeeded) }, (_, i) => {
        const group = Array.from(allSelects).slice(i * bitsNeeded, (i + 1) * bitsNeeded);
        return {
            index: (i + 1).toString(),
            htmlElement: group[0].closest(".binary-select__char"),
            isOK: hasSucceded,
        };
    });

    params.onHouseChange(results);
};

/**
 * Represents a CasitaCompleja object, with static generation and free mode.
 * @param {Object} params - The parameters for creating a CasitaCompleja object.
 * @param {number} params.housesAmount - The amount of houses to generate.
 * @param {HTMLElement} params.container - The container element for the CasitaCompleja object.
 * @param {HTMLElement} params.preview - The preview element for the CasitaCompleja object.
 * @param {Function} params.onHouseChange - The function that will be called when the user changes the house.
 */
const FreeStaticCasitaCompleja = (params) => {
    CasitaCompleja({
        expectedWord: "?".repeat(params.housesAmount),
        isFreeMode: true,
        container: params.container,
        preview: params.preview,
        onHouseChange: params.onHouseChange,
    });
};

export default CasitaCompleja;
export { FreeStaticCasitaCompleja };