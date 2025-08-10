// 🔒 ЗАЩИТА ОТ КРАЖИ КОДА - AEZA BIO
// Автор: RAZE/AEZA
// Версия: 2.0
// Дата: 2024

(function() {
    'use strict';
    
    // 🔐 Основные настройки защиты
    const PROTECTION_CONFIG = {
        author: 'RAZE',
        version: '2.0',
        domain: window.location.hostname,
        timestamp: Date.now(),
        checks: {
            devTools: true,
            rightClick: true,
            copyPaste: true,
            viewSource: true,
            console: true,
            inspect: true
        }
    };

    // 🛡️ Функция логирования попыток взлома
    function logAttempt(type, details) {
        const logData = {
            type: type,
            details: details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer
        };
        
        // Отправка данных на сервер (если есть)
        if (typeof window.reportAttack === 'function') {
            window.reportAttack(logData);
        }
        
        // Локальное логирование
        console.warn('🚨 Попытка нарушения защиты:', logData);
    }

    // 🔍 Проверка DevTools
    function checkDevTools() {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            logAttempt('devtools', { widthThreshold, heightThreshold });
            document.body.innerHTML = '<div style="text-align:center;padding:50px;color:#ff4444;font-family:monospace;"><h1>🚨 ДОСТУП ЗАБЛОКИРОВАН</h1><p>Обнаружены инструменты разработчика</p></div>';
            return false;
        }
        return true;
    }

    // 🖱️ Блокировка правого клика (уже включена в антипастинг)
    function blockRightClick() {
        // Функция оставлена для совместимости, но логика перенесена в blockCopyPaste
        return true;
    }

    // 📋 Блокировка копирования и антипастинг
    function blockCopyPaste() {
        // Блокировка копирования
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            logAttempt('copy', { selection: window.getSelection().toString() });
            return false;
        });
        
        document.addEventListener('cut', function(e) {
            e.preventDefault();
            logAttempt('cut', {});
            return false;
        });
        
        // Антипастинг - блокировка вставки
        document.addEventListener('paste', function(e) {
            e.preventDefault();
            logAttempt('paste', {});
            return false;
        });
        
        // Дополнительная защита от вставки через input/textarea
        document.addEventListener('paste', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                e.preventDefault();
                logAttempt('paste_input', { target: e.target.tagName });
                return false;
            }
        });
        
        // Блокировка drag & drop
        document.addEventListener('drop', function(e) {
            e.preventDefault();
            logAttempt('drop', {});
            return false;
        });
        
        // Блокировка выделения текста
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            logAttempt('select', {});
            return false;
        });
        
        // Блокировка выделения через CSS
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
        
        // Блокировка контекстного меню для всех элементов
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            logAttempt('contextmenu', { target: e.target.tagName });
            return false;
        });
    }

    // 🔍 Блокировка просмотра исходного кода
    function blockViewSource() {
        document.addEventListener('keydown', function(e) {
            // Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            if (
                (e.ctrlKey && e.key === 'u') ||
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C')
            ) {
                e.preventDefault();
                logAttempt('viewsource', { key: e.key, ctrl: e.ctrlKey, shift: e.shiftKey });
                return false;
            }
        });
    }

    // 🚫 Блокировка консоли
    function blockConsole() {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = function(...args) {
            logAttempt('console_log', { args: args });
            return originalLog.apply(console, args);
        };
        
        console.warn = function(...args) {
            logAttempt('console_warn', { args: args });
            return originalWarn.apply(console, args);
        };
        
        console.error = function(...args) {
            logAttempt('console_error', { args: args });
            return originalError.apply(console, args);
        };
    }

    // 🔍 Проверка инспектирования элементов
    function checkInspect() {
        let devtools = { open: false, orientation: null };
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
                if (!devtools.open) {
                    devtools.open = true;
                    logAttempt('inspect', { orientation: devtools.orientation });
                    document.body.innerHTML = '<div style="text-align:center;padding:50px;color:#ff4444;font-family:monospace;"><h1>🚨 ДОСТУП ЗАБЛОКИРОВАН</h1><p>Обнаружено инспектирование элементов</p></div>';
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }

    // 🛡️ Дополнительные проверки
    function additionalChecks() {
        // Проверка на iframe
        if (window.self !== window.top) {
            logAttempt('iframe', { top: window.top.location.href });
            window.top.location.href = window.self.location.href;
        }
        
        // Проверка на скриншоты
        document.addEventListener('keydown', function(e) {
            if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
                e.preventDefault();
                logAttempt('screenshot', { key: e.key });
                return false;
            }
        });
    }

    // 🔄 Постоянные проверки
    function continuousMonitoring() {
        setInterval(() => {
            checkDevTools();
        }, 1000);
        
        // Проверка изменений в DOM
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Проверяем на подозрительные скрипты
                    mutation.addedNodes.forEach(function(node) {
                        if (node.tagName === 'SCRIPT' && node.src && !node.src.includes(window.location.hostname)) {
                            logAttempt('external_script', { src: node.src });
                            node.remove();
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 🚀 Инициализация защиты
    function initProtection() {
        console.log('🛡️ Защита AEZA BIO активирована');
        
        if (PROTECTION_CONFIG.checks.devTools) {
            checkDevTools();
        }
        
        if (PROTECTION_CONFIG.checks.rightClick) {
            blockRightClick();
        }
        
        if (PROTECTION_CONFIG.checks.copyPaste) {
            blockCopyPaste();
        }
        
        if (PROTECTION_CONFIG.checks.viewSource) {
            blockViewSource();
        }
        
        if (PROTECTION_CONFIG.checks.console) {
            blockConsole();
        }
        
        if (PROTECTION_CONFIG.checks.inspect) {
            checkInspect();
        }
        
        additionalChecks();
        continuousMonitoring();
    }

    // 🎯 Запуск защиты после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }

    // 🌐 Глобальные функции для внешнего доступа
    window.AEZA_PROTECTION = {
        config: PROTECTION_CONFIG,
        logAttempt: logAttempt,
        checkDevTools: checkDevTools
    };

})();
