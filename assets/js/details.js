// RICHIAMO DELL' API E URL
const myApi = "https://striveschool-api.herokuapp.com/api/product/";
const myAuth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NTc0MWY4MWI0MjAwMTM5YjI5ZGIiLCJpYXQiOjE2NzkzNTA2MTEsImV4cCI6MTY4MDU2MDIxMX0.M0DDg2Bpb4XuDRHfiIhw1hSC_B4v4a7-2cyXDdL8jUE";

let eventId = new URLSearchParams(window.location.search).get("eventId");
console.log("EVENTID", eventId);

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

// FUNZIONE myProduct per la renderizzazione dei prodotti nella pagina Details 
const myProduct = function () {
  fetch(myApi + eventId, {
    method: "GET",
    headers: {
      Authorization: myAuth,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((shopElements) => {
      let euroSimbol = '€'
      console.log(shopElements);
      let details = document.getElementById("details-container");
      details.innerHTML += `
      <h1 class="mt-5 mb-4">Dettagli prodotto</h1>
      <form id="product-form">
        <div style="display: flex;">
          <div style="flex: 2;">
            <h3 style="font-size: 20px;">Nome</h3>
            <input id='name-input' type="text" value="${shopElements.name}">
            <h3 style="font-size: 20px; margin-top:20px;">Descrizione</h3>
            <input id='description-input' type="text" value="${shopElements.description}">
            <h3 style="font-size: 20px; margin-top:20px;">Marca</h3>
            <input id='brand-input' type="text" value="${shopElements.brand}">
            <h3 style="font-size: 20px; margin-top:20px;">Prezzo</h3>
            <input id='price-input' type="text" value="${shopElements.price}">
            <h3 style="font-size: 20px; margin-top:20px;">ID</h3>
            <input class="mb-3" id='id-input' type="text" value="${shopElements._id.euroSimbol}">
          </div>
            <img src="${shopElements.imageUrl}" class="card-img" alt="" style="width: 500px; height: auto; margin-right: 20%;"> 
        </div>
        <div>
          <button type="submit" class="btn btn-primary mt-3">Salva Prodotto</button>
        </div>
      </form>
      `;

      // Riassegno i nuovi valori indicati per modificare le informazioni del prodotto
      const productForm = document.getElementById("product-form");
      productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const updatedProduct = {
          name: document.getElementById("name-input").value,
          description: document.getElementById("description-input").value,
          brand: document.getElementById("brand-input").value,
          price: document.getElementById("price-input").value,
        };

        // Fetch per operazione di conferma di cambio info prodotti
        fetch(myApi + eventId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: myAuth,
          },
          body: JSON.stringify(updatedProduct),
        })
          .then((response) => {
            if (response.ok) {
              alert("Il prodotto è stato modificato correttamente!");
              window.location.href = "Home.html";
            } else {
              alert("Errore nella modifica del prodotto.");
            }
          })
          .catch((error) => console.error(error));
      });
    });
};

myProduct();


// variabile Delete
let deletePut = document.getElementById("deleted");
deletePut.addEventListener("click", deleteProduct);

// Funzione deleteProduct per eliminare il prodotto corrente all'interno della pagina Details.html
function deleteProduct() {
  fetch(myApi + eventId, {
    method: "DELETE",
    headers: {
      Authorization: myAuth,
    },
  })
  // Eventuale conferma per la rimozione del prodotto
  .then((response) => {
    if (confirm("Sei sicuro di voler eliminare il prodotto?")) {
      console.log(response);
      alert("Prodotto eliminato con successo!");
      window.location.href = "Home.html";
    }
  })
    .catch((error) => {
      console.error("Error:", error);
      alert("Errore durante l'eliminazione del prodotto.");
    });
}

