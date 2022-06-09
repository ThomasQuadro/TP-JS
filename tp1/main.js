let image = document.querySelectorAll(".img")

let gauche = document.querySelector("span.precedent")

let droite = document.querySelector("span.suivant")

let radio = document.querySelectorAll(".clic")

let index = 0

function slide(add){
        image[index].classList.remove("active")
        radio[index].classList.remove("check")
        index += add;
        if (index > 9){
                index = 0
        };
        if (index < 0){
                index = 9
        };
        image[index].classList.add("active")
        radio[index].classList.add("check")
}

function rad(choose){
        if (index != choose){
            image[index].classList.remove("active")
            radio[index].classList.remove("check")
            index = choose;
            image[index].classList.add("active")
                radio[index].classList.add("check")
        }
};

droite.addEventListener("click",function(){
        slide(1);
        console.log(1)
});

gauche.addEventListener("click",function(){
        slide(-1)
        console.log(-1)
});


for (let i = 0; i < radio.length; i++) {
        const element = radio[i];
        element.addEventListener("click",function (){
                rad(i)
        })
}