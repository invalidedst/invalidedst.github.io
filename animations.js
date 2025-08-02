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
                

                
                // Закрываем меню
                themeMenu.classList.remove('open');
            });
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
                font-weight: bold;
                text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
                opacity: 0.3;
                transform: rotate(${Math.random() * 360}deg);
                animation: flySwastika ${duration}s linear infinite;
                animation-delay: ${delay}s;
                left: ${startX}px;
                top: ${startY}px;
            `;
            
            swastikasContainer.appendChild(swastika);
        }
    }

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

    // Оптимизированное создание снежинок
    function createDynamicSnowflakes() {
        const snowflakesContainer = document.getElementById('snowflakes');
        if (!snowflakesContainer) return;
        
        // Очищаем существующие снежинки
        snowflakesContainer.innerHTML = '';
        
        // Создаем только 15 снежинок для оптимизации
        for (let i = 0; i < 15; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            // Простые символы
            const currentTheme = document.body.getAttribute('data-theme');
            snowflake.innerHTML = currentTheme === 'red' ? '❄' : '💖';
            
            // Простые параметры
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.top = Math.random() * 100 + 'vh';
            snowflake.style.animationDelay = Math.random() * 10 + 's';
            snowflake.style.animationDuration = (8 + Math.random() * 12) + 's';
            snowflake.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
            snowflake.style.opacity = 0.6 + Math.random() * 0.4;
            
            snowflakesContainer.appendChild(snowflake);
        }
    }

    // Запуск всех эффектов после загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        // Инициализируем переключатель тем
        initThemeSwitcher();
        
        // Создаем динамические снежинки
        createDynamicSnowflakes();
        
        // Создаем летающие свастики
        createFlyingSwastikas();
        
        console.log('❄️ Сайт загружен и оптимизирован');
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