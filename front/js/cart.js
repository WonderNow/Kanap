﻿// Import de la fonction fetchID préalablement exportée dans le fichier "product.js"
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

/**
 * ajoute un événement de type click au balise ayant l'id deleteItem 
 ** Supprime l'élément cliqué dans le localStorage
 */
 function supprimer() {
    let sup = document.querySelectorAll("#deleteItem");
    console.log(sup);
    // récupère les balise ayant l'id deleteItem un par un 
    for (let i = 0; i < sup.length; i++) {
        // ajoute l'événement de type click au bouton supprimé de chaque produit présent dans le localStorage
        sup[i].addEventListener("click", () => {
            console.log('sup');
            // récupère l'id du produit cliqué  
            let _ID = sup[i].closest("article").dataset.id;
            // récupère la couleur du produit cliqué 
            let _COLOR = sup[i].closest("article").dataset.color;
            // filtre les produits qui n'ont pas l'id et la couleur identique a celui cliquer 
            cartItems = cartItems.filter(element => element.id !== _ID || element.color !== _COLOR);
            // modifie objet present dans localStorage 
            localStorage.setItem("dataForCart", JSON.stringify(cartItems));
            // recharge la page pour affiché les modifications 
            location.reload();
            console.log(cartItems);
        });
    };
}


/**
* ajoute un événement de type click au balise ayant la class itemQuantity
** modifie la quantité du produit cliqué
*/
function modifieQ() {
    // récupère les balise ayant la class itemQuantity
    let modify = document.querySelectorAll('.itemQuantity');
    // récupère les balise ayant la class itemQuantity un par un 
    for (let i = 0; i < modify.length; i++) {
        // ajoute un événement de type a la case modifier de chaque produit présent dans localStorage 
        modify[i].addEventListener('change', () => {
            // récupère l'id du produit cliqué 
            let _ID = modify[i].closest("article").dataset.id;
            // récupère la couleur du produit cliqué 
            let _COLOR = modify[i].closest("article").dataset.color;
            // récupère la quantité de la case du produit cliqué 
            let _QUANTITY = modify[i].value;
            // filtre les produits qui ont l'id et la couleur identique a celui cliquer 
            let produit = cartItems.find(element => element.id == _ID && element.color == _COLOR);
            console.log(produit);
            console.log(cartItems);
            // ajoute la quantité modifier au produit cliqué
            produit.quantity = _QUANTITY;
            // modifie la quantité du produit 
            cartItems[i].quantity = produit.quantity;
            // ajoute la quantité modifier dans le localStorage 
            localStorage.setItem("dataForCart", JSON.stringify(cartItems));
            // recharge la page pour affiché la quantité modifier
            location.reload();

        })
    }
}

// VALIDATION DE COMMANDE \\

// Variable
let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let city = document.getElementById('city');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let email = document.getElementById('email');
let emailErrorMsg = document.getElementById('emailErrorMsg');
let BtnCommander = document.getElementById('order');



// RegExp
let Regex = new RegExp("^[a-zA-Zéèàêîôâ ,.'-]+$");
let addressRegex = new RegExp("^[0-9a-zA-Z]{1,3}[a-z A-Z-'-éèàçêîôâ]{1,20}$");
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');


/**
 * Écoute les événements sur les inputs et les compare au regex
 * @returns boolean 
 */
