// Дополнительные анимации и интерактивные эффекты
(function() {
    'use strict';

    // Экран загрузки
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        // Скрываем экран загрузки через 2 секунды
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Показываем основной контент с плавной анимацией
            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s ease-in-out';
                mainContent.style.opacity = '1';
                
                // Добавляем анимации появления для элементов
                animateElements();
            }, 500);
        }, 2000);
    }

    // Анимация появления элементов
    function animateElements() {
        const elements = [
            '.profile-header',
            '.social-links:nth-child(1)',
            '.social-links:nth-child(2)',
            '.bio-section'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.classList.add('animate');
                }, index * 200);
            }
        });
    }

    // Создание летающих свастик
    function createFlyingSwastikas() {
        // Создаем контейнер для свастик, если его нет
        let swastikasContainer = document.getElementById('flying-swastikas');
        if (!swastikasContainer) {
            swastikasContainer = document.createElement('div');
            swastikasContainer.id = 'flying-swastikas';
            swastikasContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                overflow: hidden;
            `;
            document.body.appendChild(swastikasContainer);
        }
        
        // Очищаем существующие свастики
        swastikasContainer.innerHTML = '';
        
        // Создаем 8 летающих свастик
        for (let i = 0; i < 8; i++) {
            const swastika = document.createElement('div');
            swastika.className = 'flying-swastika';
            swastika.innerHTML = '卐';
            
            // Случайные параметры
            const size = 20 + Math.random() * 40; // 20-60px
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const duration = 15 + Math.random() * 20; // 15-35 секунд
            const delay = Math.random() * 10; // 0-10 секунд задержки
            
            swastika.style.cssText = `
                position: absolute;
                color: #ff0000;
                font-size: ${size}px;
                left: ${startX}px;
                top: ${startY}px;
                animation: flySwastika ${duration}s linear infinite;
                animation-delay: ${delay}s;
                opacity: 0.3;
                text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
                pointer-events: none;
                user-select: none;
            `;
            
            swastikasContainer.appendChild(swastika);
        }
    }

    // Создание динамических снежинок
    function createDynamicSnowflakes() {
        const snowflakesContainer = document.getElementById('snowflakes');
        if (!snowflakesContainer) return;
        
        // Очищаем существующие снежинки
        snowflakesContainer.innerHTML = '';
        
        // Создаем 50 снежинок
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            
            // Случайные параметры
            const size = 8 + Math.random() * 12; // 8-20px
            const startX = Math.random() * window.innerWidth;
            const duration = 8 + Math.random() * 12; // 8-20 секунд
            const delay = Math.random() * 5; // 0-5 секунд задержки
            
            snowflake.style.cssText = `
                position: absolute;
                left: ${startX}px;
                top: -20px;
                font-size: ${size}px;
                animation: snowfall ${duration}s linear infinite;
                animation-delay: ${delay}s;
                pointer-events: none;
                user-select: none;
            `;
            
            snowflakesContainer.appendChild(snowflake);
        }
    }

    // Интерактивные эффекты для ссылок
    function initInteractiveEffects() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateY(-2px)';
                this.style.boxShadow = '0 10px 30px rgba(255, 68, 68, 0.4)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(255, 68, 68, 0.2)';
            });
            
            link.addEventListener('click', function(e) {
                // Создаем эффект клика
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 68, 68, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Добавляем CSS для ripple эффекта
    function addRippleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Инициализация всех функций
    function init() {
        // Добавляем стили для ripple эффекта
        addRippleStyles();
        
        // Инициализируем экран загрузки
        initLoadingScreen();
        
        // Создаем анимированные элементы
        createFlyingSwastikas();
        createDynamicSnowflakes();
        
        // Инициализируем интерактивные эффекты после загрузки
        setTimeout(() => {
            initInteractiveEffects();
        }, 3000);
        
        // Обновляем снежинки при изменении размера окна
        window.addEventListener('resize', () => {
            createDynamicSnowflakes();
            createFlyingSwastikas();
        });
    }

    // Запускаем инициализацию после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();