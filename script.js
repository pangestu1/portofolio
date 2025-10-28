document.addEventListener('DOMContentLoaded', function() {
    const projectDetails = {
        shopbar: {
            title: 'ShopBar - Point of Sale System',
            overview: 'ShopBar provides an intuitive POS experience tailored for small to medium retail businesses with real-time inventory synchronization.',
            features: ['Product & Inventory Management', 'Sales Reporting & Analytics', 'Simple & Intuitive Interface'],
            techStack: ['Flutter', 'Node.js', 'MySQL'],
            gallery: [
                'assets/shopbar/photo_6298407636956810248_y.jpg',
                'assets/shopbar/photo_6298407636956810249_y.jpg',
                'assets/shopbar/photo_6298407636956810250_y.jpg',
                'assets/shopbar/photo_6298407636956810251_y.jpg',
                'assets/shopbar/photo_6298407636956810252_y.jpg',
                'assets/shopbar/photo_6298407636956810253_y.jpg',
                'assets/shopbar/photo_6298407636956810254_y.jpg',
                'assets/shopbar/photo_6298407636956810255_y.jpg',
                'assets/shopbar/photo_6298407636956810256_y.jpg',
                'assets/shopbar/photo_6298407636956810257_y.jpg'
            ]
        },
        ToDoSync: {
            title: 'TodoSync: A Cross-Platform Task Management Application',
            overview: 'TodoSync is a modern, multi-platform task management application designed for efficiency and consistency. Built with the Flutter framework using the Dart language, this project demonstrates the implementation of best practices in application development, including a proven architecture and the use of modern state management.',
            features: [
                'CRUD Task Management',
                'Local Offline Storage (Hive)',
                'Multi-Platform (Mobile & Desktop)',
                'Smart Notifications & Alarms',
                'Task Filtering & Sorting',
                'Quick Search',
                'Modern Material Design (M3)'
            ],
            techStack: ['Flutter', 'Dart'],
            gallery: [
                'assets/todosync/1.jpeg',
                'assets/todosync/2.jpg',
                'assets/todosync/3.jpg',
                'assets/todosync/4.jpg',
                'assets/todosync/6.jpg',
                'assets/todosync/6.jpg',    
            ]
        },
        todo: {
            title: 'ToDo - Productivity Dashboard',
            overview: 'ToDo centralizes task management, team collaboration, and analytics within a responsive, data-driven dashboard.',
            features: [
                'CRUD Task Management',
                'Local Offline Storage (Hive)',
                'Multi-Platform (Mobile & Desktop)',
                'Smart Notifications & Alarms',
                'Task Filtering & Sorting',
                'Quick Search',
                'Modern Material Design (M3)'
            ],
            techStack: ['Laravel', 'Vue.js', 'REST API'],
            gallery: [
                'https://picsum.photos/seed/todo1/300/600.jpg',
                'https://picsum.photos/seed/todo2/300/600.jpg',
                'https://picsum.photos/seed/todo3/300/600.jpg',
                'https://picsum.photos/seed/todo4/300/600.jpg',
                'https://picsum.photos/seed/todo5/300/600.jpg'
            ]
        }
    };

    const projectModal = document.getElementById('projectModal');
    const projectModalBody = document.getElementById('projectModalBody');
    const closeProjectModalButton = document.getElementById('closeProjectModal');
    const galleryLightbox = document.getElementById('galleryLightbox');
    const galleryLightboxImage = document.getElementById('galleryLightboxImage');

    function buildFeatureList(items = []) {
        return `
            <ul class="modal-features list-disc list-inside space-y-1">
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    }

    function buildTechBadgeList(tech = []) {
        return `
            <div class="flex flex-wrap gap-2 mt-3">
                ${tech.map(item => `<span class="tech-badge px-2 py-1 text-xs">${item}</span>`).join('')}
            </div>
        `;
    }

    // Image Slider Functionality
    function setupImageSlider(sliderId, prevBtnId, nextBtnId, indicatorsId) {
        const slider = document.getElementById(sliderId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const indicatorsContainer = document.getElementById(indicatorsId);
        
        if (!slider) return;
        
        const slides = slider.querySelectorAll('img');
        let currentSlide = 0;
        
        // Create indicators
        if (indicatorsContainer) {
            slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
        }
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            if (indicatorsContainer) {
                const indicators = indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    if (index === currentSlide) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }
        
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play
        const interval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(interval));
        slider.addEventListener('mouseleave', () => {
            clearInterval(interval);
            setInterval(nextSlide, 5000);
        });
        
        return {
            nextSlide,
            prevSlide,
            goToSlide
        };
    }
    
    // Setup all sliders
    const shopbarSlider = setupImageSlider('shopbarSlider', 'shopbarPrevBtn', 'shopbarNextBtn', 'shopbarIndicators');
    const todosyncSlider = setupImageSlider('todosyncSlider', 'todosyncPrevBtn', 'todosyncNextBtn', 'todosyncIndicators');
    const todoSlider = setupImageSlider('todoSlider', 'todoPrevBtn', 'todoNextBtn', 'todoIndicators');

    function openProjectModal(projectKey) {
        const details = projectDetails[projectKey];
        if (!details) {
            projectModalBody.innerHTML = `<p class="text-red-300">Details not available.</p>`;
        } else {
            projectModalBody.innerHTML = `
                <h3 class="text-2xl font-semibold text-cyan-400 mb-3">${details.title}</h3>
                <p class="text-gray-300 mb-4">${details.overview}</p>
                <h4 class="text-lg font-semibold text-cyan-300 mb-2">Key Features</h4>
                ${buildFeatureList(details.features)}
                <h4 class="text-lg font-semibold text-cyan-300 mt-4 mb-2">Tech Stack</h4>
                ${buildTechBadgeList(details.techStack)}
                ${details.gallery && details.gallery.length ? `
                    <h4 class="text-lg font-semibold text-cyan-300 mt-4 mb-2">Project Gallery</h4>
                    <div class="modal-gallery">
                        ${details.gallery.map((src, index) => `<button class="gallery-image-trigger" data-image="${src}" aria-label="View ${details.title} image ${index + 1}"><img src="${src}" alt="${details.title} preview ${index + 1}"></button>`).join('')}
                    </div>
                ` : ''}
            `;
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        projectModal.classList.remove('active');
        if (!galleryLightbox.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('.project-detail-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const projectKey = button.dataset.project;
            openProjectModal(projectKey);
        });
    });

    document.addEventListener('click', event => {
        const trigger = event.target.closest('.gallery-image-trigger');
        if (trigger) {
            const imageSrc = trigger.dataset.image;
            if (imageSrc) {
                galleryLightboxImage.src = imageSrc;
                galleryLightbox.classList.add('active');
                galleryLightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    closeProjectModalButton.addEventListener('click', closeProjectModal);

    projectModal.addEventListener('click', event => {
        if (event.target === projectModal) {
            closeProjectModal();
        }
    });

    galleryLightbox.addEventListener('click', event => {
        if (event.target === galleryLightbox || event.target === galleryLightboxImage) {
            galleryLightbox.classList.remove('active');
            galleryLightbox.setAttribute('aria-hidden', 'true');
            galleryLightboxImage.src = '';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            if (galleryLightbox.classList.contains('active')) {
                galleryLightbox.classList.remove('active');
                galleryLightbox.setAttribute('aria-hidden', 'true');
                galleryLightboxImage.src = '';
                document.body.style.overflow = '';
            } else if (projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        }
    });

    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;

        particlesContainer.appendChild(particle);
    }

    const fadeElements = document.querySelectorAll('.fade-element');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.5, 1]
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const rect = entry.boundingClientRect;

            if (entry.isIntersecting) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';

                if (element.classList.contains('skill-item')) {
                    const progressFill = element.querySelector('.progress-fill');
                    const percent = element.dataset.percent;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.width = percent + '%';
                    }, 200);
                }
            } else {
                if (rect.top > 0) {
                    element.style.opacity = 0;
                    element.style.transform = 'translateY(30px)';
                } else {
                    element.style.opacity = 0;
                    element.style.transform = 'translateY(-30px)';
                }
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    const sections = document.querySelectorAll('section > div, section > h2, section > p');
    sections.forEach(el => {
        if (!el.closest('#hero')) {
            el.classList.add('fade-element');
        }
    });

    document.querySelectorAll('.project-card').forEach(el => el.classList.add('fade-element'));
    document.querySelectorAll('.skill-item').forEach(el => el.classList.add('fade-element'));

    document.querySelectorAll('.fade-element').forEach(el => {
        fadeObserver.observe(el);
    });
});