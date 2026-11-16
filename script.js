document.addEventListener("DOMContentLoaded", function () {
    // Mobile Sidebar Toggle
     const menuBtn = document.getElementById('menuBtn');
     const closeSidebar = document.getElementById('closeSidebar');
     const mobileSidebar = document.getElementById('mobileSidebar');
     const overlay = document.getElementById('overlay');
   
     function openSidebar() {
         mobileSidebar.classList.add('active');
         overlay.classList.add('active');
         document.body.style.overflow = 'hidden';
     }
   
     function closeSidebarFn() {
         mobileSidebar.classList.remove('active');
         overlay.classList.remove('active');
         document.body.style.overflow = '';
     }
   
     menuBtn.addEventListener('click', openSidebar);
     closeSidebar.addEventListener('click', closeSidebarFn);
     overlay.addEventListener('click', closeSidebarFn);

 });


document.addEventListener("DOMContentLoaded", function () {
    const accordionButton = document.querySelector('[data-accordion-target="#accordion-card-body-1"]');
    const accordionBody = document.getElementById('accordion-card-body-1');
    const accordionIcon = accordionButton.querySelector('[data-accordion-icon]');

    accordionButton.addEventListener('click', () => {
        // Toggle aria-expanded
        const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
        accordionButton.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle body
        accordionBody.classList.toggle('hidden');
        
        // Toggle icon rotation
        accordionIcon.classList.toggle('rotate-180');
    });
});

document.addEventListener("DOMContentLoaded", function () {

    // Récupération des éléments
    const link1 = document.getElementById('link1');
    const link2 = document.getElementById('link2');
    const link3 = document.getElementById('link3');
    const pageContent1 = document.getElementById('page-content-1');
    const pageContent2 = document.getElementById('page-content-2');
    const pageContent3 = document.getElementById('page-content-3');
    const buttonReturn = document.getElementById('button-return');

    // ✨ NOUVEAU : Stack pour l'historique des pages
    let pageHistory = [];
    let currentPage = null;

    // Fonction générique pour afficher une page
    function showPage(pageNumber, addToHistory = true) {
        // Ajouter la page actuelle à l'historique avant de changer
        if (addToHistory && currentPage !== null && currentPage !== pageNumber) {
            pageHistory.push(currentPage);
        }

        // Cacher toutes les pages
        pageContent1.classList.add('page-hidden');
        pageContent1.classList.remove('page-visible');
        pageContent2.classList.add('page-hidden');
        pageContent2.classList.remove('page-visible');
        pageContent3.classList.add('page-hidden');
        pageContent3.classList.remove('page-visible');

        // Réinitialiser tous les boutons
        link1.classList.remove('bg-gray-800', 'text-white');
        link1.classList.add('bg-white', 'text-gray-600');
        link2.classList.remove('bg-gray-800', 'text-white');
        link2.classList.add('bg-white', 'text-gray-600');
        link3.classList.remove('bg-gray-800', 'text-white');
        link3.classList.add('bg-gray-800', 'text-white');

        // Afficher la page demandée
        switch(pageNumber) {
            case 1:
                pageContent1.classList.remove('page-hidden');
                pageContent1.classList.add('page-visible');
                link1.classList.remove('bg-white', 'text-gray-600');
                link1.classList.add('bg-gray-800', 'text-white');
                break;
            case 2:
                pageContent2.classList.remove('page-hidden');
                pageContent2.classList.add('page-visible');
                link2.classList.remove('bg-white', 'text-gray-600');
                link2.classList.add('bg-gray-800', 'text-white');
                break;
            case 3:
                pageContent3.classList.remove('page-hidden');
                pageContent3.classList.add('page-visible');
                link3.classList.remove('bg-white', 'text-gray-600');
                link3.classList.add('bg-gray-800', 'text-white');
                break;
        }

        currentPage = pageNumber;

        // Afficher/cacher le bouton retour selon l'historique
        updateReturnButton();
    }

    // ✨ NOUVEAU : Fonction pour revenir à la page précédente
    function goBack() {
        if (pageHistory.length > 0) {
            // Récupérer la dernière page de l'historique
            const previousPage = pageHistory.pop();
            // Afficher cette page sans l'ajouter à l'historique
            showPage(previousPage, false);
        }
    }

    // ✨ NOUVEAU : Mettre à jour la visibilité du bouton retour
    function updateReturnButton() {
        // Le bouton est visible seulement sur page 3 ET s'il y a un historique
        if (currentPage === 3 && pageHistory.length > 0) {
            buttonReturn.style.display = 'flex';
        } else {
            buttonReturn.style.display = 'none';
        }
    }

    // Événements de clic pour les liens
    link1.addEventListener('click', () => showPage(1));
    link2.addEventListener('click', () => showPage(2));
    link3.addEventListener('click', () => showPage(3));

    // ✨ NOUVEAU : Événement pour le bouton retour
    buttonReturn.addEventListener('click', goBack);

    // Afficher la page 1 par défaut au chargement
    showPage(1, false); // false = ne pas ajouter à l'historique au démarrage
});




