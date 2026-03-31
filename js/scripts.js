document.addEventListener('DOMContentLoaded', () => {
    const isSubPage = window.location.pathname.includes('/pages/')
    const basePath = isSubPage ? '../' : './'

    fetch(basePath + 'components/menu.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('menu-container').innerHTML = html

            const botao = document.querySelector('.bt-menu')
            const menuLeft = document.getElementById('menu-left')
            const overlay = document.getElementById('menu-overlay')
            const conteudo = document.querySelector('.conteudo')

            const isMobile = () => window.innerWidth <= 768

            function abrirMenu() {
                if (isMobile()) {
                    menuLeft.classList.add('mobile-open')
                    overlay.classList.add('visible')
                } else {
                    menuLeft.classList.add('toggle')
                    botao.classList.add('toggle')
                    conteudo.classList.add('toggle')
                }
            }

            function fecharMenu() {
                if (isMobile()) {
                    menuLeft.classList.remove('mobile-open')
                    overlay.classList.remove('visible')
                } else {
                    menuLeft.classList.remove('toggle')
                    botao.classList.remove('toggle')
                    conteudo.classList.remove('toggle')
                }
            }

            function toggleMenu() {
                const aberto = isMobile()
                    ? menuLeft.classList.contains('mobile-open')
                    : menuLeft.classList.contains('toggle')

                aberto ? fecharMenu() : abrirMenu()
            }

            // Botão desktop e mobile (topbar)
            document.querySelectorAll('.bt-menu').forEach(btn => {
                btn.addEventListener('click', toggleMenu)
            })

            overlay.addEventListener('click', fecharMenu)

            window.addEventListener('resize', () => {
                if (!isMobile()) {
                    menuLeft.classList.remove('mobile-open')
                    overlay.classList.remove('visible')
                }
            })

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

            // Corrige links em subpáginas
            if (isSubPage) {
                document.querySelectorAll('#menu-container a').forEach(link => {
                    const href = link.getAttribute('href')
                    if (href && href.startsWith('./')) {
                        link.setAttribute('href', '../' + href.slice(2))
                    }
                })
            }
        })
})