// Дополнительные анимации и интерактивные эффекты + переключение тем
(function() {
    'use strict';

    // Переключение тем
    function initThemeSwitcher() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeMenu = document.querySelector('.theme-menu');
        const themeButtons = document.querySelectorAll('.theme-btn');
        const body = document.body;
        
        // Загружаем сохраненную тему
        const savedTheme = localStorage.getItem('bioTheme') || 'red';
        body.setAttribute('data-theme', savedTheme);
        
        // Обновляем активную кнопку
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === savedTheme) {
                btn.classList.add('active');
            }
        });
        
        // Обработчик для кнопки открытия/закрытия меню
        themeToggle.addEventListener('click', () => {
            themeMenu.classList.toggle('open');
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-switcher')) {
                themeMenu.classList.remove('open');
            }
        });
        
        // Добавляем обработчики событий для кнопок тем
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.dataset.theme;
                
                // Убираем активный класс у всех кнопок
                themeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем активный класс к выбранной кнопке
                button.classList.add('active');
                
                // Плавный переход
                body.style.transition = 'all 0.5s ease';
                body.setAttribute('data-theme', theme);
                
                // Сохраняем тему
                localStorage.setItem('bioTheme', theme);
                
                // Анимация при переключении
                createThemeChangeEffect();
                
                // Закрываем меню
                themeMenu.classList.remove('open');
            });
        });
    }

    // Эффект при смене темы
    function createThemeChangeEffect() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createColorBurst();
            }, i * 50);
        }
    }

    function createColorBurst() {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: colorBurst 1s ease-out forwards;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 1000);
    }

    // CSS для эффекта смены темы
    const burstStyles = document.createElement('style');
    burstStyles.textContent = `
        @keyframes colorBurst {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(2);
                opacity: 0.8;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(burstStyles);

    // Установка текущей даты
    document.addEventListener('DOMContentLoaded', function() {
        const currentDateElement = document.getElementById('current-date');
        if (currentDateElement) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);
        }
    });

    // Улучшенный эффект матрицы в фоне
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.05';
        
        document.body.insertBefore(canvas, document.body.firstChild);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const characters = 'AEZA01♦♠♣♥◊◈∞Ω';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        
        const drops = Array(Math.floor(columns)).fill(1);
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Получаем текущий цвет темы
            const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color').trim();
            ctx.fillStyle = primaryColor || '#ff4444';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 120);
        
        // Обновление размеров при изменении окна
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Улучшенный эффект курсора
    function createCursorEffect() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        const trail = [];
        const trailLength = 8;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';

            // Создаем след
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (trail.length > trailLength) {
                trail.shift();
            }

            // Обновляем след
            trail.forEach((point, index) => {
                let trailElement = document.querySelector(`#trail-${index}`);
                if (!trailElement) {
                    trailElement = document.createElement('div');
                    trailElement.id = `trail-${index}`;
                    trailElement.style.cssText = `
                        position: fixed;
                        width: ${18 - index * 2}px;
                        height: ${18 - index * 2}px;
                        background: radial-gradient(circle, var(--accent-color), transparent);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9998;
                        opacity: ${0.6 - index * 0.08};
                    `;
                    document.body.appendChild(trailElement);
                }
                
                trailElement.style.left = point.x - (18 - index * 2) / 2 + 'px';
                trailElement.style.top = point.y - (18 - index * 2) / 2 + 'px';
            });
        });

        // Эффект клика с цветом текущей темы
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 12; i++) {
                createClickParticle(e.clientX, e.clientY);
            }
        });
    }

    // Создание частиц при клике с динамическим цветом
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 10px var(--primary-color);
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 4;
        const life = 1200 + Math.random() * 800;
        
        let startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const distance = velocity * elapsed * 0.01;
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance + (elapsed * 0.0003); // гравитация
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            particle.style.opacity = 1 - progress;
            particle.style.transform = `scale(${1 - progress * 0.3})`;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Эффект глитча для заголовка с учетом темы
    function glitchEffect() {
        const nameElement = document.querySelector('.profile-name');
        if (!nameElement) return;

        const originalHTML = nameElement.innerHTML;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        
        function glitch() {
            const spans = nameElement.querySelectorAll('.blood-text');
            let glitchedHTML = '';
            
            spans.forEach(span => {
                if (Math.random() < 0.15) {
                    const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    glitchedHTML += `<span class="blood-text">${randomChar}</span>`;
                } else {
                    glitchedHTML += span.outerHTML;
                }
            });
            
            nameElement.innerHTML = glitchedHTML;
            
            setTimeout(() => {
                nameElement.innerHTML = originalHTML;
            }, 200);
        }
        
        // Случайные глитчи
        setInterval(() => {
            if (Math.random() < 0.08) {
                glitch();
            }
        }, 4000);
    }

    // Анимация при скролле
    function scrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами
        document.querySelectorAll('.social-link, .bio-card, .detail-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Эффект параллакса для фоновых элементов
    function parallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.snowflakes, .floating-particles, .geometric-shapes');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + index * 0.1;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Эффект дрожания для важных элементов
    function shakeEffect(element, duration = 300) {
        element.style.animation = `shake ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // CSS для дополнительных эффектов
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px) rotate(-1deg); }
            75% { transform: translateX(3px) rotate(1deg); }
        }
        
        .animate-in {
            animation: fadeInScale 0.6s ease-out both;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .theme-switcher .theme-btn:hover {
            animation: themeHover 0.3s ease-in-out;
        }

        @keyframes themeHover {
            0%, 100% { transform: scale(1.2); }
            50% { transform: scale(1.4) rotate(10deg); }
        }
    `;
    document.head.appendChild(additionalStyles);

    // Интерактивность для социальных ссылок
    function interactiveSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.02)';
                shakeEffect(this.querySelector('.link-icon'), 200);
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
            
            link.addEventListener('click', function(e) {
                // Ripple эффект с цветом темы
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: var(--primary-color);
                    opacity: 0.3;
                    transform: scale(0);
                    animation: ripple 0.8s ease-out;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.5;
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 800);
            });
        });
        
        // CSS для ripple эффекта
        const rippleStyles = document.createElement('style');
        rippleStyles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
    }

    // Эффект мерцания для важных элементов
    function flickerEffect() {
        const flickerElements = document.querySelectorAll('.warning-text, .license-warning');
        
        flickerElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.08) {
                    element.style.opacity = '0.4';
                    setTimeout(() => {
                        element.style.opacity = '1';
                    }, 150);
                }
            }, 2000);
        });
    }

    // Фоновая музыка (убираем автовоспроизведение)
    function initBackgroundMusic() {
        const audio = document.getElementById('backgroundMusic');
        if (audio) {
            audio.volume = 0.2; // Тихая фоновая музыка
            
            // Запускаем музыку только при клике пользователя
            document.addEventListener('click', function startMusic() {
                audio.play().catch(e => console.log('Не удалось запустить музыку'));
                document.removeEventListener('click', startMusic);
            }, { once: true });
        }
    }

    // Скример при клике на аватарку
    function initScreamer() {
        const avatar = document.querySelector('.avatar-border');
        const screamerOverlay = document.getElementById('screamerOverlay');
        const screamerImage = document.getElementById('screamerImage');
        const screamerSound = document.getElementById('screamerSound');
        
        if (!avatar || !screamerOverlay) return;
        
        let screamerActivated = false;
        
        avatar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (screamerActivated) return; // Предотвращаем повторное срабатывание
            screamerActivated = true;
            
            // Добавляем курсор ожидания
            avatar.style.cursor = 'wait';
            
            // Задержка перед скримером (2-3 секунды)
            setTimeout(() => {
                // Показываем черный экран
                screamerOverlay.style.display = 'block';
                
                // Еще одна задержка
                setTimeout(() => {
                    // Резко появляется страшное лицо
                    screamerImage.style.transform = 'translate(-50%, -50%) scale(1.2)';
                    
                    // Запускаем громкий звук
                    if (screamerSound) {
                        screamerSound.volume = 1.0; // Максимальная громкость
                        screamerSound.play().catch(e => console.log('Звук заблокирован'));
                    }
                    
                    // Эффект тряски экрана
                    document.body.style.animation = 'screamerShake 0.5s ease-in-out infinite';
                    
                    // Закрываем скример через 3 секунды
                    setTimeout(() => {
                        screamerOverlay.style.display = 'none';
                        screamerImage.style.transform = 'translate(-50%, -50%) scale(0)';
                        document.body.style.animation = '';
                        avatar.style.cursor = 'pointer';
                        
                        // Можно активировать снова через 10 секунд
                        setTimeout(() => {
                            screamerActivated = false;
                        }, 10000);
                        
                    }, 3000);
                    
                }, 500); // Короткая задержка на черном экране
                
            }, 2500); // Основная задержка перед скримером
        });
    }

    // CSS анимации для скримера
    const screamerStyles = document.createElement('style');
    screamerStyles.textContent = `
        @keyframes screamerShake {
            0%, 100% { transform: translateX(0) translateY(0); }
            10% { transform: translateX(-10px) translateY(-10px); }
            20% { transform: translateX(10px) translateY(-10px); }
            30% { transform: translateX(-10px) translateY(10px); }
            40% { transform: translateX(10px) translateY(10px); }
            50% { transform: translateX(-10px) translateY(-10px); }
            60% { transform: translateX(10px) translateY(-10px); }
            70% { transform: translateX(-10px) translateY(10px); }
            80% { transform: translateX(10px) translateY(10px); }
            90% { transform: translateX(-10px) translateY(-10px); }
        }
        
        #screamerOverlay {
            animation: screamerFlash 0.08s ease-in-out infinite;
        }
        
        @keyframes screamerFlash {
            0%, 100% { background: #000; }
            25% { background: #ff0000; }
            50% { background: #000; }
            75% { background: #ffffff; }
        }
        
        @keyframes screamerEyesBlink {
            0%, 50% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.3) rotate(10deg); }
            75% { transform: scale(0.8) rotate(-10deg); }
            100% { transform: scale(1.1) rotate(5deg); }
        }
        
        @keyframes screamerTextShake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-5px) rotate(-2deg); }
            50% { transform: translateX(5px) rotate(2deg); }
            75% { transform: translateX(-3px) rotate(-1deg); }
        }
        
        .avatar-border {
            cursor: pointer !important;
            transition: all 0.3s ease;
        }
        
        .avatar-border:hover {
            animation: avatarPulse 1s ease-in-out infinite;
            transform: scale(1.1);
        }
        
        @keyframes avatarPulse {
            0%, 100% { 
                box-shadow: 0 0 30px var(--secondary-color);
                filter: brightness(1);
            }
            50% { 
                box-shadow: 0 0 60px #ff0000, 0 0 90px #ff0000;
                filter: brightness(1.2);
            }
        }
    `;
    document.head.appendChild(screamerStyles);

    // Упрощенное создание снежинок
    function createSimpleSnowflakes() {
        const snowflakesContainer = document.querySelector('.snowflakes');
        if (!snowflakesContainer) return;
        
        // Очищаем существующие снежинки
        snowflakesContainer.innerHTML = '';
        
        // Создаем только 8 снежинок для оптимизации
        for (let i = 0; i < 8; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '<i class="fas fa-snowflake"></i>';
            
            // Фиксированные позиции
            snowflake.style.left = (i * 12.5) + '%';
            snowflake.style.animationDelay = (i * 1) + 's';
            
            snowflakesContainer.appendChild(snowflake);
        }
    }

    // Запуск всех эффектов после загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        // Инициализируем переключатель тем
        initThemeSwitcher();
        
        // Инициализируем фоновую музыку
        initBackgroundMusic();
        
        // Инициализируем скример
        initScreamer();
        
        // Создаем упрощенные снежинки
        createSimpleSnowflakes();
        
        // Убираем тяжелые эффекты для оптимизации
        setTimeout(() => {
            // Только самые необходимые эффекты
            interactiveSocialLinks();
            
            console.log('🎨 Сайт с скримером загружен');
            console.log('💀 Кликните на аватар... если осмелитесь');
        }, 100);
    });

    // Эффект загрузки страницы
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

})();