document.addEventListener("DOMContentLoaded", function () {

    const individualBtn = document.getElementById('individualBtn');
    const teamBtn = document.getElementById('teamBtn');
    const individualCards = document.getElementById('individualCards');
    const teamCards = document.getElementById('teamCards');

    // Configuration des délais (en ms)
    const CONFIG = {
        delayBetweenCardsOut: 80,    // Délai entre chaque carte (sortie)
        delayBetweenCardsIn: 120,     // Délai entre chaque carte (entrée)
        animationDuration: 500        // Durée totale de l'animation d'une carte
    };

    function animateCardsOut(container, callback) {
        const cards = container.querySelectorAll('.pricing-card');
        let delay = 0;

        cards.forEach((card) => {
            setTimeout(() => {
                card.classList.remove('animate-in');
                card.classList.add('animate-out');
            }, delay);
            delay += CONFIG.delayBetweenCardsOut;
        });

        setTimeout(callback, delay + CONFIG.animationDuration);
    }

    function animateCardsIn(container) {
        const cards = container.querySelectorAll('.pricing-card');
        let delay = 0;

        cards.forEach((card) => {
            setTimeout(() => {
                card.classList.remove('animate-out');
                card.classList.add('animate-in');
            }, delay);
            delay += CONFIG.delayBetweenCardsIn;
        });
    }

    function switchToIndividual() {
        individualBtn.disabled = true;
        teamBtn.disabled = true;

        animateCardsOut(teamCards, () => {
            teamCards.classList.add('hidden', 'fade-out');
            teamCards.classList.remove('fade-in');
            
            individualCards.classList.remove('hidden', 'fade-out');
            individualCards.classList.add('fade-in');
            individualCards.offsetHeight;
            
            animateCardsIn(individualCards);

            individualBtn.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
            individualBtn.classList.remove('text-gray-400');
            teamBtn.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
            teamBtn.classList.add('text-gray-400');

            individualBtn.disabled = false;
            teamBtn.disabled = false;
        });
    }

    function switchToTeam() {
        individualBtn.disabled = true;
        teamBtn.disabled = true;

        animateCardsOut(individualCards, () => {
            individualCards.classList.add('hidden', 'fade-out');
            individualCards.classList.remove('fade-in');
            
            teamCards.classList.remove('hidden', 'fade-out');
            teamCards.classList.add('fade-in');
            teamCards.offsetHeight;
            
            animateCardsIn(teamCards);

            teamBtn.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
            teamBtn.classList.remove('text-gray-400');
            individualBtn.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
            individualBtn.classList.add('text-gray-400');

            individualBtn.disabled = false;
            teamBtn.disabled = false;
        });
    }

    function initializeCards() {
        const visibleCards = individualCards.querySelectorAll('.pricing-card');
        let delay = 0;
        visibleCards.forEach(card => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, delay);
            delay += CONFIG.delayBetweenCardsIn;
        });
    }

    individualBtn.addEventListener('click', switchToIndividual);
    teamBtn.addEventListener('click', switchToTeam);
    
    initializeCards();
});

