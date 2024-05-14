import"./modulepreload-polyfill-ec808ebb.js";const r="id",p="state";class v{constructor(){this.data={type:"blockly-type",id:"",state:{}}}getValues(){const c=document.location.href.split("?");if(c.length<2)return;const n=c[1].split("&");for(const a of n){if(a.length<2)continue;const l=a.split("=");if(!(l.length<2))switch(l[0]){case r:this.data[r]=l[1];break;case p:this.data[p]=l[1];break}}}postToPg(t){t.type=this.data.type,t.id=this.data.id,window.top.postMessage(t,"*")}}const e={houseContainer:null,houseMap:null,messageElement:null,lights:[],onLightsChange:s=>{},availableChars:[" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z",".",",","!","?"],setLightsValues:s=>{for(let t=0;t<s.length;t++)e.lights[t].value=s[t];e.updateMessage()},translateLightsToMessage:s=>{let t="";for(let n of s)t+=n.value;let c=parseInt(t,2);return e.availableChars[c]},updateText:s=>{const t=e.availableChars[s];e.messageElement.innerText.length>3?(e.messageElement.innerHTML=e.messageElement.innerHTML.slice(0,-1),setTimeout(()=>{e.updateText(s)},25)):e.messageElement.innerHTML+=t},updateMessage:()=>{window.scrollTo(0,1e4);let s="";for(let c of e.lights){let n=c.value;s+=n,n=="1"?(c.classList.add("prendida"),c.classList.remove("apagada")):(c.classList.remove("prendida"),c.classList.add("apagada"))}let t=parseInt(s,2);e.updateText(t)},createLights:()=>{let s=document.createElement("SELECT"),t=document.createElement("OPTION");t.innerHTML="1",t.value="1",s.appendChild(t);let c=document.createElement("OPTION");c.innerHTML="0",c.value="0",s.appendChild(c);for(let n=0;n<5;n++){let a=document.querySelector(".luz"+n),l=s.cloneNode(!0);l.value=0,l.addEventListener("change",()=>{e.onLightsChange(e.lights),e.updateMessage()}),a.appendChild(l),e.lights===void 0&&(e.lights=[]),e.lights.push(l)}},createHouse:(s,t)=>{for(let c of t){let n=document.createElement("TR");for(let a of c)if(a!="n"){let l=document.createElement("TD");l.classList.add(a),a.includes("luz")&&(l.setAttribute("colspan","2"),l.setAttribute("rowspan","2")),a.includes("mensaje")&&(l.setAttribute("colspan","4"),l.setAttribute("rowspan","3"),l.setAttribute("id","caja-mensajes")),n.appendChild(l)}s.appendChild(n)}},init:(s,t,c,n)=>{e.houseContainer=s,e.houseMap=t,e.messageElement=c,e.onLightsChange=n,e.createHouse(s,t),e.createLights()}},d=s=>{const t=new v,c=document.getElementById("casa"),n=[["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"],["c","c","c","c","c","c","c","c","ti","t","t","t","t","td","c","c","c","c","c","c","c","c"],["c","c","c","c","c","c","c","ti","t","t","t","t","t","t","td","c","c","c","c","c","c","c"],["c","c","c","c","c","c","ti","t","t","mensaje","n","n","n","t","t","td","c","c","c","c","c","c"],["c","c","c","c","c","ti","t","t","t","n","n","n","n","t","t","t","td","c","c","c","c","c"],["c","c","c","c","ti","t","t","t","t","n","n","n","n","t","t","t","t","td","c","c","c","c"],["c","c","c","ti","t","t","t","t","t","t","t","t","t","t","t","t","t","t","td","c","c","c"],["c","c","ti","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","td","c","c"],["c","tiab","p","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","p","tdab","c"],["c","c","p","bl","luz0","n","bl","luz1","n","bl","luz2","n","bl","luz3","n","bl","luz4","n","bl","p","c","c"],["c","c","p","bl","n","n","bl","n","n","bl","n","n","bl","n","n","bl","n","n","bl","p","c","c"],["v","v","p","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","p","v","v"],["v","v","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","v","v"],["v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v"],["v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v"]],a=document.getElementById("mensaje"),l=Object.create(e);l.init(c,n,a,i=>{if(l.translateLightsToMessage(i)!==s){t.postToPg({event:"FAILURE",message:"¡Oh no! Esa no es la letra correcta. Inténtalo de nuevo.",reasons:[],state:JSON.stringify({lights:Array.from(i).map(o=>parseInt(o.value))})});return}t.postToPg({event:"SUCCESS",message:"¡Felicidades! Has encontrado la letra correcta.",reasons:[],state:JSON.stringify({lights:Array.from(i).map(o=>parseInt(o.value))})})}),t.getValues(),console.log("Previous state: ",t.data),t.data.state.lights&&l.setLightsValues(t.data.state.lights)};window.onload=()=>{d("J")};