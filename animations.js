// Дополнительные анимации и интерактивные эффекты
(function() {
    'use strict';

    // Переменные для оптимизации
    let resizeTimeout;
    let isAnimating = false;

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
        if (isAnimating) return;
        isAnimating = true;

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

        setTimeout(() => {
            isAnimating = false;
        }, elements.length * 200 + 800);
    }

    // Создание летающих свастик (оптимизировано)
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
        
        // Создаем 6 летающих свастик (увеличено с 4)
        for (let i = 0; i < 6; i++) {
            const swastika = document.createElement('div');
            swastika.className = 'flying-swastika';
            swastika.innerHTML = '卐';
            
            // Случайные параметры
            const size = 20 + Math.random() * 40; // 20-60px
            const startX = Math.random() * window.innerWidth;
            const startY = -50; // Начинаем выше экрана
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
                will-change: transform;
            `;
            
            swastikasContainer.appendChild(swastika);
        }
    }

    // Создание динамических снежинок (оптимизировано)
    function createDynamicSnowflakes() {
        const snowflakesContainer = document.getElementById('snowflakes');
        if (!snowflakesContainer) return;
        
        // Очищаем существующие снежинки
        snowflakesContainer.innerHTML = '';
        
        // Создаем 30 снежинок для постоянного падения
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            
            // Случайные параметры для постоянного падения
            const size = 8 + Math.random() * 15; // 8-23px
            const startX = Math.random() * window.innerWidth;
            const duration = 8 + Math.random() * 12; // 8-20 секунд
            const delay = Math.random() * 8; // 0-8 секунд задержки
            
            snowflake.style.cssText = `
                position: absolute;
                left: ${startX}px;
                top: -30px;
                font-size: ${size}px;
                animation: snowfall ${duration}s linear infinite;
                animation-delay: ${delay}s;
                pointer-events: none;
                user-select: none;
                will-change: transform;
            `;
            
            snowflakesContainer.appendChild(snowflake);
        }
    }

    // Интерактивные эффекты для ссылок (оптимизировано)
    function initInteractiveEffects() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            // Используем CSS transitions вместо JavaScript для лучшей производительности
            link.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.03) translateY(-1px)';
                this.style.boxShadow = '0 8px 25px rgba(255, 68, 68, 0.3)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(255, 68, 68, 0.2)';
            });
            
            link.addEventListener('click', function(e) {
                // Упрощенный эффект клика
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 68, 68, 0.4);
                    transform: scale(0);
                    animation: ripple 0.4s ease-out;
                    pointer-events: none;
                    will-change: transform, opacity;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 0.8;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 400);
            });
        });
    }

    // Добавляем CSS для ripple эффекта (оптимизировано)
    function addRippleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Оптимизированные анимации для слабых устройств
    function createOptimizedAnimations() {
        const snowflakesContainer = document.getElementById('snowflakes');
        if (snowflakesContainer) {
            snowflakesContainer.innerHTML = '';
            
            // Создаем 15 снежинок для слабых устройств
            for (let i = 0; i < 15; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.innerHTML = '❄';
                
                const size = 10 + Math.random() * 10; // 10-20px
                const startX = Math.random() * window.innerWidth;
                const duration = 12 + Math.random() * 8; // 12-20 секунд
                const delay = Math.random() * 5; // 0-5 секунд задержки
                
                snowflake.style.cssText = `
                    position: absolute;
                    left: ${startX}px;
                    top: -30px;
                    font-size: ${size}px;
                    animation: snowfall ${duration}s linear infinite;
                    animation-delay: ${delay}s;
                    pointer-events: none;
                    user-select: none;
                    will-change: transform;
                `;
                
                snowflakesContainer.appendChild(snowflake);
            }
        }
        
        // Создаем 3 свастики для слабых устройств
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
        
        swastikasContainer.innerHTML = '';
        
        for (let i = 0; i < 3; i++) {
            const swastika = document.createElement('div');
            swastika.className = 'flying-swastika';
            swastika.innerHTML = '卐';
            
            const size = 25 + Math.random() * 25; // 25-50px
            const startX = Math.random() * window.innerWidth;
            const startY = -50;
            const duration = 20 + Math.random() * 15; // 20-35 секунд
            const delay = Math.random() * 8; // 0-8 секунд задержки
            
            swastika.style.cssText = `
                position: absolute;
                color: #666666;
                font-size: ${size}px;
                left: ${startX}px;
                top: ${startY}px;
                animation: flySwastika ${duration}s linear infinite;
                animation-delay: ${delay}s;
                opacity: 0.15;
                text-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
                pointer-events: none;
                user-select: none;
                will-change: transform;
            `;
            
            swastikasContainer.appendChild(swastika);
        }
    }

    // Throttled resize handler
    function handleResize() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(() => {
            const performance = checkDevicePerformance();
            if (!performance.shouldReduceAnimations) {
                createDynamicSnowflakes();
                createFlyingSwastikas();
            } else {
                createOptimizedAnimations();
            }
        }, 250);
    }

    // Проверка производительности устройства
    function checkDevicePerformance() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
        
        return {
            isMobile,
            isLowEnd,
            shouldReduceAnimations: isMobile || isLowEnd
        };
    }

    // Анимация статистик
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 секунды
            const step = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Инициализация всех функций
    function init() {
        const performance = checkDevicePerformance();
        
        // Добавляем стили для ripple эффекта
        addRippleStyles();
        
        // Инициализируем экран загрузки
        initLoadingScreen();
        
        // Создаем анимированные элементы (с учетом производительности)
        if (!performance.shouldReduceAnimations) {
            createFlyingSwastikas();
            createDynamicSnowflakes();
        } else {
            // Для слабых устройств создаем меньше элементов
            createOptimizedAnimations();
        }
        
        // Инициализируем интерактивные эффекты после загрузки
        setTimeout(() => {
            initInteractiveEffects();
            animateStats(); // Запускаем анимацию статистик
        }, 3000);
        
        // Оптимизированный обработчик resize
        window.addEventListener('resize', handleResize);
    }

    // Запускаем инициализацию после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();