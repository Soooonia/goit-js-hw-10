const e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),n=document.querySelector(".error"),o=document.querySelector(".cat-info");document.addEventListener("DOMContentLoaded",(()=>{t.style.display="block",n.style.display="none",fetch("https://api.thecatapi.com/v1/breeds").then((e=>e.json())).then((e=>e.map((e=>({id:e.id,name:e.name}))))).catch((e=>{throw console.error("Error fetching cat breeds:",e),e})).then((n=>{n.forEach((t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,e.appendChild(n)})),t.style.display="none"})).catch((()=>{n.style.display="block",t.style.display="none"}))})),e.addEventListener("change",(()=>{const n=e.value;o.innerHTML="",o.style.display="none",t.style.display="block",fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${n}`).then((e=>e.json())).then((e=>{const t=document.createElement("img");return t.src=e[0].url,o.appendChild(t),fetch(`https://api.thecatapi.com/v1/breeds/${n}`)})).then((e=>e.json())).then((e=>{const n=document.createElement("h2");n.textContent=e.name,o.appendChild(n);const c=document.createElement("p");c.textContent=e.description,o.appendChild(c);const a=document.createElement("p");a.textContent=`Temperament: ${e.temperament}`,o.appendChild(a),o.style.display="block",t.style.display="none"})).catch((e=>{console.error("Error fetching cat breed details:",e),e.style.display="block",t.style.display="none"}))}));
//# sourceMappingURL=index.b3dbbb34.js.map
