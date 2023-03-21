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

let inputFade = document.createElement("style");
inputFade.innerHTML = fadeAnimate;
document.head.appendChild(inputFade);

// FUNZIONE myShop per renderizzare i le cards dei prodotti nella Home Page
const myShop = function () {
  fetch(myApi, {
    method: "GET",
    headers: {
      Authorization: myAuth,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((ev) => {
      console.log(ev);
      ev.forEach((shopElements) => {
        console.log(shopElements);
        let shop = document.getElementById("shopList");
        shop.innerHTML +=
          // CARDS BOOTSTRAP
          `
          <div class="card">
              <img src="${shopElements.imageUrl}" class="card-img-top img-fluid" alt="">
             <div class="card-body">
                <h5 class="card-title">${shopElements.name}</h5>
                <p class="card-text mx-3 px-2">${shopElements.description}</p>
                <p>${shopElements.price} €</p>
                <div>
                 <a href="details.html?eventId=${shopElements._id}" class="btn">Details</a>
                 <a href="" class="btn bg-warning">Buy<i class="bi bi-cart4"></i></a>
                </div>
             </div>
          </div>
              `;
      });
      console.log;
    });
};
myShop();
