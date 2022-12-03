/**
 * Récupère l'id de commande dans le localStorage.getItem('orderId');
 * @return id de commande 
 */
 let url = new URL(window.location.href);
 let search_params = new URLSearchParams(url.search);
 if (search_params.has('orderId')) {
     id = search_params.get('orderId');
 }
 console.log('_id: ', id);
 
 
 let orderId = document.getElementById('orderId');
 orderId.innerHTML = id;