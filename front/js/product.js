let data;
let id;



// Récupère l'ID présent dans l'URL concernée
let url = new URL(window.location.href);
console.log(url);
let search_params = new URLSearchParams(url.search);
// Vérifie si le paramètre existe dans l'URL → si oui, @return true;
if (search_params.has('id')) {
    // Récupère l'ID dans les paramètres de l'URL 
    id = search_params.get('id');
}



/**
 * Création de la fonction async fetchID
 * Appelle l'API pour récupérer le produit associé a l'ID présent dans l'URL concernée
 * @param productID - Identifiant du produit
 * @return data - Contient les données du produit concerné 
 */
export default async function fetchID(productID)
{ 
    if (productID !== undefined) {

        // Appelle l'API avec l'ID présent dans l'URL 
        return await fetch('http://localhost:3000/api/products/' + productID)
            // Convertit la réponse au format json 
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })

            .then(async function (value) {
                // Attend la réponse du serveur et stocke cette dernière dans une variable 
                data = await value;

                if (data) {
                    console.log(data);
                }
                return data

            })
            .catch(function (err) {

                // En cas d'erreur : 
                console.log("Une erreur est survenue : " + err);
            });
    }
};



/**
 * Appelle de la function fetchID()
 * Récupère le résultat de la requête dans une variable 
 * Enfin, appelle la function produit avec l'article récupéré 
 */
 fetchID(id)
 .then((data) => {produit(data) })
 .catch((err) => console.log(err));



/**
 Ajoute les données de l'API dans les différentes balises du DOM
 @param {*} data 
*/
async function produit(data) {
    console.log(data);
    if (data !== undefined) {
        // Récupère la balise avec la classe 'item_img' et lui ajoute l'image du produit */
        const item__img = document.getElementsByClassName("item__img");
        item__img[0].innerHTML = "<img src=" + data.imageUrl + " alt=" + data.altTxt + "></img>";

        //Récupère la balise qui contient l'ID 'title' et ajoute le nom de l'data
        const title = document.getElementById('title');
        title.innerText = data.name;

        //Récupère la balise qui contient la classe 'price' et ajoute le prix de l'article 
        const price = document.getElementById('price');
        price.innerText = data.price;

        // Récupère la balise qui contient l'id 'description' et ajoute la description de l'article 
        const description = document.getElementById('description');
        description.innerText = data.description;

        // Récupère les couleurs dans le tableau des couleurs du produit 
        // Récupère la balise qui contient l'ID colors et ajoute les couleurs
        for (let colors of data.colors) {
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }
    }
}



// Alertes d'erreur ou de confirmation + Ajout du produit dans le local storage
const buttonAddToCart = document.querySelector("#addToCart")
if (buttonAddToCart != null) {
    buttonAddToCart.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        // SI la couleur ET le nombre de canapés voulus ne sont pas indiqués par l'utilisateur ALORS on envoie une alerte d'erreur personnalisée
        if (color == null || color === "" && quantity == 0) {
            alert("Oups... 🥺\n\nTu n'as pas sélectionné de couleur pour ton canapé, et tu n'as pas indiqué combien tu en souhaites.\n\nVa vite arranger tout ça ! 😉")
            return
        }
        // SI la couleur est indiquée mais pas le nombre ALORS on envoie une alerte d'erreur personnalisée
        if (color != null && color != "" && quantity == 0) {
            alert("Oups... 🥺\n\nTu n'as pas indiqué combien tu veux de canapés.\n\nVa vite arranger ça ! 😉")
            return
        }
        // SI le nombre est indiqué mais pas la couleur ALORS on envoie une alerte d'erreur personnalisée
        if (color == null || color === "" && quantity > 0) {
            alert("Oups... 🥺\n\nTu n'as pas sélectionné de couleur pour ton canapé.\n\nVa vite arranger ça ! 😉")
            return
        }
        // SI la couleur ET le nombre de canapés voulus sont correctement indiqués par l'utilisateur ALORS on envoie une alerte de confirmation personnalisée
        if (color != null && color != "" && quantity > 0) {
            alert("Félicitations ! 🎉\n\nCet article a bien été ajouté à ton panier ! 😉")
            window.location.href = "cart.html" // Envoie directement sur la page Panier
        }

        // Ajout du produit dans le local storage
        const dataForCart = {
            color: color,
            id: id,
            quantity: Number(quantity)
        }
        let produitLocalStorage = JSON.parse(localStorage.getItem("dataForCart"));

        if(produitLocalStorage == null){
            produitLocalStorage = [];
        }

        produitLocalStorage.push(dataForCart);

        localStorage.setItem("dataForCart", JSON.stringify(produitLocalStorage)) // JSON.stringify() permet de transformer les données au format JSON afin de pouvoir les exploiter
    })
}