document.addEventListener("DOMContentLoaded", function () {

        window.addEventListener('load', () => {
            setTimeout(() => {
                const skeleton = document.getElementById('skeleton');
                const content = document.getElementById('content');
                
                // Fade out skeleton
                skeleton.classList.add('fade-out');
                
                setTimeout(() => {
                    skeleton.style.display = 'none';
                    content.classList.remove('hidden');
                    content.classList.add('fade-in');
                }, 500);
            }, 2000); // 2 seconds loading time
        });

    });

        
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('mainTextarea');
    const sendBtn = document.getElementById('sendBtn');

    // Fonction pour ajuster automatiquement la hauteur SANS SCROLLER
    function autoResize() {
        textarea.style.height = 'auto';

        // NOUVEAU : plafond plus bas sur mobile pour ne pas écraser le welcome text
        const maxHeight = window.innerWidth < 768 ? 140 : 300;
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = newHeight + 'px';
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }

    textarea.addEventListener('input', autoResize);
    textarea.addEventListener('paste', () => setTimeout(autoResize, 0));
    textarea.addEventListener('cut', () => setTimeout(autoResize, 0));

    // Gérer l'envoi du message
    sendBtn.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            console.log('Message envoyé:', message);
            textarea.value = '';
            autoResize();
        }
    });

    // Ctrl+Enter ou Cmd+Enter
    textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            sendBtn.click();
        }
    });

    autoResize();

    /* ============================================================
       NOUVEAU : remet l'écran à zéro quand le clavier iOS se ferme
       ============================================================ */
    const vv = window.visualViewport;
    const root = document.documentElement;

    function syncViewport() {
        const h = vv ? vv.height : window.innerHeight;
        const top = vv ? vv.offsetTop : 0;

        root.style.setProperty('--app-h', h + 'px');
        root.style.setProperty('--app-top', top + 'px');

        // clavier ouvert si la hauteur visible chute de plus de 25 %
        const open = window.innerHeight - h > window.innerHeight * 0.25;
        document.body.classList.toggle('keyboard-open', open);

        if (window.scrollY !== 0) window.scrollTo(0, 0);   // annule le scroll auto d'iOS
    }

    if (vv) {
        vv.addEventListener('resize', syncViewport);
        vv.addEventListener('scroll', syncViewport);
    }
    window.addEventListener('orientationchange', () => setTimeout(syncViewport, 300));

    textarea.addEventListener('focus', () => {
        setTimeout(syncViewport, 100);
        setTimeout(syncViewport, 400);   // iOS anime l'ouverture du clavier
    });
    textarea.addEventListener('blur', () => setTimeout(syncViewport, 100));

    syncViewport();
});

// Fonction globale pour fermer tous les dropdowns SAUF celui spécifié
function closeAllDropdownsExcept(excludeDropdown) {
    // Fermer le dropdown des assistants
    if (excludeDropdown !== 'assistants') {
        const dropdownMenu = document.getElementById('dropdownMenu');
        const chevron = document.getElementById('chevron');
        if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
    }
    
    // Fermer le dropdown menu
    if (excludeDropdown !== 'menu') {
        const menuDropdown = document.querySelector('.dropdown-menu');
        if (menuDropdown) menuDropdown.classList.remove('active');
    }
    
    // Fermer le dropdown more
    if (excludeDropdown !== 'more') {
        const dropdownMore = document.querySelector('.dropdown-more');
        const moreButton = document.querySelector('.more-button');
        if (dropdownMore) dropdownMore.classList.remove('active');
        if (moreButton) moreButton.classList.remove('bg-gray-200', 'rounded-lg');
    }
    
    // Fermer le dropdown profile
    if (excludeDropdown !== 'profile') {
        const profileDropdown = document.querySelector('.profile-dropdown');
        if (profileDropdown) profileDropdown.classList.remove('active');
    }
    
    // Fermer le dropdown logo
    if (excludeDropdown !== 'logo') {
        const logoDropdown = document.querySelector('.logo-dropdown');
        if (logoDropdown) logoDropdown.classList.remove('active');
    }
}

// ===== DROPDOWN ASSISTANTS =====
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const chevron = document.getElementById('chevron');
const selectedAssistant = document.getElementById('selectedAssistant');
const poweredBy = document.getElementById('poweredBy');
const options = document.querySelectorAll('.option');

