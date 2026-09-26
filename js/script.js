/* =========================================
   LOHENDRA PORTFOLIO
   GLOBAL JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    const menuBtn = document.getElementById("hamburger") || document.getElementById("menuBtn");
    const navLinks = document.getElementById("navMenu") || document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");
            navLinks.classList.toggle("open", isOpen);
            menuBtn.classList.toggle("active", isOpen);
            menuBtn.setAttribute("aria-expanded", String(isOpen));

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active", "open");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* =====================================
       HOME TYPING ANIMATION
    ===================================== */

    const typingText = document.getElementById("typingText");

    if (typingText) {

        const phrases = [
            "Full Stack Web Developer",
            "Software Developer",
            "Problem Solver",
            "AI Enthusiast",
            "Continuous Learner"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typeSpeed = 75;
        const deleteSpeed = 40;
        const pauseAfterTyping = 1700;
        const pauseAfterDeleting = 450;


        function typeLoop() {

            const currentPhrase =
                phrases[phraseIndex];


            if (!deleting) {

                characterIndex++;

                typingText.textContent =
                    currentPhrase.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex ===
                    currentPhrase.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeLoop,
                        pauseAfterTyping
                    );

                    return;
                }


                setTimeout(
                    typeLoop,
                    typeSpeed
                );

            } else {

                characterIndex--;

                typingText.textContent =
                    currentPhrase.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex === 0) {

                    deleting = false;

                    phraseIndex =
                        (phraseIndex + 1) %
                        phrases.length;

                    setTimeout(
                        typeLoop,
                        pauseAfterDeleting
                    );

                    return;
                }


                setTimeout(
                    typeLoop,
                    deleteSpeed
                );
            }
        }


        typeLoop();
    }


    /* =====================================
       3D DEVELOPER CARD
    ===================================== */

    const developerCard =
        document.getElementById(
            "developerCard"
        );


    if (
        developerCard &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const visual =
            developerCard.parentElement;


        visual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    8;


                const rotateX =
                    ((centerY - y) /
                        centerY) *
                    8;


                developerCard.style.animation =
                    "none";


                developerCard.style.transform =
                    `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(20px)
                    `;
            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                developerCard.style.animation =
                    "cardFloat 6s ease-in-out infinite";

                developerCard.style.transform =
                    "";
            }
        );

    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".stat-card, .principle-card, .focus-card, .project-card-large, .final-cta"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            obs.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-element"
                );

                observer.observe(element);

            }
        );

    }


    /* =====================================
       CLOSE MOBILE MENU ON OUTSIDE CLICK
    ===================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navLinks ||
                !menuBtn
            ) {
                return;
            }


            if (
                !navLinks.contains(
                    event.target
                ) &&
                !menuBtn.contains(
                    event.target
                )
            ) {

                navLinks.classList.remove(
                    "open"
                );

            }

        }
    );

});
/* =========================================================
   CERTIFICATE PREVIEW + FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const certificateCards = document.querySelectorAll(".certificate-card");
    const viewButtons = document.querySelectorAll(".view-certificate-btn");
    const categoryButtons = document.querySelectorAll(".category-item");

    let openedCard = null;


    /* =====================================================
       CERTIFICATE PREVIEW
    ===================================================== */

    function closeCertificatePreview() {

        if (!openedCard) return;

        const preview = openedCard.querySelector(".certificate-preview");

        if (preview) {
            preview.remove();
        }

        openedCard.classList.remove("is-open");

        openedCard = null;
    }


    function openCertificatePreview(card, button) {

        /* Close previous certificate */
        if (openedCard && openedCard !== card) {
            closeCertificatePreview();
        }

        /* If same certificate is clicked again, close it */
        if (openedCard === card) {
            closeCertificatePreview();
            return;
        }

        const pdfPath = button.getAttribute("data-certificate");

        if (!pdfPath) {
            console.error("Certificate PDF path not found.");
            return;
        }

        const titleElement = card.querySelector(".certificate-content h3");

        const certificateTitle = titleElement
            ? titleElement.textContent.trim()
            : "Certificate Preview";


        /* Create preview */
        const preview = document.createElement("div");

        preview.className = "certificate-preview";

        preview.innerHTML = `
            <div class="certificate-preview-header">

                <span>
                    <i class="fa-solid fa-file-pdf"></i>
                    Certificate Preview
                </span>

                <button
                    type="button"
                    class="certificate-preview-close"
                    aria-label="Close certificate preview"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

            <iframe
                src="${pdfPath}"
                title="${certificateTitle}"
                loading="lazy"
            ></iframe>
        `;


        /* Add preview inside selected card */
        card.appendChild(preview);

        card.classList.add("is-open");

        openedCard = card;


        /* Close button */
        const closeButton =
            preview.querySelector(".certificate-preview-close");

        closeButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            closeCertificatePreview();

        });


        /* Move selected certificate into view */
        setTimeout(() => {

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    }


    /* =====================================================
       VIEW CERTIFICATE BUTTONS
    ===================================================== */

    viewButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const card = button.closest(".certificate-card");

            if (!card) return;

            openCertificatePreview(card, button);

        });

    });


    /* =====================================================
       CERTIFICATE FILTER
    ===================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.getAttribute("data-filter");


            /* Close currently opened certificate */
            closeCertificatePreview();


            /* Change active button */
            categoryButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            /* Show / hide cards */
            certificateCards.forEach(card => {

                const cardCategory =
                    card.getAttribute("data-category");


                if (
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "";

                    requestAnimationFrame(() => {
                        card.classList.remove("filter-hidden");
                    });

                } else {

                    card.classList.add("filter-hidden");

                    setTimeout(() => {

                        if (card.classList.contains("filter-hidden")) {
                            card.style.display = "none";
                        }

                    }, 250);

                }

            });

        });

    });


    /* =====================================================
       ESC KEY CLOSE
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeCertificatePreview();
        }

    });

});