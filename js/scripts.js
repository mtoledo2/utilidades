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

            function toggleMenu() {
                menuLeft.classList.contains('mobile-open') ? fecharMenu() : abrirMenu()
            }

            // Desktop: botão dentro do menu carregado
            const botaoDesktop = document.querySelector('#menu-left ~ .bt-menu, .bt-menu:not(.topbar-btn)')
            
            // Evento em TODOS os botões com bt-menu na página
            document.querySelectorAll('.bt-menu').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        toggleMenu()
                    } else {
                        menuLeft.classList.toggle('toggle')
                        btn.classList.toggle('toggle')
                        conteudo && conteudo.classList.toggle('toggle')
                    }
                })
            })

            overlay.addEventListener('click', fecharMenu)

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    menuLeft.classList.remove('mobile-open')
                    overlay.style.opacity = '0'
                    overlay.style.display = 'none'
                }
            })
        })
})