/////////////////////////////////////////////////////
// VARIABLES GLOBALES
/////////////////////////////////////////////////////

// Header (navbar)
const header = document.querySelector("header");

// Image à zoomer / parallax
const photo = document.querySelector(".photo img");

// Vidéo background
const video = document.getElementById("video-bg");

// Typing effect
const typingElement = document.getElementById("typing");
const text = "Tout a commencé sur Movie Maker. J'avais douze ans, et je passais des heures à monter des vidéos de vacances en famille, à déplacer des plans, tester des coupes, recommencer. Ce qui me fascinait, ce n'était pas simplement « faire une vidéo », mais découvrir qu'en assemblant des images dans un certain ordre, on pouvait raconter quelque chose. Qu'on pouvait faire ressentir. C'est là que tout a pris sens : raconter des histoires à partir d'images, c'est ce qui me fait vibrer.\nCette envie m'a menée à l'université Lyon 2, où j'ai obtenu un Master en réalisation et production documentaire. J'y ai appris à penser le récit, à comprendre le langage cinématographique, à saisir ce qui se joue derrière chaque plan, chaque coupe, chaque choix de cadre. Le documentaire s'est imposé comme une évidence : j'aime utiliser le réel comme matériau de création pour construire un récit et exprimer un point de vue, une singularité.\nMais ce qui m'a attirée vers le cinéma dès le départ, c'était le montage. Alors j'y suis revenue. C'est là que je me sens le plus à ma place : structurer le récit, jouer avec le rythme, donner une intention à chaque coupe. Mon travail comme monteuse-cadreuse m'a permis d'affiner mon regard sur Premiere Pro et After Effects, et de développer le motion design comme un langage à part entière pour animer les formes et enrichir la narration.\nLa photographie est venue compléter ce parcours. Là où le montage construit le sens dans le temps, la photo me pousse à saisir l'instant précis qui se suffit à lui-même, à observer et rendre visible ce qui fait qu'une image devient forte.\nAujourd'hui, je continue d'explorer de nouveaux outils et langages visuels. Parce qu'apprendre à raconter une histoire, c'est un chemin qui ne s'arrête jamais."; // ton texte complet

// Variables pour typing
let typingIndex = 0;
let typingTimeout;

// Sécurité pour la vidéo (évite répétition)
let videoActivated = false;

/////////////////////////////////////////////////////
// SCROLL OPTIMISÉ (requestAnimationFrame)
/////////////////////////////////////////////////////

let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Fonction globale appelée au scroll
function handleScroll() {
    navbarEffect();
    parallaxEffect();
    videoEffect();
}

/////////////////////////////////////////////////////
// NAVBAR SCROLL EFFECT
/////////////////////////////////////////////////////

function navbarEffect() {
    if (!header) return;

    // Si on a scrollé > 50px → ajoute la classe "scrolled"
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

/////////////////////////////////////////////////////
// PARALLAX / ZOOM IMAGE
/////////////////////////////////////////////////////

function parallaxEffect() {
    if (!photo) return;

    const rect = photo.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // centre de l'image
    const elementCenter = rect.top + rect.height / 2;

    // centre de l'écran
    const screenCenter = windowHeight / 2;

    // distance relative
    let distance = elementCenter - screenCenter;

    // normalisation et clamp (-1 à 1)
    let progress = distance / windowHeight;
    progress = Math.max(-1, Math.min(1, progress));

    // calcul du scale (zoom léger)
    const scale = 1 - progress * 0.1;

    // applique le scale via transform
    photo.style.transform = `scale(${scale})`;
}

/////////////////////////////////////////////////////
// VIDEO AUTOPLAY + FADE IN SON
/////////////////////////////////////////////////////

function videoEffect() {
    if (!video) return;

    // Lecture seulement si la vidéo est en pause
    if (!video.paused) return;

    // Démarrage muet
    video.muted = true;

    // Essayez de jouer
    video.play().then(() => {

        // Fade du son sur desktop
        let vol = 0;
        video.volume = 0;
        video.muted = false;

        const fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.05;
                video.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 100);

    }).catch(() => {
        console.log("Lecture bloquée par le navigateur");
    });

    // Boucle manuelle en JS si jamais loop HTML absent
    video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
    });
}


/////////////////////////////////////////////////////
// TYPING EFFECT
/////////////////////////////////////////////////////

function typeChar() {
    if (!typingElement) return;

    if (typingIndex < text.length) {
        // ajoute le caractère actuel
        typingElement.textContent += text.charAt(typingIndex);
        typingIndex++;

        // vitesse typing
        typingTimeout = setTimeout(typeChar, 20);
    }
}

// Reset + relance animation
function typingReset() {
    if (!typingElement) return;

    typingElement.textContent = "";
    typingIndex = 0;
    typeChar();
}

/////////////////////////////////////////////////////
// INTERSECTION OBSERVER
/////////////////////////////////////////////////////

// Observe tous les éléments cachés, sauf la photo (sinon elle disparaît)
const hiddenElements = document.querySelectorAll(".hidden:not(.photo)");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Si l'élément contient le typing → relance l'animation
            if (entry.target.querySelector("#typing")) {
                clearTimeout(typingTimeout);
                typingReset();
            }

        } else {
            entry.target.classList.remove("show");
        }

    });
});

// Activation observer
hiddenElements.forEach((el) => observer.observe(el));