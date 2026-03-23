

/* NAVBAR SCROLL EFFECT */
window.addEventListener("scroll", function(){
    let header = document.querySelector("header");
    if(!header) return;
    if(window.scrollY > 50){
        header.classList.add("scrolled");
    } else{
        header.classList.remove("scrolled");
    }
});

/* TYPING EFFECT DYNAMIQUE */
const text = `Tout a commencé à douze ans, sur Movie Maker. Je passais des heures à monter des vidéos de vacances, à déplacer les plans, essayer des coupes, recommencer encore et encore.
Très vite, j’ai compris que ce qui me plaisait n’était pas seulement de faire des vidéos, mais de raconter à travers les images. J’ai découvert qu’en les assemblant d’une certaine manière, on pouvait créer du sens, transmettre une émotion et faire émerger un regard.
C’est là que j’ai compris que ce qui m’animait profondément, c’était raconter des histoires par l’image.\n
Cette envie m’a conduite à l’Université Lumière Lyon 2, où j’ai obtenu un Master en réalisation et production documentaire. J’y ai appris à construire un récit, à maîtriser le langage cinématographique et à comprendre ce qui se joue dans chaque plan, chaque coupe, chaque cadrage.\n
Le documentaire s’est imposé comme une évidence. J’aime m’appuyer sur le réel pour construire des histoires qui portent un regard particulier.\n
Mais ce qui m’a attirée vers le cinéma dès le départ, c’était le montage. J’y suis revenue naturellement. C’est là que je me sens le plus à ma place, à structurer un récit, travailler le rythme et donner du sens à chaque coupe.\n
Mon parcours de monteuse-cadreuse m’a permis d’affiner ma maîtrise de Premiere Pro et d’explorer avec After Effects le motion design comme un langage à part entière, capable d’animer les formes et d’enrichir la narration.\n
La photographie est venue compléter mon parcours. Là où le montage déroule le récit dans le temps, la photo me pousse à saisir l’instant.\n
Aujourd’hui, je continue d’explorer de nouveaux outils et de nouveaux langages visuels. Pour moi, raconter une histoire reste une recherche en mouvement, un apprentissage sans fin.`;

const typingElement = document.getElementById("typing");
let typingIndex = 0;

function typeChar() {
    if (typingIndex < text.length) {
        // Si on trouve un saut de ligne, on met un <br>
        if (text[typingIndex] === "\n") {
            typingElement.innerHTML += "<br>";
        } else {
            typingElement.innerHTML += text[typingIndex];
        }
        typingIndex++;
        setTimeout(typeChar, 1); // vitesse de frappe
    }
}

typeChar();