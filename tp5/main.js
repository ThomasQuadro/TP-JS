//tableau
let chance = ["casino","cherry","diamond","lemon","cherry","diamond","lemon","cherry","diamond","lemon","cherry","lemon"];

//variable html
let affichage = document.getElementsByClassName("affichage")
let img = document.getElementsByClassName("col1");
let bouton = document.getElementsByClassName("clic")
let piece = document.getElementById("account")
let deuxcent =document.getElementById("deux");
let cinq =document.getElementById("cinq");
let dix =document.getElementById("dix");
let reponse = document.getElementById("rep");

//compte en banque
let compte = 500;

//fonction qui affiche le montant du compte apres gain ou perte
function total(){
    piece.innerHTML = compte
}

//fonction qui choisie une image aléatoirement
function aleatoire(element){
    let alea = Math.floor(Math.random() * chance.length);
    let model = chance[alea];
    element.src = `img/${model}.png`;
    element.dataset.value = model;
    element.classList.add("animate");
    console.log(element.dataset.value);
}

//f
function gain(cout) {

    //variable du nombre d'images sortante en un tour
    let lemon = 0;
    let cherry = 0;
    let diamond = 0
    let casino = 0

    //boucle qui permet de connaitre l'identité de l'image
    for (let i = 0; i < img.length; i++) {
        const element = img[i];
        if (element.dataset.value == "lemon"){
            lemon+=1
        }else if (element.dataset.value == "cherry"){
            cherry+=1
        }else if (element.dataset.value == "diamond"){
            diamond+=1
        }else if (element.dataset.value == "casino"){
            casino+=1
        }
    }

    //fonction qui affiche une phrase si on a gagné de l'argent
    function replus(){
        reponse.innerText = `vous avez gagné ${cout} jetons`
    }
    
    //fonction qui affiche une phrase si on a perdu de l'argent
    function remoins(){
        reponse.innerText = `vous avez perdu ${cout} jetons`
    }

    //condition pour afficher les phrases gagnantes ou perdantes avec les multiplicateurs des combinaisons
    if (lemon == 3){
        cout*=1.25
        compte= compte + cout;
        setInterval(replus(),20000)
    }else if (cherry == 3){
        cout*=1.5
        compte= compte + cout;
        setInterval(replus(),20000)
    }else if (diamond == 1){
        cout*=0.5
        compte= compte + cout;
        setInterval(replus(),20000)
    }else if (diamond == 2){
        cout*=1
        compte= compte + cout;
        setInterval(replus(),20000)
    }else if (diamond == 3){
        cout*=2.5
        compte= compte + cout;
        setInterval(replus(),20000)
    }else if (casino == 3){
        cout*=10
        compte= compte + cout;
        setInterval(replus(),20000)
    } else {
        setInterval(remoins(),20000)
    }

    
    console.log(lemon,cherry,diamond,casino,cout)
    console.log(compte)

    

    setTimeout(total)
    

    //conditions qui permettent d'enlever et de remettre les radios selon les jetons sur notre compte
    if (compte < 200){
        deuxcent.style.display = "none";
        deuxcent.checked = false;
    } else {
        deuxcent.style.display = "flex";
        deuxcent.checked = true;
    }

    if (compte < 50){       
        cinq.style.display = "none";
        cinq.checked = false;
    }else {
        cinq.style.display = "flex";
        cinq.checked = true;
    }

    if (compte < 10){     
        dix.style.display = "none";
        dix.checked = false;
    }else {
        dix.style.display = "flex";
        dix.checked = true;
    }

    if (compte < 10){
        reponse.innerText = "Vous n'avez plus de jetons pour miser!"
    }

}



//fonction qui fait defiler aleatoirement 3 images

    bouton[0].addEventListener("click",function(){

        bouton[0].style.display = "none"
        setTimeout(() => bouton[0].style.display = "block",2000)

        document.querySelectorAll("input[type=radio]").forEach(element => {element.style.display = "none"})
        
        //variable qui envoie la mise selectionné
        let boutonprix = document.querySelector("input[name=price]:checked").dataset.prix

        //condition qui verifie si l'on peut soustraire les pieces selon l'etat de notre compte
        if (compte >= 200 || compte >= 50 || compte >= 10) {
            compte -= boutonprix;
            piece.innerHTML = compte

            //boucle qui permet d'enlever et de remettre l'animation au clic et d'avoir des images aléatoires
            document.querySelectorAll("img").forEach((image) => {
                image.classList.remove("animate")
                setTimeout(() => {
                    aleatoire(image);
                })
            });

        //execution avec cooldown de la fonction gain
        setTimeout(() => gain(parseInt(boutonprix)),2000)
        }
    });
