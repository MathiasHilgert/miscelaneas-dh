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
            console.log(houses)
            houses.forEach(house => {
                const lettersPreview = document.querySelectorAll(".char-preview")[house.index - 1]
                const indexContainer = document.createElement("div")
                const indexNumber = document.createElement("b")
                const htmlElement = house.htmlElement
                indexNumber.innerHTML = house.index
                const numbersPreview = indexNumber.cloneNode(true)
                htmlElement.appendChild(indexContainer)
                indexContainer.appendChild(indexNumber)
                lettersPreview.appendChild(numbersPreview)
                console.log(lettersPreview);
                
                if(house.isOK == false){
                    const check = document.createElement("span")
                    check.classList.add("check-false")
                    check.innerHTML = "❌"
                    const checkPreview = check.cloneNode(true)
                    htmlElement.appendChild(check)
                    lettersPreview.appendChild(checkPreview)
                }else{
                    const check = document.createElement("span")
                    check.classList.add("check-true")
                    check.innerHTML = "✅"
                    const checkPreview = check.cloneNode(true)
                    htmlElement.appendChild(check)
                    lettersPreview.appendChild(checkPreview)
                }
            }
        );
        },
    }
);
}