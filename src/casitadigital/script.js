import CasitaDigital from "../shared/casita-digital";

window.onload = () => {
    CasitaDigital({
        initialLetter: "C",
        expectedLetter: "B",
        house: document.getElementById("casa"),
        letter: document.getElementById("mensaje"),
        isFreeMode: true,
    });
};