//Une fonction qui met le curseur sur le champ de la titre
function focusChamp() {
    document.getElementById("tache").focus();
}
focusChamp();
//J'instancie mon objet Ajax xhr
var xhr = new XMLHttpRequest();
//Je crée une balise img
var img = "";
var urlImage = "";
//Fonction qui cherche les image sur le site https://picsum.photos/v2/list/
function afficheImg() {
    //Je fait mon appel AJAX avec GET
    xhr.open("GET", "https://picsum.photos/v2/list/", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        //Je verifie le status de ma requête
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            //Je parse le resultat de la requête Ajax
            var datas = JSON.parse(xhr.responseText);
            //Pour avoir les images en aléatoire, je prend un nombre aléatoire avec Math.random et j'arrondi au plus grand avec math.floor
            var min = 0;
            var max = 26;
            var nb = Math.floor(Math.random() * (max - min)) + min;
            //Je parcours le tableau dans le url des images pour cibler le url de telechargement
            var nbBoucle = nb + 4;
            for (let i = nb; i < nbBoucle; i++) {
                urlImage = datas[i].download_url;
                img = document.createElement("img");
                //Je mets le url de l'image dans le src de ma balise img
                img.src = urlImage;
                //On mets l'image dans la balise qui pour le nom de classe baniere avec appendChild
                document.getElementsByClassName("baniere")[0].appendChild(img);
                document
                    .getElementById("corpsDePage")
                    .setAttribute(
                        "style",
                        "background-image:url('" + urlImage + "');background-cover: cover;"
                    );
            }
            //Pour mettre une image cliquer en background de l'application
            var baliseParent = document.getElementsByClassName("baniere")[0]
                .childNodes;
            for (i = 0; i < 5; i++) {
                baliseParent[i].addEventListener("click", function() {
                    var getsrc = this.getAttribute("src");
                    document
                        .getElementById("corpsDePage")
                        .setAttribute(
                            "style",
                            "background-image:url('" + getsrc + "');background-cover: cover;"
                        );
                });
            }
        }
    };
}
afficheImg();
//Quelques variables pour la mise en place de la récuperation de la to do list
var inputTache = document.getElementById("tache");
var inputDesc = document.getElementById("description");
var boutonValide = document.getElementById("bouton");
var listShow = document.getElementById("list");
var nbItems = document.getElementById("nbTache");
var count = 0;
/*Au clic sur le bouton valider j'execute une fonction anonyme qui ecrit 
les valeur du champ tache et description dans localStorage*/
boutonValide.addEventListener("click", function() {
    if (inputTache.value != "" && inputDesc.value != "") {
        //alert(document.getElementsByTagName('span').length);
        let ok = true;
        for (i = 0; i < document.getElementsByTagName('span').length; i++) {
            // console.log(inputTache.value.toUpperCase());
            // console.log(document.getElementsByTagName('span')[i].textContent);
            if (inputTache.value.toUpperCase() == document.getElementsByTagName('span')[i].textContent.toUpperCase()) {
                // alert('tache en double');
                ok = false;
            }
        }
        if (ok == true) {
            if (typeof localStorage != "undefined" && JSON) {
                //On stock la valeur des champs dans un objet theValues
                var theValues = {
                    title: inputTache.value.toUpperCase(),
                    description: inputDesc.value
                };
                //On stock les valeurs avec la clé "listItems" dans le localStorage
                localStorage.setItem("listItems", JSON.stringify(theValues));
            }

            //On lit la fonction qui lit toutes les valeurs dans local storage
            readValues();
        } else {
            alert('taches en doubles');
        }
    } else {
        alert('taches vides');
    }
});