// Toggle dropdown
if (dropdownButton) {
    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownMenu.classList.contains('hidden');
        
        // Fermer tous les autres dropdowns
        closeAllDropdownsExcept('assistants');
        
        if (isHidden) {
            dropdownMenu.classList.remove('hidden');
            chevron.style.transform = 'rotate(180deg)';
        } else {
            dropdownMenu.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        }
    });
}

// Sélection d'une option
options.forEach(option => {
    option.addEventListener('click', () => {
        const h3 = option.querySelector('h3');
        const name = h3 ? h3.textContent.trim() : option.getAttribute('data-name');
        selectedAssistant.textContent = name;
        
        if (poweredBy) {
            poweredBy.textContent = `Powered by ${name}`;
        }
        
        // Retirer le style de sélection de toutes les options
        options.forEach(opt => {
            opt.classList.remove('bg-blue-50', 'border-l-4', 'border-blue-500');
            opt.classList.add('hover:bg-gray-50');
            const checkmark = opt.querySelector('svg[fill="currentColor"].text-blue-600');
            if (checkmark) {
                checkmark.remove();
            }
        });
        
        // Ajouter le style de sélection à l'option cliquée
        option.classList.add('bg-blue-50', 'border-l-4', 'border-blue-500');
        option.classList.remove('hover:bg-gray-50');
        
        // Ajouter l'icône checkmark
        let titleDiv = option.querySelector('.flex.items-center.gap-2');
        
        if (!titleDiv) {
            const h3Element = option.querySelector('h3');
            if (h3Element) {
                const wrapper = document.createElement('div');
                wrapper.className = 'flex items-center gap-2';
                h3Element.parentNode.insertBefore(wrapper, h3Element);
                wrapper.appendChild(h3Element);
                titleDiv = wrapper;
            }
        }
        
        if (titleDiv && !titleDiv.querySelector('svg[fill="currentColor"]')) {
            const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            checkmark.setAttribute('class', 'w-5 h-5 text-blue-600');
            checkmark.setAttribute('fill', 'currentColor');
            checkmark.setAttribute('viewBox', '0 0 20 20');
            checkmark.innerHTML = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>';
            titleDiv.appendChild(checkmark);
        }
        
        dropdownMenu.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    });
});

// Fermer le dropdown en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (dropdownButton && dropdownMenu) {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
    }
});

// ===== DROPDOWN MENU =====
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector('.menu-button');
    const menuDropdown = document.querySelector('.dropdown-menu');

    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menuDropdown.classList.contains('active');
            
            // Fermer tous les autres dropdowns
            closeAllDropdownsExcept('menu');
            
            if (isActive) {
                menuDropdown.classList.remove('active');
            } else {
                menuDropdown.classList.add('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.remove('active');
            }
        });

        menuDropdown.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                menuDropdown.classList.remove('active');
            });
        });
    }
});

// ===== DROPDOWN MORE =====
document.addEventListener("DOMContentLoaded", function () {
    const moreButton = document.querySelector('.more-button');
    const dropdownMore = document.querySelector('.dropdown-more');

    if (moreButton && dropdownMore) {
        moreButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = dropdownMore.classList.contains('active');
            
            // Fermer tous les autres dropdowns
            closeAllDropdownsExcept('more');
            
            if (isActive) {
                dropdownMore.classList.remove('active');
                moreButton.classList.remove('bg-gray-200', 'rounded-lg');
            } else {
                dropdownMore.classList.add('active');
                moreButton.classList.add('bg-gray-200', 'rounded-lg');
            }
        });

        document.addEventListener('click', (e) => {
            if (!moreButton.contains(e.target) && !dropdownMore.contains(e.target)) {
                dropdownMore.classList.remove('active');
                moreButton.classList.remove('bg-gray-200', 'rounded-lg');
            }
        });

        dropdownMore.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                dropdownMore.classList.remove('active');
                moreButton.classList.remove('bg-gray-200', 'rounded-lg');
            });
        });
    }
});

// ===== DROPDOWN PROFILE =====
document.addEventListener("DOMContentLoaded", function () {
    const profileButton = document.querySelector('.profile-button');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = profileDropdown.classList.contains('active');
            
            // Fermer tous les autres dropdowns
            closeAllDropdownsExcept('profile');
            
            if (isActive) {
                profileDropdown.classList.remove('active');
            } else {
                profileDropdown.classList.add('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });

        profileDropdown.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.textContent.includes('Sign Out')) {
                    console.log('User signing out...');
                }
                profileDropdown.classList.remove('active');
            });
        });
    }
});

