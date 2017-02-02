var tab = ["img/ane.jpg", "img/chat.jpg", "img/chien.jpg", "img/lama.jpg", "img/lapins.jpg", 
"img/lionne.jpg", "img/ours.jpg", "img/ane.jpg", "img/chat.jpg", "img/chien.jpg", "img/lama.jpg", 
"img/lapins.jpg", "img/lionne.jpg", "img/ours.jpg"];
var dos = 'img/dos.png'; // On définie l'image de dos
var clique=0;//Nombres de cliques
var paires = 0;//Nombres de paires
var choixun;//
var choixdeux;//
var norepeat = true;//empeche le chrono de se repeter




var highscore = lireCookie('highscore');
document.getElementById("bestScore").innerHTML="Meilleur score : "+highscore;
var highTime = lireCookie2('highTime');
if(highTime != "99:999"){
	document.getElementById("bestScore").innerHTML="Meilleur temps : "+highTime;
}


function lireCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return 0;
}

function lireCookie2(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return "99:999";
}

function saveCookie(highscore) {
	document.cookie = "highscore="+highscore+"; expires=Mon, 1 Mar 2025 00:00:00 UTC; path=/";
}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //                                                                         AFFICHER LES IMAGES                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function afficherimage() {
	for(i=0; i<=tab.length-1; i++) {
		document.getElementById("photo").innerHTML += '<img src="img/dos.png" class="photo" onclick="choisir('+i+')" draggable="false">'
	}
}

afficherimage();//charge la fonction au chargement de la page

function random(tab){ //fonction qui permet de melanger les images
	var j, x, i;
	for(i = tab.length; i; i--) { //pour i=longueur totale du tableau, i toujours vrai(sup a zero), on decremente i(on lui enleve 1).
		j = Math.floor(Math.random() * i);//Math.floor arondie a la valeur superieure,Math.random donne un nombre aleatoire (entre 0 et 1)le tout * i
		x = tab[i-1];  //decale de 1 à l'interrieur du tableau(ex:si i=13 X deviendra lionne)
		tab[i-1] = tab[j]; //si i= 13 tab 12(i-1) deviendras J(j=nombre aleatoire)
		tab[j] = x; //j deviens X(pour cette exemple x=lionne)
	}
}
random(tab);//On appelle la fonction random

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //                                                                           CHOIX DES CARTES                                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
function choisir(carte) { // Choix des cartes quand l'utilisateur clique
	if (norepeat == true){//empeche le chronometre de se repeter
		timerID = setInterval("chrono()", 1000);//on appelle la fonction chronometre
		norepeat = false;
	}
	 
	if (clique == 2) { // Au delà du deuxième clique
		return; // On affiche rien
	}
	if (clique == 0) { // Au premier clique
		choixun = carte; // On attribue le numéro de la carte choisie au premier choix
		document.images[carte].src =  tab[carte]; // Affiche l'image de la carte correspondant au choix
		document.images[choixun].style.pointerEvents = 'none';//Desactive l'evenement du clique(pas de double clique)
		clique = 1; // On passe le clique à 1
	}
	else { // Au deuxième clique
		clique = 2; // On passe le clique à 2
		choixdeux = carte; // On attribue le numéro de la carte choisie au deuxième choix
		document.images[carte].src =  tab[carte]; // Affiche l'image de la carte correspondant au choix
		timer = setTimeout("verif()", 500); // Ajoute un temps de pause puis passe à la fonction de vérification
	}	
}


   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                         VERIFIE LES PAIRES                                                       //
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function verif() { // Vérifie si une paire a été faite
	clique = 0;
	if (tab[choixdeux] ==  tab[choixun]) {//si les deux cartes sont pareilles la paire reste fixe
		paires++; 
		document.getElementById("paires").innerHTML = paires;
		document.getElementById("bestScore").innerHTML="Meilleur score : "+highscore;
		if (paires >= highscore){
			highscore = paires;
			document.getElementById("bestScore").innerHTML="Meilleur score : "+highscore;
			saveCookie(highscore);
		}

		document.images[choixun].style.pointerEvents = 'none';//Desactive l'evenement du clique(pas de double clique)
		document.images[choixun].style.opacity = '0.3';// l'opacité s'applique sur la carte retournée
		document.images[choixun].style.pointerEvents = 'none';//Desactive l'evenement du clique(pas de double clique)
		document.images[choixdeux].style.opacity = '0.3';// l'opacité s'applique sur la carte retournée
	} else {
		document.images[choixun].src = dos;
		document.images[choixun].style.pointerEvents = 'auto';//Desactive l'evenement du clique(pas de double clique)
		document.images[choixdeux].src = dos;
		return;
	}
	if (paires==7) {
		clearInterval(timerID);//arette le chrono quand toutes les paires trouvées
		document.getElementById("photo").style.display = 'block';
		document.getElementById("photo").style.flexDirection = 'column';
		if (document.getElementById('chronotime').innerHTML <= highTime){
			highTime = document.getElementById('chronotime').innerHTML;
			document.getElementById("bestTime").innerHTML="Meilleur temps : "+highTime;
			saveCookie(highTime);
		}
		document.getElementById("photo").innerHTML = 
		'<h1> Vous avez gagné !</h1><br /><div class="boutton"><input type="button" class="restart" value="Recommencer" onClick="window.location.reload()"></div>';
	}
}


   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                         CHRONOMETRE                                                              //
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var timerID = 0;
var sec = 0;
var min = 0; 

function chrono(){ //Function chronometre
	if(sec<59){//quand seconde superieur a 59 milliemme
		sec++;//ajoute une seconde au chronometre
		if(sec<10){
			sec = "0" +sec;//affiche 00 avant le chiffre 1
		}

	}
	else if(sec=59){//quand seconde superieur a 59 milliemme
		min++;//ajoute une minute au chronometre
		sec = "0" + 0;
	}
	document.getElementById("chronotime").innerHTML = min + ":" + sec +"";//afiche le chronometre dans le html a l'endroit ciblé par l'id

} 
 
//  var cookies = 0;
//  var highscore = 0;

//  if ('highscore'){
// 	highscore = lireCookie('highscore');
// 	document.getElementById("score").innerHTML="Vous avez : "+cookies+" Cookies";
// 	document.getElementById("highscore").innerHTML="Meilleur score : "+highscore;
// }

// function lireCookie(name){
// 	var nameEQ = name + "=";
// 	var ca = document.cookie.split(';');
// 	for(var i=0;i < ca.length;i++) {
// 		var c = ca[i];
// 		while (c.charAt(0)==' ') c = c.substring(1,c.length);
// 		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
// 	}
// 	return 0;
// }

// function saveCookie(highscore) {
// 	document.cookie = "highscore="+highscore+"; expires=Mon, 1 Mar 2025 00:00:00 UTC; path=/";
// }
