// ── MODAL DE INFO ──
const modalOverlay = document.getElementById('modal-overlay')
const modalTitulo = document.getElementById('modal-titulo')
const modalConteudo = document.getElementById('modal-conteudo')

const infos = {
    edpi: {
        titulo: 'O que é eDPI?',
        conteudo: `
            <p>O <strong>eDPI (effective DPI)</strong> é a sensibilidade real do seu mouse, combinando o DPI do hardware com a sensibilidade configurada no jogo.</p>
            <p style="margin-top: 10px;">É a melhor forma de comparar configurações entre jogadores, independente do mouse ou jogo usado.</p>
            <div class="modal-exemplo">
                <strong>Exemplo:</strong> DPI 800 × Sens 1.5 = eDPI 1200<br>
                Isso é equivalente a DPI 1600 × Sens 0.75 = eDPI 1200
            </div>
            <div class="modal-refs">
                <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 6px;">Referências de eDPI por nível:</p>
                <div class="modal-ref-item"><span>Pros de FPS</span><strong>200 – 800</strong></div>
                <div class="modal-ref-item"><span>Jogadores competitivos</span><strong>800 – 1600</strong></div>
                <div class="modal-ref-item"><span>Casual</span><strong>1600 – 3200</strong></div>
                <div class="modal-ref-item"><span>Alto demais para FPS</span><strong>acima de 3200</strong></div>
            </div>
        `
    },
    sens: {
        titulo: 'Como funciona o conversor?',
        conteudo: `
            <p>Quando você <strong>troca o DPI do mouse</strong>, precisa ajustar a sensibilidade no jogo para manter o mesmo movimento físico na mira.</p>
            <p style="margin-top: 10px;">Este conversor mantém seu <strong>eDPI constante</strong>, garantindo que a sensação de jogo seja idêntica.</p>
            <div class="modal-exemplo">
                <strong>Exemplo prático:</strong><br>
                Você usava: DPI 800 + Sens 1.5 (eDPI 1200)<br>
                Novo mouse: DPI 1600<br>
                Nova sens: <strong>0.75</strong> (eDPI 1200 mantido)
            </div>
            <p style="margin-top: 12px; font-size: 13px; color: var(--text-dim);">Onde encontrar a sensibilidade: nas configurações do jogo, geralmente em "Mouse" ou "Controles".</p>
        `
    },
    fov: {
        titulo: 'O que é FOV?',
        conteudo: `
            <p>O <strong>FOV (Field of View)</strong> é o campo de visão do jogo em graus. Um FOV maior mostra mais da cena, mas pode distorcer a imagem nas bordas.</p>
            <p style="margin-top: 10px;">O FOV ideal depende do <strong>tamanho do monitor e da distância</strong> que você senta dele — quanto mais perto, maior o FOV recomendado.</p>
            <div class="modal-exemplo">
                <strong>Referências comuns:</strong><br>
                Monitor 24" a 60cm → FOV ~103°<br>
                Monitor 27" a 70cm → FOV ~100°<br>
                TV grande a 2m → FOV ~75°
            </div>
            <div class="modal-refs">
                <div class="modal-ref-item"><span>Muito fechado</span><strong>abaixo de 80°</strong></div>
                <div class="modal-ref-item"><span>Padrão console</span><strong>80° – 90°</strong></div>
                <div class="modal-ref-item"><span>Recomendado PC</span><strong>90° – 110°</strong></div>
                <div class="modal-ref-item"><span>Ultra wide</span><strong>acima de 110°</strong></div>
            </div>
        `
    },
    grinding: {
        titulo: 'Como usar o Tempo de Grinding?',
        conteudo: `
            <p>Informe seu <strong>progresso atual</strong>, a <strong>meta</strong> que quer atingir e quanto você ganha <strong>por hora</strong> de jogo (XP, gold, pontos, etc.).</p>
            <p style="margin-top: 10px;">O calculador estima quanto tempo falta e quando você vai atingir a meta baseado no seu ritmo atual.</p>
            <div class="modal-exemplo">
                <strong>Exemplo:</strong><br>
                XP atual: 5.000 | Meta: 50.000<br>
                XP/hora: 3.000<br>
                Resultado: 15 horas restantes
            </div>
            <p style="margin-top: 12px; font-size: 13px; color: var(--text-dim);">Funciona para qualquer recurso: XP, gold, coins, rank points, reputação, etc.</p>
        `
    }
}

