// Защита от копипастинга и других нежелательных действий
(function() {
    'use strict';

    // Отключение контекстного меню
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showWarning('Правый клик отключен!');
        return false;
    });

    // Отключение выделения текста
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Отключение перетаскивания
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Защита от горячих клавиш
    document.addEventListener('keydown', function(e) {
        // Блокировка F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'u') ||
            (e.ctrlKey && e.key === 's') ||
            (e.ctrlKey && e.key === 'a') ||
            (e.ctrlKey && e.key === 'c') ||
            (e.ctrlKey && e.key === 'v') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            e.key === 'F5' ||
            (e.ctrlKey && e.key === 'r')) {
            
            e.preventDefault();
            showWarning('Данное действие запрещено!');
            return false;
        }
    });

    // Функция показа предупреждения
    function showWarning(message) {
        // Создаем элемент предупреждения
        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #1a0000, #330000);
                color: #ff4444;
                padding: 2rem;
                border: 3px solid #cc0000;
                border-radius: 15px;
                z-index: 10000;
                box-shadow: 0 0 50px #cc0000;
                text-align: center;
                font-family: 'Metal Mania', cursive;
                font-size: 1.2rem;
                animation: warningPulse 0.5s ease-in-out;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🚫</div>
                <div>${message}</div>
                <div style="margin-top: 1rem; font-size: 0.9rem; color: #ff8888;">
                    Это действие отслеживается и может быть передано администратору
                </div>
            </div>
        `;
        
        document.body.appendChild(warning);
        
        // Удаляем предупреждение через 3 секунды
        setTimeout(() => {
            if (warning.parentNode) {
                warning.parentNode.removeChild(warning);
            }
        }, 3000);
    }

    // Добавляем стили для анимации предупреждения
    const style = document.createElement('style');
    style.textContent = `
        @keyframes warningPulse {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Защита от инспектора элементов
    let devtools = {
        open: false,
        orientation: null
    };

    const threshold = 160;

    setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                showProtectionOverlay();
            }
        } else {
            if (devtools.open) {
                devtools.open = false;
                hideProtectionOverlay();
            }
        }
    }, 500);

    // Показать экран блокировки
    function showProtectionOverlay() {
        const overlay = document.getElementById('protection-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 2rem;">💀</div>
                <div style="font-family: 'Nosifer', cursive; font-size: 3rem; margin-bottom: 1rem;">
                    ДОСТУП ЗАПРЕЩЕН
                </div>
                <div style="font-size: 1.5rem; margin-bottom: 2rem;">
                    Обнаружена попытка просмотра исходного кода
                </div>
                <div style="font-size: 1rem; color: #ff8888;">
                    Закройте инструменты разработчика для продолжения
                </div>
            `;
        }
    }

    // Скрыть экран блокировки
    function hideProtectionOverlay() {
        const overlay = document.getElementById('protection-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    // Защита от копирования через CSS
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.body.style.userSelect = 'none';

    // Блокировка печати
    window.addEventListener('beforeprint', function(e) {
        e.preventDefault();
        showWarning('Печать запрещена!');
        return false;
    });

    // Защита от сохранения страницы
    window.addEventListener('beforeunload', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });

    // Детектор ботов и автоматических скриптов (облегченная версия)
    function detectBot() {
        // Проверяем на наличие автоматизации (только явные боты)
        if (navigator.webdriver === true) {
            console.warn('Обнаружен WebDriver');
            document.body.innerHTML = '<div style="color: red; text-align: center; font-size: 2rem; margin-top: 50vh;">🤖 ДОСТУП ДЛЯ БОТОВ ЗАПРЕЩЕН</div>';
            return;
        }

        // Убираем проверку скорости выполнения - слишком много ложных срабатываний
        // Современные браузеры и быстрые компьютеры могут выполнять код очень быстро

        // Проверяем размер экрана (только экстремально маленькие размеры)
        if (screen.width < 50 || screen.height < 50) {
            console.warn('Подозрительный размер экрана');
            document.body.innerHTML = '<div style="color: red; text-align: center; font-size: 2rem; margin-top: 50vh;">📱 НЕКОРРЕКТНЫЙ РАЗМЕР ЭКРАНА</div>';
            return;
        }
    }

    // Запускаем детектор ботов только один раз при загрузке
    detectBot();

    // Убираем периодическую проверку - она создавала ложные срабатывания

    // Защита от iframe
    if (window.top !== window.self) {
        document.body.innerHTML = '<div style="color: red; text-align: center; font-size: 2rem; margin-top: 50vh;">🚫 ВСТРАИВАНИЕ В IFRAME ЗАПРЕЩЕНО</div>';
    }

    // Мониторинг фокуса окна (смягченная версия)
    let windowFocused = true;
    let suspiciousActivity = 0;
    let lastBlurTime = 0;

    window.addEventListener('focus', () => {
        windowFocused = true;
        // Сбрасываем счетчик при возвращении фокуса
        if (Date.now() - lastBlurTime > 30000) { // 30 секунд
            suspiciousActivity = 0;
        }
    });

    window.addEventListener('blur', () => {
        windowFocused = false;
        lastBlurTime = Date.now();
        suspiciousActivity++;
        
        // Увеличиваем порог до 15 и добавляем временную задержку
        if (suspiciousActivity > 15) {
            setTimeout(() => {
                if (suspiciousActivity > 15) {
                    showWarning('Множественные переключения окон. Возможна подозрительная активность.');
                }
            }, 5000); // Задержка 5 секунд
        }
    });

    // Детектор скриншотов (более мягкая версия)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            suspiciousActivity++;
            // Увеличиваем порог и добавляем задержку
            if (suspiciousActivity > 20) {
                setTimeout(() => {
                    if (suspiciousActivity > 20) {
                        console.warn('Возможная попытка создания скриншота');
                        // Убираем показ предупреждения, только логируем
                    }
                }, 3000);
            }
        }
    });

    // Защита от изменения DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Проверяем на подозрительные элементы
                        if (node.tagName === 'SCRIPT' && !node.src.includes('protection.js') && !node.src.includes('animations.js')) {
                            node.remove();
                            showWarning('Обнаружена попытка внедрения скрипта!');
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Защита от изменения стилей
    const originalStyle = document.body.style.cssText;
    setInterval(() => {
        if (document.body.style.cssText !== originalStyle) {
            showWarning('Обнаружена попытка изменения стилей!');
        }
    }, 1000);

    // Логирование попыток нарушения
    function logViolation(type, details) {
        console.warn(`🚫 НАРУШЕНИЕ БЕЗОПАСНОСТИ: ${type}`, details);
        
        // Здесь можно добавить отправку данных на сервер для логирования
        // fetch('/api/security-violation', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ type, details, timestamp: Date.now() })
        // });
    }

    // Создание уникального отпечатка пользователя
    function createFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Aeza Bio Protection 🔒', 2, 2);
        
        return {
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            platform: navigator.platform,
            canvas: canvas.toDataURL(),
            userAgent: navigator.userAgent.slice(0, 100) // Ограничиваем длину
        };
    }

    // Сохраняем отпечаток
    const fingerprint = createFingerprint();
    sessionStorage.setItem('bioFingerprint', JSON.stringify(fingerprint));

    console.log('🔒 Система защиты активирована');
    console.log('⚠️  Любые попытки обхода защиты отслеживаются');
    console.log('📧 По вопросам обращайтесь: @ubuntu32');

})();