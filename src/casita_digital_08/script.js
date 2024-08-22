import CasitaCompleja from "../shared/casita-compleja";

window.onload = () => {
    CasitaCompleja({
        initialWord: "NA???AL",
        expectedWord: "NATURAL",
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
    });
}