document.addEventListener('DOMContentLoaded',() => {
    fetch('/projeto/components/menu.html')
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
})
    



