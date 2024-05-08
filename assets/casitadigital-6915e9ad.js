import"./modulepreload-polyfill-ec808ebb.js";class r{constructor(){this.data={type:"blockly-type",event:0,message:"",id:"",state:""}}getValues(){const l=document.location.href.split("?");if(l.length<2)return;const c=l[1].split("&");for(const n of c){if(n.length<2)continue;const a=n.split("=");if(!(a.length<2))switch(a[0]){case"event":this.data.event=a[1];break;case"message":this.data.message=a[1];break;case"id":this.data.id=a[1];break;case"state":this.data.state=a[1];break}}console.log("Received data (RAW):",c),console.log("Received data (PARSED):",this.data)}onSuccessEvent(t){this.data.event="SUCCESS",this.data.message=t,console.log("SENDING SUCCESS EVENT:",this.data),window.top.postMessage(this.data,"*")}onFailEvent(t){this.data.event="FAILURE",this.data.message=t,console.log("SENDING FAILURE EVENT:",this.data),window.top.postMessage(this.data,"*")}sendState(t){this.data.event="STATE",this.data.state=t,console.log("SENDING STATE:",this.data),window.top.postMessage(this.data,"*")}}const e={houseContainer:null,houseMap:null,messageElement:null,lights:[],onLightsChange:s=>{},availableChars:[" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z",".",",","!","?"],setLightsValues:s=>{for(let t=0;t<s.length;t++)e.lights[t].value=s[t];e.updateMessage()},translateLightsToMessage:s=>{let t="";for(let c of s)t+=c.value;let l=parseInt(t,2);return e.availableChars[l]},updateText:s=>{const t=e.availableChars[s];e.messageElement.innerText.length>3?(e.messageElement.innerHTML=e.messageElement.innerHTML.slice(0,-1),setTimeout(()=>{e.updateText(s)},25)):e.messageElement.innerHTML+=t},updateMessage:()=>{window.scrollTo(0,1e4);let s="";for(let l of e.lights){let c=l.value;s+=c,c=="1"?(l.classList.add("prendida"),l.classList.remove("apagada")):(l.classList.remove("prendida"),l.classList.add("apagada"))}let t=parseInt(s,2);e.updateText(t)},createLights:()=>{let s=document.createElement("SELECT"),t=document.createElement("OPTION");t.innerHTML="1",t.value="1",s.appendChild(t);let l=document.createElement("OPTION");l.innerHTML="0",l.value="0",s.appendChild(l);for(let c=0;c<5;c++){let n=document.querySelector(".luz"+c),a=s.cloneNode(!0);a.value=0,a.addEventListener("change",()=>{e.onLightsChange(e.lights),e.updateMessage()}),n.appendChild(a),e.lights===void 0&&(e.lights=[]),e.lights.push(a)}},createHouse:(s,t)=>{for(let l of t){let c=document.createElement("TR");for(let n of l)if(n!="n"){let a=document.createElement("TD");a.classList.add(n),n.includes("luz")&&(a.setAttribute("colspan","2"),a.setAttribute("rowspan","2")),n.includes("mensaje")&&(a.setAttribute("colspan","4"),a.setAttribute("rowspan","3"),a.setAttribute("id","caja-mensajes")),c.appendChild(a)}s.appendChild(c)}},init:(s,t,l,c)=>{e.houseContainer=s,e.houseMap=t,e.messageElement=l,e.onLightsChange=c,e.createHouse(s,t),e.createLights()}},v=s=>{const t=new r,l=document.getElementById("casa"),c=[["c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c","c"],["c","c","c","c","c","c","c","c","ti","t","t","t","t","td","c","c","c","c","c","c","c","c"],["c","c","c","c","c","c","c","ti","t","t","t","t","t","t","td","c","c","c","c","c","c","c"],["c","c","c","c","c","c","ti","t","t","mensaje","n","n","n","t","t","td","c","c","c","c","c","c"],["c","c","c","c","c","ti","t","t","t","n","n","n","n","t","t","t","td","c","c","c","c","c"],["c","c","c","c","ti","t","t","t","t","n","n","n","n","t","t","t","t","td","c","c","c","c"],["c","c","c","ti","t","t","t","t","t","t","t","t","t","t","t","t","t","t","td","c","c","c"],["c","c","ti","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","t","td","c","c"],["c","tiab","p","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","p","tdab","c"],["c","c","p","bl","luz0","n","bl","luz1","n","bl","luz2","n","bl","luz3","n","bl","luz4","n","bl","p","c","c"],["c","c","p","bl","n","n","bl","n","n","bl","n","n","bl","n","n","bl","n","n","bl","p","c","c"],["v","v","p","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","bl","p","v","v"],["v","v","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","p","v","v"],["v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v"],["v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v","v"]],n=document.getElementById("mensaje"),a=Object.create(e);if(a.init(l,c,n,i=>{if(a.translateLightsToMessage(i)!==s){t.onFailEvent("¡Oh no! Esa no es la letra correcta. Inténtalo de nuevo.");return}t.onSuccessEvent("¡Bien hecho! Has encontrado la letra correcta.");const o=[];for(let d of i)o.push(parseInt(d.value));t.sendState(o)}),t.getValues(),t.data.state){const i=t.data.state.split(",");a.setLightsValues(i)}};window.onload=()=>{v("J")};