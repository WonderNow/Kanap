// Import de la fonction fetchID préalablement exportée dans le fichier "product.js"
import fetchID from "./product.js";

// Déclaration de la variable cartItems afin de pouvoir l'utiliser dans les différentes fonctions ci-dessous

let cartItems = JSON.parse(localStorage.getItem('dataForCart'));
console.log(localStorage);
console.log('cartItems',cartItems);

let section = document.querySelector("#cart__items");
let colors;
let quantity;

// La fonction async ci-dessous permet d'afficher les informations des produits dans le panier
// Le @return permet d'ajouter les éléments un par un dans le DOM
async function addCard() {

    // S'il y a des produit présent dans local storage 
    if (cartItems !== null) {
        console.log(cartItems)
        // ALORS on récupère les produits et leurs informations une par une, dans une variable nommée cartItemKey
        for (let cartItemKey in cartItems) {

            // Récupère l'ID du produit dans local Storage 
            let productID = cartItems[Number(cartItemKey)].id;

            console.log(await fetchID(productID));

            // Récupère les information du produit en passent l'ID du produit en paramètre 
            await fetchID(productID)

                .then(function (article) {

                    // Créer un balise article  
                    let Article = document.createElement('article');
                    // Récupère la couleur du produit renseignée dans le local storage 
                    colors = cartItems[cartItemKey].color;
                    // Récupère la quantité du produit renseignée dans le local storage 
                    quantity = String(cartItems[cartItemKey].quantity);
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
                    Article.setAttribute("data-id", `${productID}`);
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

                })

            // Appel des function suivante une fois que les produits sont insérés
            supprimer();
            modifieQ();
            ValidationOfOrder();
        }

        nombreArticlesTotal ()
    }
    else {
        let titre_Alert = document.getElementById('cart__items');
        titre_Alert.innerHTML = "<h1>Le panier est vide ! </h1>"
        return;
    }

}
// Appel de la fonction addCard()
addCard();

// Calcule et affiche le nombre total de canapés dans le panier
function nombreArticlesTotal () {
    let totalArticlesQuantity = 0;
    for(const cartItemKey in cartItems){
        let cartItem = cartItems[cartItemKey];
        totalArticlesQuantity += cartItem.quantity;
        }
    console.log(`Nombre total d'articles : ${totalArticlesQuantity}`);

    // récupère la balise l'id totalQuantity 
    let quantityTotal = document.getElementById('totalQuantity');
    // ajoute la quantité total au DOM
    quantityTotal.innerHTML = totalArticlesQuantity;
}

function supprimer(){}

function modifieQ(){}

function ValidationOfOrder(){}