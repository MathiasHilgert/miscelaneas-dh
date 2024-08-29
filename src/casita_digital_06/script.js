import CasitaCompleja from "../shared/casita-compleja";
const $ = $ => document.getElementById($)
window.onload = () => {
    const casitaPreview = $("previewCaja")
    CasitaCompleja({
        initialWord: "ALGO????O",
        expectedWord: "ALGORITMO",
        container: document.getElementById("casita"),
        preview: document.getElementById("preview"),
        onHouseChange: (houses) => {
            // console.log(houses.index[1])
            houses.forEach(house => {
                // Logica de casita compleja
                const indexContainer = document.createElement("div")
                const indexNumber = document.createElement("span")
                const htmlElement = house.htmlElement
                indexNumber.innerHTML = house.index
                htmlElement.appendChild(indexContainer)
                indexContainer.appendChild(indexNumber)
                if(house.isOK == false){
                    const check = document.createElement("span")
                    check.classList.add("check-false")
                    check.innerHTML = "❌"
                    htmlElement.appendChild(check)
                }else{
                    const check = document.createElement("span")
                    check.classList.add("check-true")
                    check.innerHTML = "✅"
                    htmlElement.appendChild(check)
                }
            }
        );
        },
    }
);
}