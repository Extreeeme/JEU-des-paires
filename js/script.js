var img = 'img';
var liste = [img+"/ane.jpg", img+"/chat.jpg", img+"/chien.jpg", img+"/lama.jpg", img+"/lapins.jpg", 
img+"/lionne.jpg", img+"/ours.jpg"];
var liste2 = [img+"/ane.jpg", img+"/chat.jpg", img+"/chien.jpg", img+"/lama.jpg", img+"/lapins.jpg", 
img+"/lionne.jpg", img+"/ours.jpg"];
var tab = liste.concat(liste2);


var dos = 'img/dos.png'; // On définie l'image de dos
var clique=0;//Nombres de cliques
var paires = 0;//Nombres de paires
var choixun;//
var choixdeux;//
var norepeat = true;//empeche le chrono de se repeter

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //                                                                         AFFICHER LES IMAGES                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function afficherimage() {
	for(i=0; i<=tab.length-1; i++) {
		document.getElementById("photo").innerHTML += '<img src="'+dos+'" class="photo shake-slow" onclick="choisir('+i+')" draggable="false">'
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
 
   ///////////////////////////////////////////////////////
  //-------------------choix theme---------------------//
 ///////////////////////////////////////////////////////
//{permet à l'utilisateur de choisir un thème}

$('#t1').click(function(){//----------------------------------------au click sur l'imput
	$('#photo img').attr('src', 'img/dos.png');//				défini un nouveau dos de carte		
	dos =  'img/dos.png';				
	$('#css').attr('href', "css/style.css");//-------------------------charge le fichier css du thème
//	img = 'img';
//	changeDossier();	
});
$('#t2').click(function(){//----------------------------------------au click sur l'imput												
	$('#photo img').attr('src', 'img/theme2.jpg');//				défini un nouveau dos de carte	
	dos =  'img/theme2.jpg';
	$('#css').attr('href', "css/theme2.css");//-------------------------charge le fichier css du thème
//	img = 'img2';
//	changeDossier();	
});
$('#t3').click(function(){//----------------------------------------au click sur l'imput
	$('#photo img').attr('src', 'img/theme3.jpg');//				défini un nouveau dos de carte
	dos =  'img/theme3.jpg';							
	$('#css').attr('href', "css/theme3.css");//-------------------------charge le fichier css du thème	
//	img = 'img3';
//	changeDossier();
});
$('#t4').click(function(){//----------------------------------------au click sur l'imput
	$('#photo img').attr('src', 'img/theme4.png');//				défini un nouveau dos de carte	
	dos =  'img/theme4.png';					
	$('#css').attr('href', "css/theme4.css");//-------------------------charge le fichier css du thème	
//	img = 'img4';
//	changeDossier();
});
$('#t5').click(function(){//----------------------------------------au click sur l'imput
	$('#photo img').attr('src', 'img/theme5.png');//				défini un nouveau dos de carte	
	dos =  'img/theme5.png';					
	$('#css').attr('href', "css/theme5.css");//-------------------------charge le fichier css du thème	
	//img = 'img5';
	//changeDossier();

});

//Pour changer le dossier des images
/*
function changeDossier(){
	liste2 = new Array;
	liste = new Array;
	tab = new Array;

	document.getElementById("photo").innerHTML = '';

	afficherimage();
	random();

	liste = [img+"/ane.jpg", img+"/chat.jpg", img+"/chien.jpg", img+"/lama.jpg", img+"/lapins.jpg", 
	img+"/lionne.jpg", img+"/ours.jpg"];
	liste2 = [img+"/ane.jpg", img+"/chat.jpg", img+"/chien.jpg", img+"/lama.jpg", img+"/lapins.jpg", 
	img+"/lionne.jpg", img+"/ours.jpg"];
	tab = liste.concat(liste2);
}*/