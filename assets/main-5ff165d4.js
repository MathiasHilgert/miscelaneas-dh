import{v as e,j as t,s as o}from"./ShowResult-1ebc581f.js";document.querySelector("#app").innerHTML=`
  <div>
  <a href="https://vitejs.dev" target="_blank">
    <img src="${e}" class="logo" alt="Vite logo" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="${t}" class="logo vanilla" alt="JavaScript logo" />
  </a>
  <h1>Hola Mati</h1>
    <h1>Calculadora</h1>
    <input type="text" id="numero1" placeholder="inserte numero 1">
    <input type="text" id="numero2" placeholder="inserte numero 2">
    <input type="text" id="operacion" placeholder="inserte la operación">
    <div class="card">
      <button id="btn" type="button">Calcular</button>
    </div>
    <p id="showRes"></p>
  </div>
`;document.getElementById("btn").addEventListener("click",()=>{o(document.querySelector("#showRes"),document.getElementById("numero1").value,document.getElementById("numero2").value,document.getElementById("operacion").value)});
