const container = document.getElementById('inputs-container')
const btnAdd = document.getElementById('add-input')

btnAdd.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'input-sorteio'
    input.placeholder = 'Digite um nome'

    container.appendChild(input)
})


let quantidadeGanhadores = 1

const botoesQtd = document.querySelectorAll('.btn-qtd')
const inputManual = document.getElementById('qtd-manual')

botoesQtd.forEach(botao => {
    botao.addEventListener('click', () => {
        quantidadeGanhadores = Number(botao.dataset.value)
        inputManual.value = ''
    })
})

inputManual.addEventListener('input', () => {
    const valor = Number(inputManual.value)

    if (valor > 0){
        quantidadeGanhadores = valor
    }
})

const btnSortear = document.getElementById('btn-sortear')

btnSortear.addEventListener('click', () => {

})

const LIMITE_MAXIMO = 100

function obterNomes() {
    const inputs = document.querySelectorAll('.input-sorteio')
    const nomes = []

    inputs.forEach(input => {
        const valor = input.value.trim()
        if (valor !== '') {
            nomes.push(valor)
        }
    })

    return nomes
}

function validarSorteio(nomes, quantidade) {
    if (nomes.length < 2) {
        return 'Digite pelo menos 2 nomes.'
    }

    if (nomes.length > LIMITE_MAXIMO) {
        return `Máximo de ${LIMITE_MAXIMO} nomes permitido.`
    }

    if (quantidade > nomes.length) {
        return 'Quantidade de ganhadores maior que o número de nomes.'
    }

    return null
}

function sortear(nomes, quantidade) {
    const copia = [...nomes]
    const ganhadores = []

    for (let i = 0; i < quantidade; i++) {
        const index = Math.floor(Math.random() * copia.length)
        ganhadores.push(copia[index])
        copia.splice(index, 1)
    }

    return ganhadores
}

function mostrarResultado(ganhadores) {
    const resultado = document.getElementById('resultado')
    resultado.innerHTML = ''

    ganhadores.forEach((nome, index) => {
        const p = document.createElement('p')
        p.textContent = `${index + 1}º - ${nome}`
        resultado.appendChild(p)
    })
}

btnSortear.addEventListener('click', () => {
    const nomes = obterNomes()
    const erro = validarSorteio(nomes, quantidadeGanhadores)

    if (erro) {
        alert(erro)
        return
    }

    const ganhadores = sortear(nomes, quantidadeGanhadores)
    mostrarResultado(ganhadores)

    document.getElementById('btn-reset')
    .classList.remove('hidden')
})

function resetarSorteador() {
    // Remove todos os inputs
    const container = document.getElementById('inputs-container')
    container.innerHTML = ''

    // Cria input inicial novamente
    const inputInicial = document.createElement('input')
    inputInicial.type = 'text'
    inputInicial.className = 'input-sorteio'
    inputInicial.placeholder = 'Digite um nome'
    container.appendChild(inputInicial)

    // Limpa resultado
    document.getElementById('resultado').innerHTML = ''

    // Reseta quantidade de ganhadores
    quantidadeGanhadores = 1
    document.getElementById('qtd-manual').value = ''

    // Esconde botão reset
    document.getElementById('btn-reset').classList.add('hidden')
}

const btnReset = document.getElementById('btn-reset')

btnReset.addEventListener('click', () => {
    resetarSorteador()
})


