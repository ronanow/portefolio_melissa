

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
const text = "Tout a commencé sur Movie Maker. J'avais douze ans, et je passais des heures à monter des vidéos de vacances en famille, à déplacer des plans, tester des coupes, recommencer. Ce qui me fascinait, ce n'était pas simplement « faire une vidéo », mais découvrir qu'en assemblant des images dans un certain ordre, on pouvait raconter quelque chose. Qu'on pouvait faire ressentir. C'est là que tout a pris sens : raconter des histoires à partir d'images, c'est ce qui me fait vibrer.\nCette envie m'a menée à l'université Lyon 2, où j'ai obtenu un Master en réalisation et production documentaire. J'y ai appris à penser le récit, à comprendre le langage cinématographique, à saisir ce qui se joue derrière chaque plan, chaque coupe, chaque choix de cadre. Le documentaire s'est imposé comme une évidence : j'aime utiliser le réel comme matériau de création pour construire un récit et exprimer un point de vue, une singularité.\nMais ce qui m'a attirée vers le cinéma dès le départ, c'était le montage. Alors j'y suis revenue. C'est là que je me sens le plus à ma place : structurer le récit, jouer avec le rythme, donner une intention à chaque coupe. Mon travail comme monteuse-cadreuse m'a permis d'affiner mon regard sur Premiere Pro et After Effects, et de développer le motion design comme un langage à part entière pour animer les formes et enrichir la narration.\nLa photographie est venue compléter ce parcours. Là où le montage construit le sens dans le temps, la photo me pousse à saisir l'instant précis qui se suffit à lui-même, à observer et rendre visible ce qui fait qu'une image devient forte.\nAujourd'hui, je continue d'explorer de nouveaux outils et langages visuels. Parce qu'apprendre à raconter une histoire, c'est un chemin qui ne s'arrête jamais.";

const typingElement = document.getElementById("typing");
let typingIndex = 0;

function typeChar() {
    if (typingIndex < text.length) {
        typingElement.textContent += text.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeChar, 1);
    }
}

typeChar();