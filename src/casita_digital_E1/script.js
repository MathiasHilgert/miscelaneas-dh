import CasitaDigital from "../shared/casita-digital";

window.onload = () => {
    CasitaDigital({
        initialLetter: "D",
        expectedLetter: "B",
        house: document.getElementById("casa"),
        letter: document.getElementById("mensaje"),
    });
};