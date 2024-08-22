import CasitaCompleja from "../shared/casita-compleja";

window.onload = () => {
    CasitaCompleja({
        initialWord: "ALGO????O",
        expectedWord: "ALGORITMO",
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
    });
}