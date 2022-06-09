  
  let boutton = document.getElementById('callweather');
  
  let input = document.getElementById('input');
  
  let ulField = document.getElementById('suggest');

  let suggestion = document.getElementsByClassName('suggestion')
  
  let choix = document.getElementsByClassName("clic")

  let tab = []
  
  auto()
  //si je clic pour rechercher, fait appel a l'api et renvoie les données correspondantes
  boutton.addEventListener('click', function(){
    let city = input.value;
    suggestion[0].style.display = "none"

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=187129f8ffc705a0412d546119086d08")
    .then(response => {
      return response.json()
    })
    .then(data => {
      document.getElementById("ville").innerText = data.name
      console.log(data.name);

      document.getElementById("temperature").innerText = Math.round(data.main.temp-273.15) + "°C"
      console.log(Math.round(data.main.temp-273.15) + "°C")

      document.getElementById("temps").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      console.log(data.weather[0].main)

      document.getElementById("erreur").innerHTML = null
    })
    .catch(error => {
      document.getElementById("ville").innerText =null
      document.getElementById("temperature").innerText = null
      document.getElementById("temps").src = null
      document.getElementById("erreur").innerHTML = "La ville ne possède pas de données météo !"
      console.log("erreur : " + error);
    });

    city = ""
    input.value = null

  });


  //--------------------------------

  //affiche les suggestions selon ce qui est entré

  input.addEventListener('keyup', function(){
    ulField.innerHTML = null
    console.log("marche")

    if (input.value.length == 0){
      suggestion[0].style.display = "none"
    }

    if (input.value.length > 0){
      suggestion[0].style.display = "flex"
      for (let i = 0; i < tab.length; i++) {
        const element = tab[i];
        if (element.includes(capitalizeString(input.value)) == true){
          suggestion[0].style.display = "flex"
          ulField.innerHTML += `<li><button type="button" class="clic" >${element}</button></li>`
        }
      }
    }

    if (ulField.innerHTML == ""){
        suggestion[0].style.display = "none"
    }

    for (let i = 0; i < choix.length; i++) {
      let element = choix[i];
      element.addEventListener("click", function(){
           input.value = element.innerHTML
           console.log("1")
           suggestion[0].style.display = "none"
        })
    }

  })

  //capitalize
  function capitalizeString(str) { 
    str = str[0].toUpperCase()+str.slice(1).toLowerCase(); 
    return str
  } 
  
  //clic on subject



  //met les villes dans un tableau
  function auto() {
    // fetch("https://geo.api.gouv.fr/communes")
    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
    //fetch("https://countriesnow.space/api/v0.1/countries")
    .then(response => {
      return response.json()
    })
    .then(data => {
      // data.forEach(element => {
      //   tab.push(element.nom)
      // });

      data.data.forEach(element => {
        if (element.city.includes("(")){
          let ind = element.city.indexOf("(")
          tab.push(capitalizeString(element.city.slice(0, ind - 1)))
        }else {
          tab.push(capitalizeString(element.city))
        }
        
      });

      // data.data.forEach(countries => {
      //   countries.cities.forEach(cities => {
      //     tab.push(cities)
      //   })
      // });

      // for (let i = 0; i < data.data.length; i++) {
      //   for (let j = 0; j < data.data[i].cities.length; j++) {
      //     tab.push(capitalizeString(data.data[i].cities[j]))
      //   }
      // }
    })
    .catch(error => {
      console.log("erreur : " + error);
    });


  };

/*
input.addEventListener('keyup', function() {
  var input2 = input.value;
  for (let i = 0; i < tab.length; i++) {
    if(tab[i].getAttribute('data-title').toLocaleLowerCase().includes(input2.toLocaleLowerCase())) {
      tab[i].style.display = 'flex';
  }
  else {
      tab[i].style.display = 'none';
  }
  }
})*/