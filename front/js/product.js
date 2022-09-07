// Fonction de complétion des balises HTML par les données de l'API
let productsFetch = async function () {
    fetch("http://localhost:3000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
      // get data image
      let img = document.getElementByClass(".item__img");
      img[0].innerHTML = "<img src=" + data.imageUrl + " alt=" + data.altTxt + "></img>";
      console.log(img);
      console.log(data.imageURL);

      for (i = 0; i < data.length; i++) {
       
        // data.name and title
        let name = document.getElementById("title");
        name.innerHTML = `${data.name}`;
        let title = document.querySelector("title");
        title.innerHTML = `${data.name}`;
        // price
        let price = document.getElementById("price");
        price.innerHTML = `${data.price}`;
        // description
        let description = document.getElementById("description");
        description.innerHTML = `${data.description}`;
        // colors
        let color = document.getElementById("colors");
        for (i = 0; i < data.colors.length; i++) {
          color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
      }

      });
  };

// Exécution de productsFetch
productsFetch();