import { suma} from "./funciones/funciones.js";

export function showResult(element, num1, num2, op) {
  let resultado = 0;
  resultado = suma(num1, num2);
//   switch (op) {
//     case 1:
//       console.log("suma");
//       resultado = suma(num1, num2);
//     case 2:
//       resta(num1, num2);
//   }

  element.innerHTML = `Result is ${resultado}`;
}