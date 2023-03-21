// RICHIAMO DELL' API E URL
const myApi = "https://striveschool-api.herokuapp.com/api/product/";
const myAuth =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NTc0MWY4MWI0MjAwMTM5YjI5ZGIiLCJpYXQiOjE2NzkzNTA2MTEsImV4cCI6MTY4MDU2MDIxMX0.M0DDg2Bpb4XuDRHfiIhw1hSC_B4v4a7-2cyXDdL8jUE";

// Dichiaro variabile per input di ricerca
let searchInputReference = document.getElementById("searchIcon");
let input;

// collego l'evento click alla "button" per l'input search 
searchInputReference.addEventListener("click", (e) => {
  e.preventDefault();
  
  // piccola animazione per far comparire il campo di input da icona a text input in dissolvenza. . .
  let inpuText = document.createElement("input");
  inpuText.style.borderRadius = "30px";
  inpuText.placeholder = "inserisci testo";
  inpuText.style.animation = "slideIn 0.5s forwards";
  inpuText.style.transformOrigin = "top right";
  searchInputReference.replaceWith(inpuText);
});
let fadeAnimate = `@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}`;


let inputFade = document.createElement('style');
inputFade.innerHTML = fadeAnimate;
document.head.appendChild(inputFade);

// FUNZIONE OBJSAVED per creare un determinato prodotto
const objSaved = async function (obj) {
  try {
    let response = await fetch(myApi, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: myAuth,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Oggetto salvato");
      window.location.replace("Home.html"); // Torna alla home page
    } else {
      alert("Problema nel salvare l'oggetto");
    }
  } catch (error) {
    console.log(error);
  }
};

// DICHIARO LE VARIABILI e richiamo le proprietà dell'oggetto inserendo dentro la funzione objSaved per poi caricaricali sulla home page
let buttonInputReference = document.getElementById("btn-input");
buttonInputReference.addEventListener("click", () => {
  let newObject = {
    name: document.getElementById("nome-input").value,
    description: document.getElementById("descrizione-input").value,
    brand: document.getElementById("brand-input").value,
    imageUrl: document.getElementById("url-input").value,
    price: document.getElementById("prezzo-input").value,
  };
  console.log(newObject);
  objSaved(newObject);
});