function abrirModal(chave) {
    const info = infos[chave]
    if (!info) return
    modalTitulo.textContent = info.titulo
    modalConteudo.innerHTML = info.conteudo
    modalOverlay.classList.add('visivel')
}

function fecharModal() {
    modalOverlay.classList.remove('visivel')
}

document.getElementById('modal-fechar').addEventListener('click', fecharModal)
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) fecharModal()
})

document.querySelectorAll('.btn-info').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation()
        abrirModal(btn.dataset.info)
    })
})

// ── CATEGORIAS ──
const categorias = document.querySelectorAll('.categoria-btn')
const cards = document.querySelectorAll('.calc-card')

function filtrarCategoria(categoria) {
    categorias.forEach(btn => btn.classList.toggle('active', btn.dataset.categoria === categoria))
    cards.forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.classList.add('visivel')
        } else {
            card.classList.remove('visivel')
        }
    })
}

categorias.forEach(btn => {
    btn.addEventListener('click', () => filtrarCategoria(btn.dataset.categoria))
})

filtrarCategoria('todos')

// ── ACCORDION ──
document.querySelectorAll('.calc-header').forEach(header => {
    header.addEventListener('click', e => {
        if (e.target.closest('.btn-info')) return
        const card = header.closest('.calc-card')
        const jaAberto = card.classList.contains('aberto')
        document.querySelectorAll('.calc-card').forEach(c => c.classList.remove('aberto'))
        if (!jaAberto) card.classList.add('aberto')
    })
})

// ── RADIO BUTTONS ──
document.querySelectorAll('.radio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const group = btn.closest('.radio-group')
        group.querySelectorAll('.radio-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
    })
})

// ── HELPERS ──
function mostrarResultado(id) {
    document.getElementById(id).classList.add('visivel')
}

function getRadioAtivo(groupId) {
    const active = document.querySelector(`#${groupId} .radio-btn.active`)
    return active ? active.dataset.value : null
}

function getVal(id) {
    return parseFloat(document.getElementById(id).value)
}

// ── 1. IMC ──
document.getElementById('btn-imc').addEventListener('click', () => {
    const peso = getVal('imc-peso')
    const altura = getVal('imc-altura') / 100
    if (!peso || !altura || peso <= 0 || altura <= 0) { alert('Preencha peso e altura corretamente.'); return }

    const imc = peso / (altura * altura)
    let classe, label
    if (imc < 18.5) { classe = 'class-abaixo'; label = 'Abaixo do peso' }
    else if (imc < 25) { classe = 'class-normal'; label = 'Peso normal' }
    else if (imc < 30) { classe = 'class-sobrepeso'; label = 'Sobrepeso' }
    else if (imc < 35) { classe = 'class-obesidade'; label = 'Obesidade grau I' }
    else if (imc < 40) { classe = 'class-obesidade'; label = 'Obesidade grau II' }
    else { classe = 'class-obesidade'; label = 'Obesidade grau III' }

    document.getElementById('imc-valor').textContent = imc.toFixed(1)
    const classEl = document.getElementById('imc-classificacao')
    classEl.className = `resultado-classificacao ${classe}`
    classEl.textContent = label
    mostrarResultado('resultado-imc')
})

// ── 2. ÁGUA ──
document.getElementById('btn-agua').addEventListener('click', () => {
    const peso = getVal('agua-peso')
    if (!peso || peso <= 0) { alert('Preencha o peso corretamente.'); return }

    const litros = (peso * 35) / 1000
    const copos = Math.ceil(litros / 0.25)
    document.getElementById('agua-valor').textContent = litros.toFixed(2)
    document.getElementById('agua-copos').textContent = copos
    mostrarResultado('resultado-agua')
})

