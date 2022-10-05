import fetchID from "./product.js";

let produitLocalStorage;

// La fonction async ci-dessous permet d'afficher les informations des produits dans le panier
// Le @return permet d'ajouter les élément un par un dans le DOM
async function addCard() {
    console.log(produitLocalStorage);

    // S'il y a des produit présent dans local storage 
    if (produitLocalStorage !== null) {

        // ALORS on récupère les produits et leurs informations une par une, dans une variable nommée key
        for (let key in produitLocalStorage) {

            // Récupère l'id du produit dans local Storage 
            let pi = produitLocalStorage[Number(key)]._id;

            console.log(await fetchID(pid));

            // Récupère les information du produit en passent l'id du produit en paramètre 
            await fetchID(pid)

                .then(function (article) {

                    // Créer un balise article  
                    let Article = document.createElement('article');
                    // Récupère la couleur du produit renseignée dans le local storage 
                    colors = produitLocalStorage[key].colors;
                    // Récupère la quantité du produit renseignée dans le local storage 
                    quantity = String(produitLocalStorage[key].quantity);
                    // Récupère l'image du produit ayant été retournée par l'API 
                    let Img = article.imageUrl;
                    // Récupère le texte descriptif de l'image du produit ayant été retourné par l'API
                    let Altimg = article.altTxt;
                    // Récupère le nom du produit ayant été retourné par l'API
                    let Name = article.name;
                    // Récupère le prix du produit ayant été retourné par l'API
                    let Price = article.price;
                    // Ajoute l'élément Article comme enfant de l'élément section
                    section.appendChild(Article);
                    // Ajout de la classe "cart__item" 
                    Article.classList.add("cart__item")
                    // Ajout de l'attribut "data-id"
                    Article.setAttribute("data-id", `${id}`);
                    // Ajout de l'attribut "data-color"
                    Article.setAttribute("data-color", `${colors}`);
                    // Ajout des éléments sous format HTML, en suivant le format indiqué dans le fichier 'cart.html'
                    Article.innerHTML =
                        `<div class="cart__item__img">
                            <img src="${Img}" alt="${Altimg}">
                        </div>
                        <div class="cart__item__content__description">
                                    <h2>${Name}</h2>
                                    <p>${colors}</p>
                                    <p>${Price} €</p>
                                </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p id="deleteItem" class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                    </div> `;

                    total(Price, quantity);
                })

            // Appel des function suivante une fois que les produits sont insérés
            supprimer();
            modifieQ();
            ValidationOfOrder();
        }
    }
    else {
        let titre_Alert = document.getElementById('cart__items');
        titre_Alert.innerHTML = "<h1>Le panier est vide ! </h1>"
        return;
    }

}
// Appelle de la fonction addCard()
addCard();