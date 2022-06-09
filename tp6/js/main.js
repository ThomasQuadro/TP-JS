let articles = document.querySelectorAll(".article")
let moins = document.querySelectorAll(".moins")
let plus = document.querySelectorAll(".plus")
let quantite = document.querySelectorAll(".quantite input")
let nom = document.querySelectorAll(".article h3")
let prix = document.querySelectorAll(".article h2")
let images = document.querySelectorAll(".article img")
let ajouter = document.querySelectorAll(".article .ajouter")
let reduc = document.querySelectorAll(".article span")


/*----------------GESTION QUANTITE------------------*/

for (let i = 0; i < plus.length; i++) {
    //----------------------------------
    const ajoute = plus[i];
    ajoute.addEventListener("click", function() {
        gestion_quantite(1, i)
    })
    //----------------------------------
    const enleve = moins[i];
    enleve.addEventListener("click", function() {
        gestion_quantite(-1, i)
    })
    //----------------------------------
    const input = quantite[i];
    input.addEventListener("keyup", function() {
        if (input.value == 0) {
            input.value = 1
        }
    })
    //----------------------------------
}


function gestion_quantite(ajout, index) {
    if (quantite[index].value > 0) {
        quantite[index].value = parseInt(quantite[index].value) + ajout
    }
    if (quantite[index].value == 0) {
        quantite[index].value = 1
    }
}

/*--------------------------------------------------*/

/*----------------PRIX INT ET SANS €------------------*/
function prixint(prix) {
    if (prix.includes(" €")) {
        prix.slice(0, prix.indexOf(" "))
    }
    return parseInt(prix)
}
/*------------------------------------------------------*/

/*-----------------------REDUCTION-----------------------*/
function reduction_applique() {
    for (let i = 0; i < reduc.length; i++) {
        const element = reduc[i].dataset.reduction;
        if (element != "") {
            prix[i].innerHTML = prixint(prix[i].innerHTML) - ((prixint(prix[i].innerHTML) * parseInt(element)) / 100) + " €"
            prix[i].style.color = "green"
        }
    }
}

reduction_applique()
/*------------------------------------------------------*/

/*----------------AJOUT DANS LE LOCAL STORAGE------------------*/

for (let i = 0; i < ajouter.length; i++) {

    //bouton ajouter
    let ajout = ajouter[i];

    //si clic sur un bouton ajouter, transfert les bonnes donnees
    ajout.addEventListener("click", function() {

        console.log(nom[i].innerHTML)
        localstorage_ajout(images[i].src, nom[i].innerHTML, quantite[i].value, prix[i].innerHTML, reduc[i].dataset.reduction)

        window.alert(`Vous avez ajouté ${nom[i].innerHTML} ${quantite[i].value} fois !\nVous pouvez aller consulter vos articles dans votre panier`)
        quantite[i].value = 1
    })
    ajout = null
}

function localstorage_ajout(img, n, q, p, promo) {
    //structure article
    const info_article = {
        image_article: img.replace("http://127.0.0.1:5500", ".."),
        nom_article: n,
        quantite_article: parseInt(q),
        prix_article: prixint(p),
        promotion_article: parseInt(promo),
    }

    //si ya rien dans le local storage ou qu'il n'existe pas
    if (localStorage.length == 0 || !(info_article.nom_article in localStorage)) {

        //permet d'ajouter un article s'il n'y est pas deja dans le localstorage
        localStorage.setItem(n, JSON.stringify(info_article))

        console.log("CREER : article_a_ajouter = " + info_article.quantite_article)
        console.log("CREER : struct = ", info_article)

        console.log("creer")

    } else {

        //boucle sur le localstorage
        for (let i = 0; i < localStorage.length; i++) {

            //var struct article
            let article_a_ajouter;
            //avoir le nom de chaque element dans le local storage
            let nom_article_localstorage;
            //avoir chaque article dans le localstorage
            let article_localstorage;

            article_a_ajouter = info_article

            //verifie si le nom de la structure selectionnne dans le localstorage correspond bien au nom de la structure que l'on veut modifié
            for (let j = 0; j < localStorage.length; j++) {

                if (localStorage.key(j) == article_a_ajouter.nom_article) {
                    nom_article_localstorage = localStorage.key(j)
                    article_localstorage = JSON.parse(localStorage.getItem(nom_article_localstorage))
                }

            }


            //resultat des anciennes + nouvelles quantités
            let res = 0;
            console.log("-----------------------------------------------------------------------")
            console.log("CHANGE : article_a_ajouter = " + article_a_ajouter.quantite_article)
            console.log("CHANGE : actuellement = " + article_localstorage.quantite_article)
            console.log("CHANGE : avant struc = ", article_localstorage)

            //addition de l'ancienne et de la nouvelle quantité
            res = article_a_ajouter.quantite_article + article_localstorage.quantite_article

            //attribut le resultat dans la structure article
            article_a_ajouter.quantite_article = res

            //on envoie la nouvelle structure article
            localStorage.setItem(n, JSON.stringify(article_a_ajouter))

            console.log("CHANGE : apres struc = ", info_article)
            console.log("-----------------------------------------------------------------------")
            //}
            break
        }
    }
}
/*-----------------------------------------------------------*/

