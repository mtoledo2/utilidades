/*document.addEventListener('DOMContentLoaded',() => {
    fetch('./components/menu.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('menu-container').innerHTML = html

            const botao = document.querySelector('.bt-menu')
            const menuLateral = document.querySelector('.menu-left')
            const conteudo = document.querySelector('.conteudo')    

            botao.addEventListener('click', () =>{
                menuLateral.classList.toggle('toggle')
                botao.classList.toggle('toggle')
                conteudo.classList.toggle('toggle')    
            })
        })
})*/

document.addEventListener('DOMContentLoaded', () => {

    const isRoot =
        location.pathname === '/' ||
        location.pathname.endsWith('/index.html')

    const menuPath = isRoot
        ? './components/menu.html'
        : '../components/menu.html'

    fetch(menuPath)
        .then(res => res.text())
        .then(html => {
            document.getElementById('menu-container').innerHTML = html

            const botao = document.querySelector('.bt-menu')
            const menuLateral = document.querySelector('.menu-left')
            const conteudo = document.querySelector('.conteudo')

            if (!botao) return

            botao.addEventListener('click', () => {
                menuLateral.classList.toggle('toggle')
                botao.classList.toggle('toggle')
                conteudo.classList.toggle('toggle')
            })
        })
        .catch(err => console.error('Erro ao carregar menu:', err))
})


