let data;
let id;


// Récupère l'id présent dans l'URL concernée
let url = new URL(window.location.href);
console.log(url);
let search_params = new URLSearchParams(url.search);
// Vérifie si le paramètre existe dans l'url → si oui, @return true;
if (search_params.has('id')) {
    // Récupère l'id dans les paramètres de l'url 
    id = search_params.get('id');
}

console.log(id);


/**
 * Appelle l'API pour récupérer le produit associé a l'id présent dans l'url concernée
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
 .then((data) => { produit(data) })
 .catch((err) => console.log(err));





/**
 * Ajoute les données de l'API dans les différentes balises du DOM
  @param {} data 
 */
  async function produit(data) {
    console.log(data);
    if (data !== undefined) {
        /* Récupère la balise avec la classe 'item_img' et lui ajoute l'image du produit */
        const item__img = document.getElementsByClassName("item__img");
        item__img[0].innerHTML = "<img src=" + data.imageUrl + " alt=" + data.altTxt + "></img>";

        /**
         * Récupère la balise qui contient l'id 'title' et ajoute le nom de l'data
         */
        const title = document.getElementById('title');
        title.innerText = data.name;

        /**
         * Récupère la balise qui contient la classe 'price' et ajoute le prix de l'article 
         */
        const price = document.getElementById('price');
        price.innerText = data.price;

        /**
         * Récupère la balise qui contient l'id 'description' et ajoute la description de l'article 
         */
        const description = document.getElementById('description');
        description.innerText = data.description;

        /**
         * Récupère les couleurs dans le tableau des couleurs du produit 
         * Récupère la balise qui contient l'id colors et ajoute les couleurs
         */
        for (let colors of data.colors) {
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }
    }
}