/*----------------PANIER-----------------*/
let art1 = document.querySelector(".liste-article")
let total = document.querySelector(".total")
let tab = []
let panier = document.querySelector(".panier")


 panier_total()


function panier_total() {

    //si le local storage == 0 alors pas d'article dans le panier
    if (localStorage.length == 0) {
        art1.innerHTML += `<h2>Votre Panier est vide ! Allez sur la page <a href="boutique.html">Boutique</a> pour ajouter un article</h2>`
        total.style.display = "none"

    } else {

        //prix total du panier
        var prix_totale = 0

        //boucle sur le local storage
        for (let i = 0; i < localStorage.length; i++) {

            //nom de l'element
            let index = localStorage.key(i)
            //recherche de l'element en fonction de son nom
            let articl = JSON.parse(localStorage.getItem(index))

            //ajout d'un article dans un tableau
            tab.push(articl)

            //on ajoute du html dans le panier pour chaque articles ajoutés
            art1.innerHTML += `        
        <div class="art1">
            <button type="button" class="delete"><img src="../img/poubelle.png" alt="supprimer"></button>
            <img src="${tab[i].image_article}" alt="${tab[i].nom_article}">
            <input type="text" class="quantite-article" value="${tab[i].quantite_article}">
            <span class="nom-article">${tab[i].nom_article}</span>
            <h3 class="prix-article">${(tab[i].prix_article)+" €"}</h3>
        </div>`

            //calcul du prix total du panier
            prix_totale += tab[i].quantite_article * tab[i].prix_article

            //affichage du prix total du panier
            document.querySelector(".group-prix").innerHTML = prix_totale + " €"
        }

    }
}

/*---------------------DELETE article du panier--------------------------*/

//variable qui fait appel a la class delete
let delete_article = document.querySelectorAll(".delete")

//pour chaque class delete, au clic efface l'article
for (let i = 0; i < delete_article.length; i++) {
    let poubelle = delete_article[i];
    poubelle.addEventListener("click", function() {
        localStorage.removeItem(localStorage.key(i));
        location.reload()
    })
}

//variable qui selectionne les input de quantite 
let input_quantite = document.querySelectorAll(".quantite-article")

//pour chaque input, actualise la quantité des elements a chaque entrée
for (let i = 0; i < input_quantite.length; i++) {
    const input = input_quantite[i];
    input.addEventListener("keyup", function() {

        let nom_article_localstorage;
        let article_localstorage;

        for (let j = 0; j < localStorage.length; j++) {
            if (localStorage.key(j) == localStorage.key(i)) {
                nom_article_localstorage = localStorage.key(j)
                article_localstorage = JSON.parse(localStorage.getItem(nom_article_localstorage))
            }
        }

        const info_article = {
            image_article: article_localstorage.image_article,
            nom_article: article_localstorage.nom_article,
            quantite_article: article_localstorage.quantite_article,
            prix_article: article_localstorage.prix_article,
            promotion_article: article_localstorage.promotion_article,
        }

        if (input.value <= "0" || input.value.includes(String)) {
            localStorage.removeItem(localStorage.key(i));
            window.setTimeout(location.reload(), 60000)
        }
        if (input.value == "" || input.value != "0") {
            info_article.quantite_article = input.value
            console.log(info_article.quantite_article)
            localStorage.setItem(info_article.nom_article, JSON.stringify(info_article))
            window.setTimeout(location.reload(), 60000)
        }
        
    })
}

// function non_lettre(str) {
//     let verdict = [];
//     let tab2 = Array.from(str)
    
//     console.log(tab2)

//     for (let i = 0; i < tab2.length; i++) {
//         console.log("---------------------------")
//         const element = tab2[1];

//         console.log("lettre = "+ element)
//         console.log("index = "+ i)
//         console.log("tranform = "+str.charCodeAt(tab2[i]))

//         if ( 48 > str.charCodeAt(element) || str.charCodeAt(element) > 57 ) {
//             console.log("sperieur a 57 et inferieur a 48",true)
//             verdict.push(true)

//         } else if (48 <= str.charCodeAt(element) <= 57 ) {
//             console.log("inferieur a 57 et superieur a 48",false)
//             verdict.push(false) 
//         }
//         console.log("---------------------------")
//     }
//     if (verdict.includes(true)) {
//         return true
//     } else{
//         return false
//     }
    
// }