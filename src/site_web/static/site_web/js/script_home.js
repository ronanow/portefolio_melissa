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
const text = `Tout a commencé à douze ans, sur Movie Maker. Je passais des heures à monter des vidéos de vacances, à déplacer les plans, essayer des coupes, recommencer encore et encore.
Très vite, j’ai compris que ce qui me plaisait n’était pas seulement de faire des vidéos, mais de raconter à travers les images. J’ai découvert qu’en les assemblant d’une certaine manière, on pouvait créer du sens, transmettre une émotion et faire émerger un regard.
C’est là que j’ai compris que ce qui m’animait profondément, c’était raconter des histoires par l’image.\n
Cette envie m’a conduite à l’Université Lumière Lyon 2, où j’ai obtenu un Master en réalisation et production documentaire. J’y ai appris à construire un récit, à maîtriser le langage cinématographique et à comprendre ce qui se joue dans chaque plan, chaque coupe, chaque cadrage.\n
Le documentaire s’est imposé comme une évidence. J’aime m’appuyer sur le réel pour construire des histoires qui portent un regard particulier.\n
Mais ce qui m’a attirée vers le cinéma dès le départ, c’était le montage. J’y suis revenue naturellement. C’est là que je me sens le plus à ma place, à structurer un récit, travailler le rythme et donner du sens à chaque coupe.\n
Mon parcours de monteuse-cadreuse m’a permis d’affiner ma maîtrise de Premiere Pro et d’explorer avec After Effects le motion design comme un langage à part entière, capable d’animer les formes et d’enrichir la narration.\n
La photographie est venue compléter mon parcours. Là où le montage déroule le récit dans le temps, la photo me pousse à saisir l’instant.\n
Aujourd’hui, je continue d’explorer de nouveaux outils et de nouveaux langages visuels. Pour moi, raconter une histoire reste une recherche en mouvement, un apprentissage sans fin.`;


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

  // Reste muet : le son
  // est géré par unlockSound()
  video.muted = true;

}).catch(() => {});

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
        typingTimeout = setTimeout(typeChar, 1);
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

/////////////////////////////////////////////////////
// SON : UNLOCK AU CLIC + BOUTON MUTE
/////////////////////////////////////////////////////

const muteBtn = document.getElementById("mute-btn");
let soundUnlocked = false;

function fadeInSound() {
    video.muted = false;
    let vol = 0;
    video.volume = 0;

    const fade = setInterval(() => {
        if (vol < 1) {
            vol += 0.05;
            video.volume = Math.min(vol, 1);
        } else {
            clearInterval(fade);
        }
    }, 100);
}

function updateMuteBtn() {
    if (!muteBtn) return;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
}

// Unlock au premier clic n'importe où sur la page
document.addEventListener("click", function unlockSound(e) {
    if (e.target.id === "mute-btn") return;

    document.removeEventListener("click", unlockSound);

    if (!video || soundUnlocked) return;
    soundUnlocked = true;

    video.play().then(() => {
        fadeInSound();
        updateMuteBtn();
    }).catch(() => {});
});

// Bouton mute
if (muteBtn) {
    muteBtn.addEventListener("click", () => {
        if (!video) return;

        if (!soundUnlocked) {
            // Premier clic sur le bouton = on unlock le son
            soundUnlocked = true;
            video.play().then(() => {
                fadeInSound();
                updateMuteBtn();
            }).catch(() => {});
        } else {
            // Bascule mute/unmute normalement
            video.muted = !video.muted;
            updateMuteBtn();
        }
    });
}