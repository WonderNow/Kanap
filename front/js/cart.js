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

        // Triage des articles du local storage en fonction de leurs ID
        cartItems.sort((a, b) => {
			return a.id.localeCompare(b.id);
		});
        
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

            // Appel des fonctions suivantes une fois que les produits sont insérés
            supprimer();
            modifieQ();
            validationOfOrder();
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


// Calcule le total des articles présents dans le panier, ainsi que le prix total
// Affiche ces deux valeurs à l'écran en ciblant les ID correspondants dans le DOM
function total(price, quantite) {
    console.log('price', price);
    console.log('quantité', quantite);
    // Récupère la balise de l'ID totalQuantity
    let quantityTotal = document.getElementById('totalQuantity');
    // Récupère la balise de l'ID totalPrice
    let prixTotal = document.getElementById('totalPrice');
    // Nombre de la quantité total
    let totalQ = 0;
    // Nombre du prix total
    let totalP = 0;
    // Récupère la quantité selectionnée lors de l'ajout dans le localStorage
    let QNumber = Number(quantite);
    // Ajoute le prix du produit dans le tableau du prix
    tabPrice.push({ price });
    // Ajoute la quantité du produit dans le tableau de la quantité
    tabQuantite.push({ QNumber })

    console.log(tabPrice);
    console.log(tabQuantite);
    // Récupère les produits présents dans le tableau du prix un par un dans une variable
    for (let key in tabPrice) {
        console.log(tabPrice[key].price)
        // Calcule le prix total et l'enregistre dans sa variable
        totalP += (tabQuantite[key].QNumber * tabPrice[key].price);
        // Calcule la quantité totale et l'enregistre dans sa variable
        totalQ += tabQuantite[key].QNumber;
    }
    console.log(totalP);
    console.log(totalQ);

    // Ajoute la quantité totale au DOM
    quantityTotal.innerHTML = totalQ;
    // Ajoute le prix total au DOM
    prixTotal.innerHTML = totalP;
}

// Ajoute un événement de type click aux balises ayant l'id deleteItem 
// Supprime l'élément ciblé di localStorage
function supprimer() {
    let sup = document.querySelectorAll("#deleteItem");
    console.log(sup);
    // Récupère les balises ayant l'ID deleteItem un par un 
    for (let i = 0; i < sup.length; i++) {
        // Ajoute l'événement de type click au bouton "supprimer" de chaque produit présent dans le localStorage
        sup[i].addEventListener("click", () => {
            console.log('sup');
            // Récupère l'ID du produit cliqué  
            let _ID = sup[i].closest("article").dataset.id;
            // Récupère la couleur du produit cliqué 
            let _COLOR = sup[i].closest("article").dataset.color;
            // Filtre les produits qui n'ont pas l'ID et la couleur identique a celui cliquer 
            cartItems = cartItems.filter(element => element.id !== _ID || element.color !== _COLOR);
            // Modification des objets présents dans le localStorage 
            localStorage.setItem("dataForCart", JSON.stringify(cartItems));
            // Rechargement de la page pour afficher les modifications 
            location.reload();
            console.log(cartItems);
        });
    };
}


// Ajoute un événement de type click au balise ayant la class itemQuantity
// Modifie la quantité du produit ciblé
function modifieQ() {
    // Récupère les balise ayant la class itemQuantity
    let modify = document.querySelectorAll('.itemQuantity');
    // Récupère les balise ayant la class itemQuantity un par un 
    for (let i = 0; i < modify.length; i++) {
        // Ajoute un événement de type a la case modifier de chaque produit présent dans localStorage 
        modify[i].addEventListener('change', () => {
            // Récupère l'id du produit ciblé
            let _ID = modify[i].closest("article").dataset.id;
            // Récupère la couleur du produit ciblé
            let _COLOR = modify[i].closest("article").dataset.color;
            // Récupère la quantité de la case du produit ciblé
            let _QUANTITY = modify[i].value;
            // Filtre les produits qui ont l'id et la couleur identique a celui ciblé
            let produit = cartItems.find(element => element.id == _ID && element.color == _COLOR);
            console.log(produit);
            console.log(cartItems);
            // Ajoute la quantité modifier au produit cliqué
            produit.quantity = _QUANTITY;
            // Modifie la quantité du produit 
            cartItems[i].quantity = produit.quantity;
            // Ajoute la quantité modifier dans le localStorage 
            localStorage.setItem("dataForCart", JSON.stringify(cartItems));
            // Recharge la page pour affiché la quantité modifier
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
 * Envoie le tableau rédapitulatif des données de l'utilisateur à l'API 
 * @return l'utilisateur sur la page confirmation de commande 
 */
function validationOfOrder() {
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
                    id.push(cartItems[i].id);
                }
            }
            else {
                // Affiche une alerte si le panier est vide
                alert('le panier est vide !')
            }
        }

        console.log(id);
        
        // Création d'un tableau avec les informations renseignées  
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
        // Création d'un objet contenant les options pour la requête
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
                        console.log("Erreur :" + error)
                    })

                }
            }
        }
    })
}