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
        const savedTheme = localStorage.getItem('bioTheme') || 'winter';
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
            snowflake.innerHTML = currentTheme === 'winter' ? '❄' : '✧';
            
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