import '../style.css'
import javascriptLogo from '../../javascript.svg'
import viteLogo from '../../vite.svg'
import {showResult} from '../ShowResult'


console.log("hola estoy en pagina 2")
document.querySelector('#app').innerHTML = `
  <div>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
  </a>
  <a href="https://vitejs.dev" target="_blank">
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
  </a>
  <h1>Vamos carajo!!!!!</h1>
    <h1>Calculadora</h1>
    <input type="text" id="numero1" placeholder="inserte numero 1">
    <input type="text" id="numero2" placeholder="inserte numero 2">
    <input type="text" id="operacion" placeholder="inserte la operación">
    <div class="card">
      <button id="btn" type="button">Calcular</button>
    </div>
    <p id="showRes"></p>
  </div>
`;
document.getElementById("btn").addEventListener('click', () => {
  showResult(document.querySelector('#showRes'),document.getElementById('numero1').value,document.getElementById('numero2').value,document.getElementById('operacion').value);
})