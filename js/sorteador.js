const LIMITE_MAXIMO = 100
let quantidadeGrupos = 2

// ── Inicializa inputs ──
const container = document.getElementById('inputs-container')

function criarInputRow(placeholder = 'Digite um nome') {
    const row = document.createElement('div')
    row.className = 'input-row'

    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'input input-sorteio'
    input.placeholder = placeholder

    const btnRemove = document.createElement('button')
    btnRemove.className = 'btn-remove'
    btnRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    btnRemove.title = 'Remover'
    btnRemove.addEventListener('click', () => {
        row.remove()
        atualizarContador()
    })

    row.appendChild(input)
    row.appendChild(btnRemove)
    return row
}

function atualizarContador() {
    const total = document.querySelectorAll('.input-sorteio').length
    const el = document.getElementById('contador')
    if (el) el.textContent = `${total} adicionado${total !== 1 ? 's' : ''}`
}

// Começa com 4 inputs
container.appendChild(criarInputRow('Ex: João'))
container.appendChild(criarInputRow('Ex: Maria'))
container.appendChild(criarInputRow('Ex: Pedro'))
container.appendChild(criarInputRow('Ex: Ana'))
atualizarContador()

document.getElementById('add-input').addEventListener('click', () => {
    container.appendChild(criarInputRow())
    atualizarContador()
    container.lastElementChild.querySelector('input').focus()
})

// ── Quantidade de grupos ──
const botoesQtd = document.querySelectorAll('.btn-qtd')
const inputManual = document.getElementById('qtd-manual')

botoesQtd.forEach(botao => {
    botao.addEventListener('click', () => {
        quantidadeGrupos = Number(botao.dataset.value)
        inputManual.value = ''
        botoesQtd.forEach(b => b.classList.remove('active'))
        botao.classList.add('active')
    })
})

inputManual.addEventListener('input', () => {
    const valor = Number(inputManual.value)
    if (valor >= 2) {
        quantidadeGrupos = valor
        botoesQtd.forEach(b => b.classList.remove('active'))
    }
})

// ── Lógica do sorteio ──
function obterNomes() {
    return Array.from(document.querySelectorAll('.input-sorteio'))
        .map(i => i.value.trim())
        .filter(v => v !== '')
}

function validar(nomes, grupos) {
    if (nomes.length < 2) return 'Digite pelo menos 2 participantes.'
    if (nomes.length > LIMITE_MAXIMO) return `Máximo de ${LIMITE_MAXIMO} participantes.`
    if (grupos < 2) return 'Defina pelo menos 2 grupos.'
    if (grupos > nomes.length) return 'Número de grupos maior que o de participantes.'
    return null
}

function embaralhar(arr) {
    const copia = [...arr]
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copia[i], copia[j]] = [copia[j], copia[i]]
    }
    return copia
}

function distribuirGrupos(nomes, qtdGrupos) {
    const embaralhados = embaralhar(nomes)
    const grupos = Array.from({ length: qtdGrupos }, () => [])

    // Distribui um por um em cada grupo — garante equilíbrio máximo
    embaralhados.forEach((nome, i) => {
        grupos[i % qtdGrupos].push(nome)
    })

    return grupos
}

function mostrarResultado(grupos) {
    const grid = document.getElementById('grupos-grid')
    grid.innerHTML = ''

    grupos.forEach((grupo, index) => {
        const card = document.createElement('div')
        card.className = 'grupo-card'
        card.style.animationDelay = `${index * 80}ms`

        const titulo = document.createElement('p')
        titulo.className = 'grupo-titulo'
        titulo.textContent = `Grupo ${index + 1}`
        card.appendChild(titulo)

        grupo.forEach(nome => {
            const membro = document.createElement('div')
            membro.className = 'grupo-membro'
            membro.textContent = nome
            card.appendChild(membro)
        })

        grid.appendChild(card)
    })

    document.getElementById('resultado-empty').classList.add('hidden')
    document.getElementById('resultado-content').classList.remove('hidden')
}

document.getElementById('btn-sortear').addEventListener('click', () => {
    const nomes = obterNomes()
    const erro = validar(nomes, quantidadeGrupos)

    if (erro) {
        alert(erro)
        return
    }

    const grupos = distribuirGrupos(nomes, quantidadeGrupos)
    mostrarResultado(grupos)
})

// ── Resetar ──
function resetar() {
    container.innerHTML = ''
    container.appendChild(criarInputRow('Ex: João'))
    container.appendChild(criarInputRow('Ex: Maria'))
    container.appendChild(criarInputRow('Ex: Pedro'))
    container.appendChild(criarInputRow('Ex: Ana'))
    atualizarContador()

    document.getElementById('grupos-grid').innerHTML = ''
    document.getElementById('resultado-empty').classList.remove('hidden')
    document.getElementById('resultado-content').classList.add('hidden')

    quantidadeGrupos = 2
    inputManual.value = ''
    botoesQtd.forEach(b => b.classList.remove('active'))
    document.querySelector('.btn-qtd[data-value="2"]').classList.add('active')
}

document.getElementById('btn-reset').addEventListener('click', resetar)