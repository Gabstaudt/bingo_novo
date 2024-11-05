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

    // Exibe o número 
    const sorteioElement = document.getElementById('numeroSorteado');
    if (sorteioElement) {
        sorteioElement.textContent = `Número sorteado: ${numeroFormatado}`;
    } else {
        console.warn("Elemento para exibir o número sorteado não foi encontrado.");
    }

    // Marca o número sorteado em todas as cartelas
    marcarNumeroEmCartelas(novoNumero);
}

// Função para marcar o número sorteado em todas as cartelas
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

document.getElementById('btnSortearNumeroAleatorio').addEventListener('click', sortearNumero);
