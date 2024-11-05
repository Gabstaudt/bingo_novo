// Função para sortear números aleatórios entre 01 e 99
let numerosSorteadosAleatorio = new Set();

function sortearNumero() {
    const maxNumero = 99;
    if (numerosSorteadosAleatorio.size >= maxNumero) {
        console.log("Todos os números entre 01 e 99 já foram sorteados!");
        return;
    }
    let novoNumero;
    do {
        novoNumero = Math.floor(Math.random() * maxNumero) + 1;
    } while (numerosSorteadosAleatorio.has(novoNumero));
    
    numerosSorteadosAleatorio.add(novoNumero);
    const numeroFormatado = novoNumero < 10 ? `0${novoNumero}` : novoNumero;
    console.log("Número sorteado:", numeroFormatado);

    // Exibe o número sorteado
    const sorteioElement = document.getElementById('numeroSorteado');
    if (sorteioElement) {
        sorteioElement.textContent = `Número sorteado: ${numeroFormatado}`;
    } else {
        console.warn("Elemento para exibir o número sorteado não foi encontrado.");
    }

    // Marca o número sorteado em todas as cartelas
    marcarNumeroEmCartelas(novoNumero);

    // Verifica se há uma cartela vencedora 
    const cartelas = document.getElementsByClassName('bingo-card');
    verificarSequenciaVencedora(cartelas); 
}

// marcar o número sorteado em todas as cartelas
function marcarNumeroEmCartelas(numeroSorteado) {
    const cartelas = document.getElementsByClassName('bingo-card');
    for (let cartela of cartelas) {
        const cells = cartela.getElementsByClassName('cell');
        for (let cell of cells) {
            if (parseInt(cell.textContent) === numeroSorteado) {
                cell.classList.add('numero-sorteado'); // Adiciona estilo para número sorteado
            }
        }
    }
}

// verificar se há uma cartela vencedora
function verificarSequenciaVencedora(cartelas) {
    let vencedores = []; 

    for (let cartela of cartelas) {
        let cells = cartela.getElementsByClassName('cell');
        let nomeCartela = cartela.getAttribute('data-nome');
        let encontrouVencedor = false;

        // Verificar linhas
        for (let i = 0; i < 5; i++) {
            let linhaCompleta = true;
            for (let j = 0; j < 5; j++) {
                const cell = cells[i * 5 + j];
                if (cell && !(i === 2 && j === 2) && !cell.classList.contains('numero-sorteado')) {
                    linhaCompleta = false;
                    break;
                }
            }
            if (linhaCompleta) {
                vencedores.push(nomeCartela);
                encontrouVencedor = true;
                break;
            }
        }

        // Verificar colunas
        if (!encontrouVencedor) {
            for (let j = 0; j < 5; j++) {
                let colunaCompleta = true;
                for (let i = 0; i < 5; i++) {
                    const cell = cells[i * 5 + j];
                    if (cell && !(i === 2 && j === 2) && !cell.classList.contains('numero-sorteado')) {
                        colunaCompleta = false;
                        break;
                    }
                }
                if (colunaCompleta) {
                    vencedores.push(nomeCartela);
                    encontrouVencedor = true;
                    break;
                }
            }
        }

        // Verificar diagonais
        if (!encontrouVencedor) {
            let diagonal1Completa = true;
            let diagonal2Completa = true;
            for (let i = 0; i < 5; i++) {
                const cellDiagonal1 = cells[i * 5 + i];
                const cellDiagonal2 = cells[i * 5 + (4 - i)];
                if (cellDiagonal1 && !(i === 2 && i === 2) && !cellDiagonal1.classList.contains('numero-sorteado')) {
                    diagonal1Completa = false;
                }
                if (cellDiagonal2 && !(i === 2 && i === 2) && !cellDiagonal2.classList.contains('numero-sorteado')) {
                    diagonal2Completa = false;
                }
            }
            if (diagonal1Completa) {
                vencedores.push(nomeCartela);
            }
            if (diagonal2Completa) {
                vencedores.push(nomeCartela);
            }
        }
    }

    // Anuncia as cartelas vencedoras
    if (vencedores.length > 0) {
        alert(`Cartela(s) vencedora(s): ${vencedores.join(', ')}`);
    }
}

// Adiciona um event listener para o botão "Sortear Número Aleatório"
document.getElementById('btnSortearNumeroAleatorio').addEventListener('click', sortearNumero);

