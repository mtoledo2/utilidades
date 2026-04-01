;(function () {
    const salvo = localStorage.getItem('tema')
    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const tema = salvo || (prefereDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', tema)
})()

document.addEventListener('DOMContentLoaded', () => {
    const isSubPage = window.location.pathname.includes('/pages/')
    const basePath = isSubPage ? '../' : './'

    fetch(basePath + 'components/menu.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('menu-container').innerHTML = html

            const menuLeft = document.getElementById('menu-left')
            const overlay = document.getElementById('menu-overlay')
            const conteudo = document.querySelector('.conteudo')

            // Corrige links em subpáginas
            if (isSubPage) {
                document.querySelectorAll('#menu-container a').forEach(link => {
                    const href = link.getAttribute('href')
                    if (href && href.startsWith('./')) {
                        link.setAttribute('href', '../' + href.slice(2))
                    }
                })
            }

            // Link ativo
            const currentPath = window.location.pathname
            document.querySelectorAll('.menu-left a').forEach(link => {
                const href = link.getAttribute('href')
                if (!href) return
                const linkPath = href.replace('../', '/pages/').replace('./', '/')
                if (
                    currentPath.endsWith(linkPath) ||
                    (linkPath.includes('index.html') && (currentPath.endsWith('/') || currentPath.endsWith('utilidades/')))
                ) {
                    link.classList.add('active')
                }
            })

            // ── Tema ──
            function aplicarTema(tema) {
                document.documentElement.setAttribute('data-theme', tema)
                localStorage.setItem('tema', tema)
                document.getElementById('btn-dark').classList.toggle('active', tema === 'dark')
                document.getElementById('btn-light').classList.toggle('active', tema === 'light')
            }

            const temaAtual = localStorage.getItem('tema') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            aplicarTema(temaAtual)

            document.getElementById('btn-dark').addEventListener('click', () => aplicarTema('dark'))
            document.getElementById('btn-light').addEventListener('click', () => aplicarTema('light'))

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('tema')) aplicarTema(e.matches ? 'dark' : 'light')
            })

            // ── Menu ──
            const isMobile = () => window.innerWidth <= 768

            // Botão desktop: apenas o que vem do menu.html
            const botaoDesktop = document.querySelector('#menu-container .bt-menu')

            // Botão mobile: apenas o da topbar
            const botaoMobile = document.querySelector('.topbar .bt-menu')

            function abrirMenu() {
                menuLeft.classList.add('mobile-open')
                overlay.style.display = 'block'
                setTimeout(() => overlay.style.opacity = '1', 10)
            }

            function fecharMenu() {
                menuLeft.classList.remove('mobile-open')
                overlay.style.opacity = '0'
                setTimeout(() => overlay.style.display = 'none', 350)
            }

            // Desktop: esconde/mostra sidebar empurrando conteúdo
            if (botaoDesktop) {
                botaoDesktop.addEventListener('click', () => {
                    menuLeft.classList.toggle('toggle')
                    botaoDesktop.classList.toggle('toggle')
                    conteudo && conteudo.classList.toggle('toggle')
                })
            }

            // Mobile: abre/fecha como gaveta com overlay
            if (botaoMobile) {
                botaoMobile.addEventListener('click', () => {
                    menuLeft.classList.contains('mobile-open') ? fecharMenu() : abrirMenu()
                })
            }

            overlay.addEventListener('click', fecharMenu)

            window.addEventListener('resize', () => {
                if (!isMobile()) {
                    menuLeft.classList.remove('mobile-open')
                    overlay.style.opacity = '0'
                    overlay.style.display = 'none'
                }
            })
        })
})