//Une fonction qui lit les tâches enregistrer dans le local storage
function readValues() {
    var stockage;
    if (typeof localStorage != "undefined" && JSON && localStorage.getItem("listItems")) {
        stockage = JSON.parse(localStorage.getItem("listItems"));
        //Je crée des variable pour stocker la date actuelle
        var now = new Date();
        var annee = now.getFullYear();
        var mois = now.getMonth() + 1;
        var jour = now.getDate();
        //Je prend l'heure dans la date actuelle
        var heure = now.getHours();
        //Je prend aussi la minute
        var minute = now.getMinutes();
        // J'affiche dans le DOM les valeurs dans mon local storage + l'heure et minute avec quelque balise pour la couleur de fond de la liste
        listShow.innerHTML +=
            "<div class=\"cked\"><li><span>" +
            stockage.title + "</span><br />" + stockage.description +
            "</li> <div class=\"bout\"><input type=\"button\" class=\"erty\" id=\"red\" /><input type=\"button\" class=\"erty\" id=\"blue\" /><input type=\"button\" id=\"green\" class=\"erty\" /><input type=\"button\" id=\"yellow\" class=\"erty\" /></div> <i class=\"fas fa-trash-alt\"></i>" +
            heure + ":" + minute + ' ' +
            jour + '/' + mois + '/' + annee + " </div>";
        //J'appelle la fonction qui change le background des listes
        changeFondList();
        //j'appella la fonction qui change la hauteur de l'appli quand le nombre de balise liste est superieur ou égale à 4
        changeHauteurAppli();
        //On stock les listes dans la fonction storage()
        storage();
        //On incrementé la variable count à chaque click
        count++;
        //On affiche la valeur de count dans une balise
        nbItems.textContent = count;
        //On vide le champ
        inputTache.value = "";
        inputDesc.value = "";

    }
}
//Une fonction qui verifie si la liste a la class fas,
listShow.addEventListener("click", function(e) {
    if (e.target.classList.contains("fas")) {
        e.target.parentNode.remove();
        //On décremente count
        count--;
        nbItems.textContent = count;
        //Quand on supprime un elément, on réactualise le stockage
        storage();
    }
});

//Une fonction qui change le background des liste
function changeFondList() {
    //On stock les balises input dans la variable idBalise
    var idBalise = document.getElementsByTagName("input");
    //On parcourt le tableau qui contient les balises input avec la boucle for 
    for (let y = 0; y < idBalise.length; y++) {
        //Au clique sur un bouton input, j'execute la fonction choixMultiples()
        idBalise[y].addEventListener("click", choixMultiples);
        //Fonction qui prend l'id de l'input cliqué et fait une action selon le cas
        function choixMultiples() {
            //une variable qui prend la valeur de l'id de l'input cliqué
            var choix = this.getAttribute("id");
            switch (choix) {
                //le choix est egale a red
                case "red":
                    //change le background en red
                    this.parentNode.parentNode.style.backgroundColor = '#85D3F2';
                    break;
                    //le choix est egale a blue
                case "blue":
                    //change le background en blue
                    this.parentNode.parentNode.style.backgroundColor = '#4189A6';
                    break;
                    //le choix est egale a green
                case "green":
                    //change le background en green
                    this.parentNode.parentNode.style.backgroundColor = '#6E8C03';
                    break;
                    //le choix est egale a yellow
                case "yellow":
                    //change le background en yellow
                    this.parentNode.parentNode.style.backgroundColor = '#D9B97E';
                    break;
            }
        }
    }
}
//On appelle la fonction changeFondList()
changeFondList();

//Une fonction qui stock toutes les listes dans le localStorage
function storage() {
    window.localStorage.setItem("listItems", listShow.innerHTML);
}

//Une fonction qui verifie si mon local storage est vide, elle affiche un message, sinon elle affiche les valeur stocké
function getValues() {
    var storageContent = window.localStorage.getItem("listItems");
    if (typeof localStorage != "undefined" && JSON && localStorage.getItem("listItems")) {
        if (storageContent == null) {
            //listShow.innerHTML = "<li> Entrez les taches </li>";
        } else {
            listShow.innerHTML += storageContent;
        }
    }
}
//une fonction qui compte les nombres des taches dans le local storage, les mettent dans la balise d'affichage et l'affiche
setTimeout(function() {
    //On assigne dans la variable count le nombre des balises avec la class cked 
    count = document.getElementsByClassName('cked').length;
    //On affiche dans la balise qui a un id nbTache la valeur de count
    document.getElementById("nbTache").innerHTML = count;
    //j'appella la fonction qui change la hauteur de l'appli quand le nombre de balise liste est superieur ou égale à 4
    changeHauteurAppli();
    //J'appelle la fonction qui change le background
    changeFondList();
    //clearLocal();
});
//Au chargement, on affiche les valeurs stocker dans le localStorage
window.addEventListener("load", getValues);

function changeHauteurAppli() {
    if (count >= 4) {
        //On passe la valeur du height à 'auto'
        document
            .getElementById("corpsDePage").style.height = "auto";
    } else {
        //Sinon on le laisse à 100vh
        document
            .getElementById("corpsDePage").style.height = "100vh";
    }
}
changeHauteurAppli();

//Au clic sur le bouton on supprime les items dans le localStorage
document.getElementById('supprimer').addEventListener('click', supprimerLocalStorage);
//Une fonction supprime les idems dans le localStorage 
function supprimerLocalStorage() {
    if (typeof localStorage != "undefined" && JSON && localStorage.getItem("listItems")) {
        localStorage.clear("listItems");
        listShow.remove();
        console.log(listShow);
        count = 0;
        nbItems.textContent = count;
    }
}