// ===== DROPDOWN LOGO =====
document.addEventListener("DOMContentLoaded", function () {
    const logoButton = document.querySelector('.logo-button');
    const logoDropdown = document.querySelector('.logo-dropdown');

    if (logoButton && logoDropdown) {
        logoButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = logoDropdown.classList.contains('active');
            
            // Fermer tous les autres dropdowns
            closeAllDropdownsExcept('logo');
            
            if (isActive) {
                logoDropdown.classList.remove('active');
            } else {
                logoDropdown.classList.add('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!logoButton.contains(e.target) && !logoDropdown.contains(e.target)) {
                logoDropdown.classList.remove('active');
            }
        });

        logoDropdown.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                console.log('Option clicked:', button.textContent.trim());
                logoDropdown.classList.remove('active');
            });
        });
    }
});








document.addEventListener("DOMContentLoaded", function () {
       const heroSlider = document.getElementById('heroSlider');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 1;
        let autoPlayInterval;

        // Fonction pour changer d'image avec animation
        function changeSlide(slideNumber) {
            currentSlide = slideNumber;
            
            // Retirer la classe active de toutes les slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Ajouter la classe active à la slide correspondante
            slides[slideNumber - 1].classList.add('active');
            
            // Mettre à jour les dots
            dots.forEach(dot => {
                if (parseInt(dot.dataset.slide) === slideNumber) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Fonction pour passer à la slide suivante
        function nextSlide() {
            currentSlide = currentSlide === 2 ? 1 : currentSlide + 1;
            changeSlide(currentSlide);
        }

        // Fonction pour démarrer l'auto-play
        function startAutoPlay() {
            // Arrêter l'ancien intervalle s'il existe
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            // Démarrer un nouveau intervalle
            autoPlayInterval = setInterval(nextSlide, 8000);
        }

        // Fonction pour arrêter l'auto-play
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Ajouter les événements de clic sur les dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideNumber = parseInt(this.dataset.slide);
                changeSlide(slideNumber);
                
                // Redémarrer l'auto-play après interaction manuelle
                startAutoPlay();
            });
        });

        // Pause auto-play au survol de la souris
        heroSlider.addEventListener('mouseenter', stopAutoPlay);
        heroSlider.addEventListener('mouseleave', startAutoPlay);

        // Démarrer l'auto-play au chargement
        startAutoPlay();

    });



        const messages = [
            {
                main: "Hey there! 👋",
                sub: "Need a boost?"
            },
            {
                main: "Welcome back! 🎉",
                sub: "Ready to create something amazing?"
            },
            {
                main: "Good to see you! 😊",
                sub: "Let's make today productive!"
            },
            {
                main: "Hello friend! 🚀",
                sub: "Time to build something great!"
            },
            {
                main: "Hi there! ✨",
                sub: "What can we help you with today?"
            }
        ];

        // Fonction pour choisir un message aléatoire
        function getRandomMessage() {
            const randomIndex = Math.floor(Math.random() * messages.length);
            return messages[randomIndex];
        }

        // Fonction pour afficher le message
        function displayRandomMessage() {
            const message = getRandomMessage();
            document.getElementById('mainText').textContent = message.main;
            document.getElementById('subText').textContent = message.sub;
        }

        // Afficher un message aléatoire au chargement
        displayRandomMessage();



