##JEU DES PAIRES
Code complet :

	var tab = ["img/ane.jpg", "img/chat.jpg", "img/chien.jpg", "img/lama.jpg", "img/lapins.jpg", 
	"img/lionne.jpg", "img/ours.jpg", "img/ane.jpg", "img/chat.jpg", "img/chien.jpg", "img/lama.jpg", 
	"img/lapins.jpg", "img/lionne.jpg", "img/ours.jpg"];
	var dos = 'img/dos.png'; 
	var clique=0;
	var paires = 0;
	var choixun;
	var choixdeux;
	var norepeat = true;

	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 //                                                                         AFFICHER LES IMAGES                                                         //
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function afficherimage() {
		for(i=0; i<=tab.length-1; i++) {
			document.getElementById("photo").innerHTML += '<img src="img/dos.png" class="photo" onclick="choisir('+i+')" draggable="false">'
		}
	}

	afficherimage();

	function random(tab){ 
		var j, x, i;
		for(i = tab.length; i; i--) { 
			j = Math.floor(Math.random() * i);
			x = tab[i-1];  
			tab[i-1] = tab[j]; 
			tab[j] = x; 
		}
	}
	random(tab);

	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 //                                                                           CHOIX DES CARTES                                                         //
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	 
	function choisir(carte) { 
		if (norepeat == true){
			timerID = setInterval("chrono()", 1000);
			norepeat = false;
		}
	 
	if (clique == 2) { 
		return; 
	}
	if (clique == 0) { 
		choixun = carte; 
		document.images[carte].src =  tab[carte]; 
		document.images[choixun].style.pointerEvents = 'none';
		clique = 1; 
	}
	else { 
		clique = 2; 
		choixdeux = carte; 
		document.images[carte].src =  tab[carte]; 
		timer = setTimeout("verif()", 500); 
	}	
	}


	   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  //                                                                         VERIFIE LES PAIRES                                                       //
	 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




	function verif() { 
		clique = 0;
		if (tab[choixdeux] ==  tab[choixun]) {
			paires++; 
			document.getElementById("paires").innerHTML = paires;
			document.images[choixun].style.pointerEvents = 'none';
			document.images[choixun].style.opacity = '0.3';
			document.images[choixun].style.pointerEvents = 'none';
			document.images[choixdeux].style.opacity = '0.3';
		} else {
			document.images[choixun].src = dos;
			document.images[choixun].style.pointerEvents = 'auto';
			document.images[choixdeux].src = dos;
			return;
		}
		if (paires==7) {
			clearInterval(timerID);
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

	function chrono(){ 
		if(sec<59){
			sec++;
			if(sec<10){
				sec = "0" +sec;
			}

		}
		else if(sec=59){
			min++;
			sec = "0" + 0;
		}
		document.getElementById("chronotime").innerHTML = min + ":" + sec +"";

	} 
 






Déclaration des variables  
var tab : toutes les images dans un tableau  
Dans un premier temps:  
- affichage des images dans le html et du dos superposé(via le javascript),
Exemple: var dos = 'img/dos.png';

Dans un second temps la fonction random mélange les cartes aléatoirement.

Fonction qui permet de melanger les images

	function random(tab){ 
		var j, x, i;
		for(i = tab.length; i; i--) { 

Pour i=longueur totale du tableau, i toujours vrai(sup a zero), on decremente i(on lui enleve 1).

			
			j = Math.floor(Math.random() * i);

Math.floor arondie a la valeur superieure,Math.random donne un nombre aleatoire (entre 0 et 1)le tout * 

			x = tab[i-1];

Decale de 1 à l'interrieur du tableau(ex:si i=13 X deviendra lionne)

			tab[i-1] = tab[j];

Si i= 13 tab 12(i-1) deviendras J(j=nombre aleatoire)

			tab[j] = x; 

j deviens X(pour cette exemple x=lionne)

		}
	}
	random(tab);

On appelle la fonction random


La fonction choisir nous permet de cliquer sur deux cartes afin de constituer une paire.


	function choisir(carte) { 

Choix des cartes quand l'utilisateur clique

		if (norepeat == true){

Empeche le chronometre de se repeter

			timerID = setInterval("chrono()", 1000);

On appelle la fonction chronometre

			norepeat = false;
		}
		 
		if (clique == 2) {

Au delà du deuxième clique

			return;
			} 

On affiche rien
		
		if (clique == 0) { 

Au premier clique


			choixun = carte; 

On attribue le numéro de la carte choisie au premier choix

			document.images[carte].src =  tab[carte];

Affiche l'image de la carte correspondant au choix

			document.images[choixun].style.pointerEvents = 'none';

Desactive l'evenement du clique(pas de double clique)

			clique = 1; 

On passe le clique à 1

		}
		else { 

Au deuxième clique

			clique = 2; 

On passe le clique à 2

			choixdeux = carte; 

On attribue le numéro de la carte choisie au deuxième choix

			document.images[carte].src =  tab[carte]; 

Affiche l'image de la carte correspondant au choix

			timer = setTimeout("verif()", 500);
					}	
	} 

Ajoute un temps de pause puis passe à la fonction de vérification


Dans cette fonction se trouve aussi des paramètres empêchant la triche via le double clique sur une même image.
La fonction verif qui est associée à la fonction choisir, permet au javascript de reconnaître si deux cartes sont identiques et les laisse retournées et applique une légère opacitée.

	function verif() { 

Vérifie si une paire a été faite

		clique = 0;
		if (tab[choixdeux] ==  tab[choixun]) {

Si les deux cartes sont pareilles la paire reste fixe

			paires++; 
			document.getElementById("paires").innerHTML = paires;
			document.images[choixun].style.pointerEvents = 'none';

Desactive l'evenement du clique(pas de double clique)

			document.images[choixun].style.opacity = '0.3';

L'opacité s'applique sur la carte retournée

			document.images[choixun].style.pointerEvents = 'none';

Desactive l'evenement du clique(pas de double clique)

			document.images[choixdeux].style.opacity = '0.3';

L'opacité s'applique sur la carte retournée

		} else {
			document.images[choixun].src = dos;
			document.images[choixun].style.pointerEvents = 'auto';

Desactive l'evenement du clique(pas de double clique)

			document.images[choixdeux].src = dos;
			return;
		}
		if (paires==7) {
			clearInterval(timerID);

Arrete le chrono quand toutes les paires trouvées

			document.getElementById("photo").style.display = 'block';
			document.getElementById("photo").style.flexDirection = 'column';
			document.getElementById("photo").innerHTML = '<h1> Vous avez gagné !</h1><br /><div class="boutton"><input type="button" class="restart" value="Recommencer" onClick="window.location.reload()"></div>';
		}
	}

Pour l'ajout du chronomètre, Nous avons codé une fonction chrono, celle-ci démarre au premier clique sur une image et s'arrête quand toutes les paires sont trouvées.


Function chronometre

		var timerID = 0;
		var sec = 0;
		var min = 0; 

		function chrono(){ 


			if(sec<59){

Quand seconde superieur a 59 milliemme

				sec++;

Ajoute une seconde au chronometre

				if(sec<10){
					sec = "0" +sec;

Affiche 00 avant le chiffre 1

			
			}else if(sec=59){

Quand seconde superieur a 59 milliemme

				min++;

Ajoute une minute au chronometre

				sec = "0" + 0;
			}
			document.getElementById("chronotime").innerHTML = min + ":" + sec +"";}

Affiche le chronometre dans le html a l'endroit ciblé par l'id

A la fin du jeux? le joueur à la possibilité de recommencer une nouvelle partie grâce au boutton "recommencer".