// ── 3. TMB ──
document.getElementById('btn-tmb').addEventListener('click', () => {
    const peso = getVal('tmb-peso')
    const altura = getVal('tmb-altura')
    const idade = getVal('tmb-idade')
    const sexo = getRadioAtivo('tmb-sexo')
    const atividade = getRadioAtivo('tmb-atividade')
    if (!peso || !altura || !idade || !sexo || !atividade) { alert('Preencha todos os campos.'); return }

    let tmb = sexo === 'M'
        ? 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade)
        : 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade)

    const fatores = { sedentario: 1.2, leve: 1.375, moderado: 1.55, intenso: 1.725 }
    const tdee = tmb * fatores[atividade]

    document.getElementById('tmb-valor').textContent = Math.round(tmb)
    document.getElementById('tmb-tdee').textContent = Math.round(tdee)
    document.getElementById('tmb-emagr').textContent = Math.round(tdee - 400)
    document.getElementById('tmb-ganho').textContent = Math.round(tdee + 400)
    mostrarResultado('resultado-tmb')
})

// ── 4. 1RM ──
document.getElementById('btn-rm').addEventListener('click', () => {
    const peso = getVal('rm-peso')
    const reps = getVal('rm-reps')
    if (!peso || !reps || reps < 1 || reps > 30) { alert('Preencha o peso e repetições (1 a 30).'); return }

    const rm = peso / (1.0278 - 0.0278 * reps)
    const percentuais = [100, 95, 90, 85, 80, 75, 70]

    document.getElementById('rm-valor').textContent = Math.round(rm)
    const lista = document.getElementById('rm-lista')
    lista.innerHTML = ''
    percentuais.forEach(p => {
        const li = document.createElement('li')
        li.innerHTML = `<span>${p}% do 1RM</span><strong>${(rm * p / 100).toFixed(1)} kg</strong>`
        lista.appendChild(li)
    })
    mostrarResultado('resultado-rm')
})

// ── 5. MACROS ──
document.getElementById('btn-macros').addEventListener('click', () => {
    const peso = getVal('macros-peso')
    const altura = getVal('macros-altura')
    const idade = getVal('macros-idade')
    const sexo = getRadioAtivo('macros-sexo')
    const atividade = getRadioAtivo('macros-atividade')
    const objetivo = getRadioAtivo('macros-objetivo')
    if (!peso || !altura || !idade || !sexo || !atividade || !objetivo) { alert('Preencha todos os campos.'); return }

    let tmb = sexo === 'M'
        ? 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade)
        : 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade)

    const fatores = { sedentario: 1.2, leve: 1.375, moderado: 1.55, intenso: 1.725 }
    let calorias = tmb * fatores[atividade]
    if (objetivo === 'emagrecer') calorias -= 400
    else if (objetivo === 'ganhar') calorias += 400

    const proteina = peso * 2
    const gordura = (calorias * 0.25) / 9
    const carbo = (calorias - (proteina * 4) - (gordura * 9)) / 4

    document.getElementById('macros-calorias').textContent = Math.round(calorias)
    document.getElementById('macros-proteina').textContent = Math.round(proteina)
    document.getElementById('macros-carbo').textContent = Math.round(carbo)
    document.getElementById('macros-gordura').textContent = Math.round(gordura)
    mostrarResultado('resultado-macros')
})

// ── 6. eDPI ──
document.getElementById('btn-edpi').addEventListener('click', () => {
    const dpi = getVal('edpi-dpi')
    const sens = getVal('edpi-sens')
    if (!dpi || !sens || dpi <= 0 || sens <= 0) { alert('Preencha DPI e sensibilidade corretamente.'); return }

    const edpi = dpi * sens
    let classe, avaliacao
    if (edpi < 400) { classe = 'class-info'; avaliacao = 'Muito baixo — ideal para snipers e alta precisão' }
    else if (edpi < 800) { classe = 'class-ok'; avaliacao = 'Baixo — comum entre pros de FPS competitivo' }
    else if (edpi < 1600) { classe = 'class-ok'; avaliacao = 'Médio — equilibrado para a maioria dos jogos' }
    else if (edpi < 3200) { classe = 'class-aviso'; avaliacao = 'Alto — comum em jogos de ação rápida' }
    else { classe = 'class-obesidade'; avaliacao = 'Muito alto — pode dificultar precisão em FPS' }

    document.getElementById('edpi-valor').textContent = Math.round(edpi)
    const classEl = document.getElementById('edpi-classificacao')
    classEl.className = `resultado-classificacao ${classe}`
    classEl.textContent = avaliacao
    mostrarResultado('resultado-edpi')
})

