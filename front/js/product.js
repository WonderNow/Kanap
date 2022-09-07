let data;
let id;

// Fonction de complétion des balises HTML par les données de l'API
let productsFetch = async function () {
  fetch("http://localhost:3000/api/products/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

    // Image du canapé
    let img = document.getElementById("item__img");
    img[0].innerHTML = "<img src=" + data.imageUrl + " alt=" + data.altTxt + "></img>";
    console.log(img);
    console.log(data.imageURL);

    // Nom du canapé
    let name = document.getElementById("title");
    name.innerHTML = `${data.name}`;

    // Prix du canapé
    let price = document.getElementById("price");
    price.innerHTML = `${data.price}`;

    // Description du canapé
    let description = document.getElementById("description");
    description.innerHTML = `${data.description}`;

    // Couleur(s) du canapé
    let color = document.getElementById("colors");
    for (i = 0; i < data.colors.length; i++) {
      color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }

    });
  };

// Exécution de productsFetch
productsFetch();