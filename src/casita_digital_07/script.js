import CasitaCompleja from "../shared/casita-compleja";

window.onload = () => {
    CasitaCompleja({
        initialWord: "B?????O",
        expectedWord: "BINARIO",
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
    });
}