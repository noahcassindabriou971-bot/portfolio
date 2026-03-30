// --- GESTION DE LA NAVIGATION ET DU MENU MOBILE ---

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn?.querySelector('.close-icon');

// Ouverture/Fermeture du menu mobile
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
}

// Gestion du clic sur les liens (incluant ton nouveau logo photo)
const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link, .nav-logo-profile, .btn:not(.view-image)');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);

            // 1. Afficher la bonne page
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(targetId);
            if (targetPage) targetPage.classList.add('active');

            // 2. Mettre à jour l'état visuel des liens (soulignage/couleur)
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const desktopLink = document.querySelector(`.nav-desktop [href="#${targetId}"]`);
            if (desktopLink) desktopLink.classList.add('active');

            // 3. Fermer le menu mobile automatiquement après le clic
            if (mobileMenu) mobileMenu.classList.add('hidden');
            if (menuIcon) menuIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');

            // 4. Retour en haut de page fluide
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});
// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Empêche le rechargement de la page
        e.stopImmediatePropagation();

        // 1. On vérifie si le formulaire est bien rempli
        if (!contactForm.checkValidity()) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        // 2. On récupère les données
        const formData = new FormData(contactForm);

        try {
            // 3. On envoie les données à Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // 4. Si ça marche, on affiche ton message de succès
                formSuccess.classList.remove('hidden');
                contactForm.reset(); // On vide les champs
                
                // On cache le message après 5 secondes
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            } else {
                alert("Erreur lors de l'envoi. Vérifiez votre ID Formspree.");
            }
        } catch (error) {
            alert("Impossible de contacter le serveur d'envoi.");
        }
    });
}
// --- INDICATEUR DE SCROLL (BOUTON ACCUEIL) ---
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({ 
            top: window.innerHeight, 
            behavior: 'smooth' 
        });
    });
}
// --- LOGIQUE DE ZOOM DES IMAGES (CORRIGÉE) ---
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');

document.querySelectorAll('.view-image').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // CES DEUX LIGNES RÉPARENT L'ÉCRAN BLANC
        e.preventDefault(); 
        e.stopImmediatePropagation(); 

        const card = btn.closest('.project-card');
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('.project-title').innerText;

        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    });
});

// Fermer la fenêtre proprement
if (modal) {
    modal.addEventListener('click', (e) => {
        // On ferme si on clique sur le fond noir OU sur la croix
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}