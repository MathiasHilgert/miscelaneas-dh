import { FreeStaticCasitaCompleja } from "../shared/casita-compleja";

window.onload = () => {
    FreeStaticCasitaCompleja({
        housesAmount: 3,
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
    });
}