document.addEventListener("DOMContentLoaded", function () {
    // Chat functionality
    const messagesContainer = document.getElementById('messagesContainer');

    function addMessage(text, isUser, delay = 0) {
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `flex gap-2 items-end ${isUser ? 'flex-row-reverse message-user' : 'message-ai'}`;
            
            const avatar = document.createElement('div');
            
            if (isUser) {
                // Avatar utilisateur avec "U"
                avatar.className = 'avatar bg-[#2A2A4A] text-white';
                avatar.textContent = 'U';
            } else {
                // Avatar IA avec image
                avatar.className = 'avatar';
                avatar.style.backgroundImage = "url('img/logoimg.png')";
                avatar.style.backgroundSize = "cover";
                avatar.style.backgroundPosition = "center";
            }
            
            const bubble = document.createElement('div');
            bubble.className = `message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`;
            bubble.textContent = text;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(bubble);
            
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.parentElement.scrollTop = messagesContainer.parentElement.scrollHeight;
        }, delay);
    }

    function addTypingIndicator(delay = 0, isUser = false) {
        setTimeout(() => {
            const typingDiv = document.createElement('div');
            typingDiv.className = `flex gap-2 items-end ${isUser ? 'flex-row-reverse message-user' : 'message-ai'}`;
            typingDiv.id = 'typingIndicator';
            
            const avatar = document.createElement('div');
            
            if (isUser) {
                // Avatar utilisateur
                avatar.className = 'avatar bg-[#2A2A4A] text-white';
                avatar.textContent = 'U';
            } else {
                // Avatar IA avec image
                avatar.className = 'avatar';
                avatar.style.backgroundImage = "url('img/logoimg.png')";
                avatar.style.backgroundSize = "cover";
                avatar.style.backgroundPosition = "center";
            }
            
            const bubble = document.createElement('div');
            bubble.className = `message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`;
            
            const typingSpan = document.createElement('div');
            typingSpan.className = 'typing-indicator';
            typingSpan.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            
            bubble.appendChild(typingSpan);
            typingDiv.appendChild(avatar);
            typingDiv.appendChild(bubble);
            
            messagesContainer.appendChild(typingDiv);
            messagesContainer.parentElement.scrollTop = messagesContainer.parentElement.scrollHeight;
        }, delay);
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function clearMessages() {
        messagesContainer.innerHTML = '';
    }

    // Fonction de séquence de chat
    function startChatSequence() {
        // Effacer les messages précédents
        clearMessages();
        
        // User typing indicator
        addTypingIndicator(900, true);
        
        setTimeout(() => {
            removeTypingIndicator();
            addMessage("Hey Apexity, can you generate an image of R2-D2?", true, 0);
        }, 2000);

        // AI typing indicator
        addTypingIndicator(4000, false);
        
        setTimeout(() => {
            removeTypingIndicator();
            addMessage("Hello! Of course, here’s the generated image of R2-D2. I’ve created a detailed representation of the famous Star Wars droid.", false, 0);
        }, 5500);

        // User typing indicator for second message
        addTypingIndicator(6500, true);
        
        setTimeout(() => {
            removeTypingIndicator();
            addMessage("Can you add it, and then generate an image of a 3D object", true, 0);
        }, 7500);

        // AI typing indicator for second response
        addTypingIndicator(8500, false);
        
        setTimeout(() => {
            removeTypingIndicator();
            addMessage("I've generated a 3D object for you! Here is a 3D scene with geometric objects and realistic textures.", false, 0);
            
            // Relancer la boucle après 8 secondes
            setTimeout(() => {
                startChatSequence();
            }, 8500);
        }, 9500);
    }

    // Démarrer la première séquence
    startChatSequence();
});


document.addEventListener("DOMContentLoaded", function () {

     let currentIndex = 0;
        const totalCards = 6;
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');

    function updateCarousel() {
        // Get the width of one slide including margin
        const slideElement = document.querySelector('.carousel-slide');
        const slideWidth = slideElement.offsetWidth;
        const slideMargin = 32; // 2rem = 32px
        const totalSlideWidth = slideWidth + slideMargin;

        // Calculate translation
        const translateX = -(currentIndex * totalSlideWidth);
        track.style.transform = `translateX(${translateX}px)`;

        // Update progress bar
        const progressPercentage = ((currentIndex + 1) / totalCards) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Remove active class from all slides and add to current
        const allSlides = document.querySelectorAll('.carousel-slide');
        allSlides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update button visibility
        if (currentIndex === 0) {
            prevBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
            prevBtn.classList.remove('opacity-0', 'pointer-events-none');
        }

        if (currentIndex === totalCards - 1) {
            nextBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
            nextBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel();
        }, 100);
    });

    // Initialize on load
    window.addEventListener('load', () => {
        updateCarousel();
    });

    // Initialize immediately
    updateCarousel();
    });


