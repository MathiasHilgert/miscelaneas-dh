import CasitaCompleja from "../shared/casita-compleja";

window.onload = () => {
    CasitaCompleja({
        initialWord: "DIGITAL",
        expectedWord: "DIGITAL",
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
    });
}