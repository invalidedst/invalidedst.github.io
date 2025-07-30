// Дополнительные анимации и интерактивные эффекты
(function() {
    'use strict';

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

    // Эффект матрицы в фоне
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.1';
        
        document.body.insertBefore(canvas, document.body.firstChild);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const characters = '01AEZA💀🖤⚡🔥';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        const drops = Array(Math.floor(columns)).fill(1);
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#330000';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 100);
        
        // Обновление размеров при изменении окна
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Эффект курсора
    function createCursorEffect() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #ff4444, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        const trail = [];
        const trailLength = 5;

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
                const trailElement = document.querySelector(`#trail-${index}`);
                if (!trailElement) {
                    const newTrail = document.createElement('div');
                    newTrail.id = `trail-${index}`;
                    newTrail.style.cssText = `
                        position: fixed;
                        width: ${15 - index * 2}px;
                        height: ${15 - index * 2}px;
                        background: radial-gradient(circle, rgba(255, 68, 68, ${0.5 - index * 0.1}), transparent);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9998;
                    `;
                    document.body.appendChild(newTrail);
                }
                
                const currentTrail = document.querySelector(`#trail-${index}`);
                if (currentTrail) {
                    currentTrail.style.left = point.x - (15 - index * 2) / 2 + 'px';
                    currentTrail.style.top = point.y - (15 - index * 2) / 2 + 'px';
                }
            });
        });

        // Эффект клика
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 8; i++) {
                createClickParticle(e.clientX, e.clientY);
            }
        });
    }

    // Создание частиц при клике
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #ff4444;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const life = 1000 + Math.random() * 500;
        
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
            const newY = y + Math.sin(angle) * distance + (elapsed * 0.0005); // гравитация
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            particle.style.opacity = 1 - progress;
            particle.style.transform = `scale(${1 - progress * 0.5})`;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Эффект печатания для текста
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Эффект глитча для заголовка
    function glitchEffect() {
        const nameElement = document.querySelector('.profile-name');
        if (!nameElement) return;

        const originalText = nameElement.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        
        function glitch() {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            
            nameElement.textContent = glitchedText;
            
            setTimeout(() => {
                nameElement.innerHTML = originalText.split('').map(char => 
                    `<span class="blood-text">${char}</span>`
                ).join('');
            }, 150);
        }
        
        // Случайные глитчи
        setInterval(() => {
            if (Math.random() < 0.1) {
                glitch();
            }
        }, 3000);
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

    // Эффект паралллакса для фоновых элементов
    function parallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.blood-drops, .floating-hearts');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
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

    // CSS для эффекта дрожания
    const shakeStyles = document.createElement('style');
    shakeStyles.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .animate-in {
            animation-fill-mode: both;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(shakeStyles);

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
                // Эффект при клике
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 68, 68, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // CSS для ripple эффекта
        const rippleStyles = document.createElement('style');
        rippleStyles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
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
                if (Math.random() < 0.1) {
                    element.style.opacity = '0.3';
                    setTimeout(() => {
                        element.style.opacity = '1';
                    }, 100);
                }
            }, 1000);
        });
    }

    // Запуск всех эффектов после загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        // Небольшая задержка для загрузки всех элементов
        setTimeout(() => {
            createMatrixEffect();
            createCursorEffect();
            glitchEffect();
            scrollAnimations();
            parallaxEffect();
            interactiveSocialLinks();
            flickerEffect();
            
            console.log('🎨 Анимации активированы');
        }, 500);
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