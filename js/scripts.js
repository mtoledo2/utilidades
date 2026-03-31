document.addEventListener('DOMContentLoaded', () => {
    // Detecta se está numa subpasta (pages/) e ajusta o caminho base
    const isSubPage = window.location.pathname.includes('/pages/')
    const basePath = isSubPage ? '../' : './'

    fetch(basePath + 'components/menu.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('menu-container').innerHTML = html
            
            if (isSubPage) {
                document.querySelectorAll('#menu-container a').forEach(link => {
                    const href = link.getAttribute('href')
                    if (href && href.startsWith('./')) {
                        link.setAttribute('href', '../' + href.slice(2))
                    }
                })
            }

            const botao = document.querySelector('.bt-menu')
            const menuLateral = document.querySelector('.menu-left')
            const conteudo = document.querySelector('.conteudo')

            botao.addEventListener('click', () => {
                menuLateral.classList.toggle('toggle')
                botao.classList.toggle('toggle')
                conteudo.classList.toggle('toggle')
            })
        })
})