function verify() {

    // PRÉNOM
    validFirstName();
    function validFirstName() {
        console.log(firstName.value);
        if (firstName.value.length == 0) {
            firstNameErrorMsg.innerHTML = "Merci de renseigner ce champ !";
        }
        else if (Regex.test(firstName.value)) {

            firstNameErrorMsg.innerHTML = "";
            return true;

        } else {

            firstNameErrorMsg.innerHTML = "Merci de vérifier ce champ !";
            return false;

        }
    };
    firstName.addEventListener('change', () => {
        console.log(firstName.value);
        validFirstName();
    });

    // NOM DE FAMILLE
    validLastName();
    function validLastName() {
        console.log(lastName.value);
        if (lastName.value.length == 0) {

            lastNameErrorMsg.innerHTML = "Merci de renseigner ce champ !";

        } else if (Regex.test(lastName.value)) {
            lastNameErrorMsg.innerHTML = "";
            return true;
        } else {
            lastNameErrorMsg.innerHTML = "Merci de vérifier ce champ !";
            return false;
        }
    }
    lastName.addEventListener('change', () => {
        console.log(lastName.value);
        validLastName();
    });

    // ADRESSE
    validAddress();
    function validAddress() {
        console.log(address.value);
        if (address.value.length === 0) {

            addressErrorMsg.innerHTML = "Merci de renseigner ce champ !";
        }
        else if (addressRegex.test(address.value)) {
            addressErrorMsg.innerHTML = "";
            return true;
        } else {
            addressErrorMsg.innerHTML = "Merci de vérifier ce champ !";
            return false;
        }
    }
    address.addEventListener('change', () => {
        console.log(address.value);
        validAddress();
    });

    // VILLE
    validCity();
    function validCity() {
        if (city.value.length == 0) {
            cityErrorMsg.innerHTML = "Merci de renseigner ce champ !";

        }
        else if (Regex.test(city.value)) {
            cityErrorMsg.innerHTML = "";
            return true;
        } else {
            cityErrorMsg.innerHTML = "Merci de vérifier ce champ !";
            return false;
        }
    }
    city.addEventListener('change', () => {
        console.log(city.value);
        validCity();


    });

    // EMAIL
    validEmail();
    function validEmail() {
        if (email.value.length == 0) {
            emailErrorMsg.innerHTML = "Merci de renseigner ce champ !";

        }
        else if (emailRegex.test(email.value)) {
            emailErrorMsg.innerHTML = "";
            return true;
        } else {
            emailErrorMsg.innerHTML = "Merci de vérifier ce champ !";
            return false;
        }
    }
    email.addEventListener('change', () => {
        console.log(email.value);
        validEmail();
    });

    // Si tous les champs sont valides après la verification des regex, alors renvoie true, sinon renvoie false 
    if (validFirstName() & validLastName() & validAddress() & validCity() & validEmail()) {
        return true;
    } else {
        return false;
    }

}



/**
 * Ajoute un événement de type click au bouton "Commander !"
 * Vérifie la validation des informations saisies par l'utilisateur 
 * Envoie le tableau de commande a l'API 
 * @return l'utilisateur sur la page confirmation de commande 
 */
function ValidationOfOrder() {
    // Ajoute un événement de type click a la balise ayant l'id order
    BtnCommander.addEventListener('click', (e) => {
        // Désactive les événements par default
        e.preventDefault();
        // Tableau contenant les id des produits présents dans le panier lors du passage de la commande
        let id = [];
        console.log(cartItems);
        // Si la variable cartItems est déclaré et n'est pas null
        if (cartItems !== null) {
            // Si produitLocalStrorage a au moins un élément présent 
            if (cartItems.length >= 1) {
                // Récupère les produits un par un 
                for (let i = 0; i < cartItems.length; i++) {
                    // Ajoute l'ID du produit dans le tableau
                    id.push(cartItems[i]._id);
                }
            }
            else {
                // Affiche une alerte si le panier est vide
                alert('le panier est vide !')
            }
        }

        console.log(id)
;
        // Créer un tableau avec les informations renseignées  
        const tab = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: id,
        };
        // Créer un objet contenant les options pour la requête
        const options = {
            method: 'POST',
            body: JSON.stringify(tab),
            headers: {
                'Accept': 'application/json',
                "content-type": "application/json"
            },
        };

        // Envoi de l'objet contact et du tableau des id de chaque produit présent lors de la commande 
        console.log(verify());
        // Si les informations renseignées dans le formulaire de commande sont valides
        if (verify()) {
            // Si la variable cartItems est déclarée et n'est pas null 
            if (cartItems !== null) {
                // Si les produits sont présents dans le panier et sont supérieurs ou égaux à 1
                if (cartItems.length >= 1) {
                    // Requête l'API avec les informations de commande dans le corps de la requête 
                    fetch("http://localhost:3000/api/products//order", options)

                        // Passe la réponse de l'api au format .json 
                        .then((response) => response.json())
                        .then((res) => {
                            console.log(res.orderId);
                            // Vide le panier 
                            localStorage.clear('dataForCart');
                            // Redirige l'utilisateur sur la page de confirmation
                            document.location.href = 'confirmation.html?orderId=' + res.orderId;

                        })

                        .catch((error) => {
                            console.log("error :" + error)
                        })

                }
            }
        }
    })
}