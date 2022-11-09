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
// Appel de la fonction addCard()
addCard();

let tabPrice = [];
let tabQuantite = [];

function total(price, quantite) {
    console.log('price', price);
    console.log('quantité', quantite);
    // récupère la balise l'id totalQuantity 
    let quantityTotal = document.getElementById('totalQuantity');
    // récupère la balise totalPrice 
    let prixTotal = document.getElementById('totalPrice');
    // nombre de la quantité total
    let totalQ = 0;
    // nombre du prix total 
    let totalP = 0;
    // récupère la quantité selection lors de l'ajout dans le local storage 
    let QNumber = Number(quantite);
    // ajoute le prix du produit dans le tableau du prix 
    tabPrice.push({ price });
    // ajoute la quantité du produit dans le tableau de le quantité
    tabQuantite.push({ QNumber })

    console.log(tabPrice);
    console.log(tabQuantite);
    // récupère les produits présent dans le tableau de prix un par un dans une variable 
    for (let key in tabPrice) {
        console.log(tabPrice[key].price)
        // calcul le prix total et les enregistre dans leur variable 
        totalP += (tabQuantite[key].QNumber * tabPrice[key].price);
        // calcul la quantité total et les enregistre dans leur variable 
        totalQ += tabQuantite[key].QNumber;
    }
    console.log(totalP);
    console.log(totalQ);

    // ajoute la quantité total au DOM
    quantityTotal.innerHTML = totalQ;
    // ajoute le prix total au DOM
    prixTotal.innerHTML = totalP;

}

function supprimer(){}

function modifieQ(){}

function ValidationOfOrder(){}