import CasitaCompleja from "../shared/casita-compleja";

window.onload = () => {
    CasitaCompleja({
        initialWord: "Casa",
        expectedWord: "Cama",
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
    });
}