document.addEventListener("DOMContentLoaded", function () {
            // Animation compteur 1 : de 0 à 430+ en 2 secondes
        let count1 = 0;
        const target1 = 430;
        const duration1 = 2000; // 2 secondes
        const steps1 = 50; // Nombre d'étapes
        const increment1 = target1 / steps1;
        const interval1 = duration1 / steps1;
        
        const counter1Element = document.getElementById('counter1');
        counter1Element.textContent = '0';
        
        const countUp1 = setInterval(() => {
            if (count1 < target1) {
                count1 += increment1;
                if (count1 > target1) count1 = target1;
                counter1Element.textContent = Math.floor(count1) + '+';
            } else {
                clearInterval(countUp1);
                counter1Element.textContent = target1 + '+';
            }
        }, interval1);
        
        // Animation compteur 2 : de 0 à 1M+ en 2 secondes
        let count2 = 0;
        const target2 = 1000000;
        const duration2 = 2500; // 2 secondes
        const steps2 = 50; // Nombre d'étapes
        const increment2 = target2 / steps2;
        const interval2 = duration2 / steps2;
        
        const counter2Element = document.getElementById('counter2');
        counter2Element.textContent = '0';
        
        const countUp2 = setInterval(() => {
            if (count2 < target2) {
                count2 += increment2;
                if (count2 > target2) count2 = target2;
                
                // Formatage avec M pour millions
                if (count2 >= 1000000) {
                    counter2Element.textContent = (count2 / 1000000).toFixed(1) + 'M+';
                } else if (count2 >= 1000) {
                    counter2Element.textContent = Math.floor(count2 / 1000) + 'K+';
                } else {
                    counter2Element.textContent = Math.floor(count2);
                }
            } else {
                clearInterval(countUp2);
                counter2Element.textContent = '1.0M+';
            }
        }, interval2);
});


    document.addEventListener("DOMContentLoaded", function () {
      let currentIndex = 0;
      const totalSlides = 3;
      const track = document.getElementById('testimonialsTrack');
      const prevBtn = document.getElementById('testimonialsPrevBtn');
      const nextBtn = document.getElementById('testimonialsNextBtn');

      function updateTestimonials() {
        // Get the width of one slide
        const slideElement = document.querySelector('.testimonials-slide');
        const slideWidth = slideElement.offsetWidth;

        // Calculate translation
        const translateX = -(currentIndex * slideWidth);
        track.style.transform = `translateX(${translateX}px)`;

        // Remove active class from all slides and add to current
        const allSlides = document.querySelectorAll('.testimonials-slide');
        allSlides.forEach((slide, index) => {
          if (index === currentIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });

        // Update button visibility
        if (currentIndex === 0) {
          prevBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
          prevBtn.classList.remove('opacity-0', 'pointer-events-none');
        }

        if (currentIndex === totalSlides - 1) {
          nextBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
          nextBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
      }

      nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
          updateTestimonials();
        }
      });

      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateTestimonials();
        }
      });

      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          updateTestimonials();
        }, 100);
      });

      // Initialize on load
      window.addEventListener('load', () => {
        updateTestimonials();
      });

      // Initialize immediately
      updateTestimonials();
    });


document.addEventListener("DOMContentLoaded", function () {
     // Toggle switches functionality
        document.querySelectorAll('.toggle-switch').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Remove active class from all
                document.querySelectorAll('.toggle-switch').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tone-option').forEach(opt => opt.classList.remove('active'));
                
                // Add active to clicked
                this.classList.add('active');
                this.closest('.tone-option').classList.add('active');
            });
        });

        // Tone option click
        document.querySelectorAll('.tone-option').forEach(option => {
            option.addEventListener('click', function() {
                const toggle = this.querySelector('.toggle-switch');
                
                // Remove active from all
                document.querySelectorAll('.toggle-switch').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tone-option').forEach(opt => opt.classList.remove('active'));
                
                // Add active to clicked
                toggle.classList.add('active');
                this.classList.add('active');
            });
        });

        // Start button animation
        document.getElementById('startBtn').addEventListener('click', function() {
            this.innerHTML = '<span>Processing...</span>';
            setTimeout(() => {
                this.innerHTML = 'Start <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';
            }, 2000);
        });
    });