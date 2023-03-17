// RICHIAMO DELL' API E URL
const myApi = "https://striveschool-api.herokuapp.com/api/product/";
const myAuth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NTc0MWY4MWI0MjAwMTM5YjI5ZGIiLCJpYXQiOjE2NzkwNTQ2NTcsImV4cCI6MTY4MDI2NDI1N30.GJ1_QTNrBI05OWHtRvYS_Us3VWQ2Vzj_a03cMWKldIU";

// FUNZIONE OBJSAVED
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
      window.location.replace("homePage.html"); // Torna alla home page
    } else {
      alert("Problema nel salvare l'oggetto");
    }
  } catch (error) {
    console.log(error);
  }
};

// DICHIARO LE VARIABILI
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
