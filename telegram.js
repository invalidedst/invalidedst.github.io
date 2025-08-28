// Telegram WebApp integration and link handling
;(function () {
    if (typeof window === 'undefined') return
    var tg = window.Telegram && window.Telegram.WebApp
    if (!tg) return

    try {
        tg.ready()
        tg.expand()
    } catch (e) {}

    function applyThemeParams() {
        try {
            var theme = tg.themeParams || {}
            var bgColor = theme.bg_color || '#0b0b0f'
            var textColor = theme.text_color || '#ffffff'
            var hintColor = theme.hint_color || '#9aa0a6'
            document.documentElement.style.setProperty('--tg-bg', bgColor)
            document.documentElement.style.setProperty('--tg-text', textColor)
            document.documentElement.style.setProperty('--tg-hint', hintColor)
        } catch (e) {}
    }

    applyThemeParams()
    if (tg.onEvent) {
        tg.onEvent('themeChanged', applyThemeParams)
    }

    // Open external links inside Telegram
    function interceptLinkClicks() {
        document.addEventListener('click', function (e) {
            var target = e.target
            while (target && target.tagName !== 'A') {
                target = target.parentElement
            }
            if (!target || target.tagName !== 'A') return
            var href = target.getAttribute('href')
            if (!href) return

            // Only intercept http/https links
            if (/^https?:\/\//i.test(href)) {
                try {
                    if (tg.openLink) {
                        e.preventDefault()
                        tg.openLink(href, { try_instant_view: false })
                    }
                } catch (err) {}
            }
        }, true)
    }

    interceptLinkClicks()
})()

