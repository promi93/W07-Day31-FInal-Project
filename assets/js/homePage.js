// RICHIAMO DELL' API E URL
const myApi = "https://striveschool-api.herokuapp.com/api/product/";
const myAuth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NTc0MWY4MWI0MjAwMTM5YjI5ZGIiLCJpYXQiOjE2NzkwNTQ2NTcsImV4cCI6MTY4MDI2NDI1N30.GJ1_QTNrBI05OWHtRvYS_Us3VWQ2Vzj_a03cMWKldIU";

// FUNZIONE SHOPPING
const myShopping = function () {
  // FETCH SECTION
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
      ev.forEach((shopElement) => {
        console.log(shopElement);
        let shop = document.getElementById("shopList");
        shop.innerHTML += `
          <div class="card w-25">
          <img src="${shopElement.imageUrl}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${shopElement.name}</h5>
            <p class="card-text">${shopElement.description}</p>
            <p>${shopElement.price} €</p>
            <a href="details.html?eventId=${shopElement._id}" class="btn">Details</a>
          </div>
        </div>
              `;
      });
      console.log;
    });
};
myShopping();
