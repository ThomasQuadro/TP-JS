let start = document.querySelector(".start")
let start_button = document.querySelector(".start button")
let quizz = document.querySelector(".quizz")

start_button.addEventListener("click",function(){
    start.style.display = "none"
    quizz.style.display = "flex"
    attribution()
})

//-------------------------------------------------------

let count = 0
let nb = document.querySelector("#nb")
let title_question = document.querySelector("#title-question")
let reponse = document.querySelector(".reponse-user")
let valider_reponse = document.querySelector(".quizz button")
let choix = document.querySelectorAll(".reponse-user input")
let span = document.querySelectorAll(".reponse-user span")
let qf = 0
let qr = [
    {
        numero: 1,
        question: "Qui est le chef des Seven Deadly Sins ?",
        type:"radio",
        name:"q1",
        class: "r1",
        value: ["Escanor", "Méliodas","Ban","King"],
        reponse :["Méliodas"]
    },
    {
        numero: 2,
        question: "Qui sont les princesses du royaume de Liones ?",
        type:"checkbox",
        name:"q2",
        class: "r2",
        value: ["Margaret", "Diane","Elizabeth","Veronica"],
        reponse :["Margaret","Elizabeth","Veronica"]
    },
    {
        numero: 3,
        question: "Quels sont les deux démons qui ont affrontés Ban et Escanor (qui les a littéralement EXPLOSÉ) dans la taverne ?",
        type:"checkbox",
        name:"q3",
        class: "r3",
        value: ["Galan", "Zeldris","Monspiet","Melascula"],
        reponse :["Galan","Melascula"]
    },
    {
        numero: 4,
        question: "Qui est le commandement de la Charité ?",
        type:"radio",
        name:"q4",
        class: "r4",
        value: ["Méliodas", "Zeldris","Maël","Estarossa"],
        reponse :["Estarossa"]
    },
    {
        numero: 5,
        question: "Qui a gagné le duel Escanor vs Estarossa ?",
        type:"radio",
        name:"q1",
        class: "r1",
        value: ["Escanor", "Estarossa","Personne","Hawk"],
        reponse:["Escanor"]
    }
]



//----------attribution des questions dans le html------------------------------
function attribution(){
    if (qf<5){
        nb.innerHTML = `${qr[qf].numero}/5`
        title_question.innerHTML = qr[qf].question

        let i = 0

        

        choix.forEach(element => {
            element.checked = false
            element.type = qr[qf].type
            element.name = qr[qf].name
            element.class = qr[qf].class
            element.value = qr[qf].value[i]
            i++
        });

        if (!choix[0].checked){
            choix[0].checked = true
        }

        let j = 0
        span.forEach(element => {
            element.innerHTML = qr[qf].value[j]
            j++
        });
    } else {
            quizz.style.display = "none"
            final()
    }
}

//------------------------------------------------------
let score = 0

valider_reponse.addEventListener("click", function(){
    
    choix.forEach(reponse_donne =>{
        
        if (reponse_donne.checked){

            qr[qf].reponse.forEach(element2 => {

                if (reponse_donne.value == element2){
                    score++
                }

                
            });
            
        }    
        
    })

    qf++
    attribution() 
    console.log(score)

});

//------------------------------------------------------------
let total = document.querySelector(".total")
let resultat_final = document.querySelector(".total h2")
let image_fin = document.querySelector(".total img")

function final(){

    total.style.display = "flex"
    if (score <= 2) {
        image_fin.src = "img/escanor-escalated.gif"
    }else if (2 < score && score <= 4) {
        image_fin.src = "img/AdmiredFarAcouchi-size_restricted.gif"
    }else if (4 < score  && score <= 6) {
        image_fin.src = "img/nanatsu-gloxinia.gif"
    }else if (score > 6) {
        image_fin.src = "img/999b33822dc5e23345982abb2d51f178.gif"
    }

    resultat_final.innerHTML += `${score} points sur 8 points`
}

let button_reset = document.querySelector(".total button")

button_reset.addEventListener("click",function() {
    location.reload()
})