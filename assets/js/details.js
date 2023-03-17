// RICHIAMO DELL' API E URL
const myApi = "https://striveschool-api.herokuapp.com/api/product/";
const myAuth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NTc0MWY4MWI0MjAwMTM5YjI5ZGIiLCJpYXQiOjE2NzkwNTQ2NTcsImV4cCI6MTY4MDI2NDI1N30.GJ1_QTNrBI05OWHtRvYS_Us3VWQ2Vzj_a03cMWKldIU";

let eventId = new URLSearchParams(window.location.search).get("eventId");
console.log("EVENTID", eventId);

const myShop = function () {
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
      console.log(shopElements);
      let details = document.getElementById("details-container");
      details.innerHTML += `
        <h1>Dettagli prodotto</h1>
          <h3>Name</h3>
        <input id='input' type="text" value="${shopElements.name}" disabled>
          <h3>Description</h3>
          <input id='input' type="text" value="${shopElements.description}" disabled>
          <h3>Brand</h3>
          <input id='input' type="text" value="${shopElements.brand}" disabled>
          <h3>Image Url</h3>
          <input id='input' type="text" value="${shopElements.imageUrl}" disabled>
          <h3>Price</h3>
          <input id='input' type="text" value="${shopElements.price}" disabled>
             <h3>ID</h3>
            <input id='input' type="text" value="${shopElements._id}" disabled>
            <div>
            <a href="details.html" class="btn btn-primary mt-3">Modifica</a>
            </div>
            
            `;
    });
};
myShop();
