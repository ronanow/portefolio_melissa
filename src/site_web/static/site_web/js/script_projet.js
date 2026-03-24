/* =====================================================
AJUSTEMENT AUTOMATIQUE DES RECTANGLES
===================================================== */

function resizeCards(){

    // récupérer toutes les cartes
    const cards = document.querySelectorAll('.card')

    if(cards.length === 0) return


    // nombre de colonnes selon la largeur de l'écran
    const columns =
        window.innerWidth > 1200 ? 3 :
        window.innerWidth > 800 ? 2 : 1


    // calcul du nombre de rangées
    const rows = Math.ceil(cards.length / columns)


    // hauteur disponible pour remplir l'écran
    const rowHeight = window.innerHeight / rows


    // appliquer la hauteur à chaque carte
    cards.forEach(card=>{
        card.style.height = rowHeight + "px"
    })

}


// exécution au chargement de la page
window.addEventListener("load", resizeCards)

// exécution si la fenêtre change de taille
window.addEventListener("resize", resizeCards)



/* =====================================================
PREVIEW PHOTO AUTOMATIQUE
===================================================== */

/*
Images utilisées pour la preview
dans la carte photos
*/

const previewPhotos=[

"/static/site_web/images/event1.jpg",
"/static/site_web/images/event2.jpg",
"/static/site_web/images/event3.jpg",
"/static/site_web/images/event4.jpg",
"/static/site_web/images/event5.jpg",
"/static/site_web/images/event6.jpg",
"/static/site_web/images/event7.jpg",
"/static/site_web/images/event8.jpg",
"/static/site_web/images/event9.jpg",
"/static/site_web/images/event10.jpg",
"/static/site_web/images/event11.jpg",
"/static/site_web/images/event12.jpg",
"/static/site_web/images/event13.jpg",
"/static/site_web/images/event14.jpg",
"/static/site_web/images/event15.jpg",
"/static/site_web/images/event16.jpg",
"/static/site_web/images/event17.jpg",
"/static/site_web/images/event18.jpg"

]

let p = 0


/*
changement automatique de la photo
toutes les 2 secondes
*/

setInterval(()=>{

const preview = document.getElementById("preview-photo")

// si l'image n'existe pas on arrête
if(!preview) return


p++

if(p >= previewPhotos.length){
p = 0
}


// changement d'image
preview.src = previewPhotos[p]

},2000)