// ── 7. CONVERSOR DE SENS ──
document.getElementById('btn-sens').addEventListener('click', () => {
    const sensOrigem = getVal('sens-origem-valor')
    const dpiOrigem = getVal('sens-dpi-origem')
    const dpiDestino = getVal('sens-dpi-destino')
    if (!sensOrigem || !dpiOrigem || !dpiDestino) { alert('Preencha todos os campos.'); return }

    const edpi = sensOrigem * dpiOrigem
    const sensDestino = edpi / dpiDestino

    document.getElementById('sens-valor').textContent = sensDestino.toFixed(4)
    document.getElementById('sens-edpi').textContent = Math.round(edpi)
    mostrarResultado('resultado-sens')
})

// ── 8. FOV ──
document.getElementById('btn-fov').addEventListener('click', () => {
    const tamanho = getVal('fov-tamanho')
    const distancia = getVal('fov-distancia')
    const aspecto = getRadioAtivo('fov-aspecto')
    if (!tamanho || !distancia || !aspecto) { alert('Preencha todos os campos.'); return }

    const razoes = { '16:9': 16/9, '21:9': 21/9, '4:3': 4/3 }
    const ratio = razoes[aspecto]
    const largura = Math.sqrt((tamanho * tamanho * ratio * ratio) / (1 + ratio * ratio))
    const fovRad = 2 * Math.atan(largura / (2 * distancia))
    const fov = fovRad * (180 / Math.PI)

    let classe, avaliacao
    if (fov < 80) { classe = 'class-aviso'; avaliacao = 'Muito fechado — pode causar enjoo' }
    else if (fov < 90) { classe = 'class-info'; avaliacao = 'Padrão console' }
    else if (fov < 110) { classe = 'class-ok'; avaliacao = 'Ideal para PC' }
    else { classe = 'class-aviso'; avaliacao = 'Muito aberto — pode distorcer a imagem' }

    document.getElementById('fov-valor').textContent = Math.round(fov)
    const classEl = document.getElementById('fov-classificacao')
    classEl.className = `resultado-classificacao ${classe}`
    classEl.textContent = avaliacao
    mostrarResultado('resultado-fov')
})

// ── 9. GRINDING ──
document.getElementById('btn-grinding').addEventListener('click', () => {
    const atual = getVal('grinding-atual')
    const meta = getVal('grinding-meta')
    const porHora = getVal('grinding-por-hora')
    if (isNaN(atual) || isNaN(meta) || !porHora || porHora <= 0) { alert('Preencha todos os campos corretamente.'); return }
    if (meta <= atual) { alert('A meta deve ser maior que o valor atual.'); return }

    const restante = meta - atual
    const horasTotais = restante / porHora
    const horas = Math.floor(horasTotais)
    const minutos = Math.round((horasTotais - horas) * 60)

    const agora = new Date()
    const conclusao = new Date(agora.getTime() + horasTotais * 60 * 60 * 1000)
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    const dataFormatada = conclusao.toLocaleDateString('pt-BR', opcoes)

    document.getElementById('grinding-horas').textContent = horas
    document.getElementById('grinding-minutos').textContent = minutos
    document.getElementById('grinding-restante').textContent = restante.toLocaleString('pt-BR')
    document.getElementById('grinding-conclusao').textContent = dataFormatada
    mostrarResultado('resultado-grinding')
})

// ── 10. DATAS ──
document.getElementById('btn-datas').addEventListener('click', () => {
    const inicio = new Date(document.getElementById('data-inicio').value)
    const fim = new Date(document.getElementById('data-fim').value)
    if (isNaN(inicio) || isNaN(fim)) { alert('Preencha as duas datas.'); return }
    if (fim < inicio) { alert('A data final deve ser maior que a inicial.'); return }

    const diffMs = fim - inicio
    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const semanas = Math.floor(dias / 7)
    const meses = Math.floor(dias / 30.44)
    const anos = Math.floor(dias / 365.25)

    document.getElementById('datas-dias').textContent = dias.toLocaleString('pt-BR')
    document.getElementById('datas-semanas').textContent = semanas.toLocaleString('pt-BR')
    document.getElementById('datas-meses').textContent = meses.toLocaleString('pt-BR')
    document.getElementById('datas-anos').textContent = anos.toLocaleString('pt-BR')
    mostrarResultado('resultado-datas')
})