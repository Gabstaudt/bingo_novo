// javascript para batida em linhas
    
// Função para preencher os números da cartela do bingo
function preencherCartelaNumeros(cartela, numeros) {
    numeros.forEach((linhaNumeros, i) => {
        let linhaElement = document.createElement('div');
        linhaElement.className = 'row';
        cartela.appendChild(linhaElement);

        linhaNumeros.forEach((numero, j) => {
            let cell = document.createElement('div');
            cell.className = 'cell';

            // Verifica se é o quadrado central (3x3) e insere o ícone
            if (i === 2 && j === 2) {
                cell.classList.add('central-icon');
                const icon = document.createElement('img');
                icon.src = '/image.png'; 
                icon.alt = 'Ícone Central';
                icon.className = 'central-icon-img';
                cell.appendChild(icon);
            } else {
                cell.textContent = numero ? adicionarZeros(numero) : '';
            }

            linhaElement.appendChild(cell);
        });
    });
}


// event listener para o botão "Cadastrar Nova Cartela"
document.getElementById('btnAddCartela').addEventListener('click', () => {
    let cartelaNome = prompt("Digite o nome da cartela:");
    if (cartelaNome) {
        let novaCartela = document.createElement('div');
        novaCartela.className = 'bingo-card';
        novaCartela.setAttribute('data-nome', cartelaNome);

        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btnExcluirCartela';
        btnExcluir.onclick = function() {
            excluirCartela(this);
        };
        novaCartela.appendChild(btnExcluir);

        let nomeCartela = document.createElement('span');
        nomeCartela.textContent = cartelaNome;
        novaCartela.appendChild(nomeCartela);

        document.body.appendChild(novaCartela);

        let numerosCartela = [];
        for (let i = 0; i < 5; i++) {
            let input = prompt(`Digite os números da linha ${i + 1}, separados por vírgula: lembre-se que são 5
                o número central da 3 linha será 0`);
            let numeros = input.split(',').map(num => parseInt(num.trim()));
            numerosCartela.push(numeros);
        }

        let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
        cartelasSalvas.push({ nome: cartelaNome, numeros: numerosCartela });
        localStorage.setItem('cartelas', JSON.stringify(cartelasSalvas));

        preencherCartelaNumeros(novaCartela, numerosCartela);
    }
});

function carregarCartelasDoLocalStorage() {
    let cartelasSalvas = localStorage.getItem('cartelas');
    if (cartelasSalvas) {
        cartelasSalvas = JSON.parse(cartelasSalvas);
        cartelasSalvas.forEach(cartela => {
            let novaCartela = document.createElement('div');
            novaCartela.className = 'bingo-card';
            novaCartela.setAttribute('data-nome', cartela.nome);

            let btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.className = 'btnExcluirCartela';
            btnExcluir.onclick = function() {
                excluirCartela(this);
            };
            novaCartela.appendChild(btnExcluir);

            let nomeCartela = document.createElement('span');
            nomeCartela.textContent = cartela.nome;
            novaCartela.appendChild(nomeCartela);

            document.body.appendChild(novaCartela);

            preencherCartelaNumeros(novaCartela, cartela.numeros);
        });
    }
}

carregarCartelasDoLocalStorage();

function excluirCartela(botaoExcluir) {
    let cartela = botaoExcluir.parentElement;
    cartela.remove();

    let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
    let nomeCartelaExcluir = cartela.querySelector('span').textContent;
    let novaListaCartelas = cartelasSalvas.filter(cartela => cartela.nome !== nomeCartelaExcluir);
    localStorage.setItem('cartelas', JSON.stringify(novaListaCartelas));
}

function adicionarZeros(numero) {
    return numero < 10 ? '0' + numero : numero;
}

let numerosSorteados = [];

function sortearNumero() {
    let numeroSorteado = parseInt(prompt("Digite o número sorteado:"));
    if (!numerosSorteados.includes(numeroSorteado)) {
        numerosSorteados.push(numeroSorteado);
        exibirNumerosSorteados();
        marcarNumerosSorteados(numeroSorteado);
    } else {
        alert("Número já sorteado!");
    }
}

function exibirNumerosSorteados() {
    let numerosSorteadosDiv = document.getElementById('numerosSorteados');
    numerosSorteadosDiv.innerHTML = 'Números Sorteados: ' + numerosSorteados.join(', ');
}

function marcarNumerosSorteados(numeroSorteado) {
    let cartelas = document.getElementsByClassName('bingo-card');
    for (let cartela of cartelas) {
        let cells = cartela.getElementsByClassName('cell');
        for (let cell of cells) {
            if (parseInt(cell.textContent) === numeroSorteado) {
                cell.classList.add('numero-sorteado');
            }
        }
    }
    verificarSequenciaVencedora(cartelas);
}

function verificarSequenciaVencedora(cartelas) {
    for (let cartela of cartelas) {
        let cells = cartela.getElementsByClassName('cell');
        let nomeCartela = cartela.getAttribute('data-nome');

        // Verificar linhas
        for (let i = 0; i < 5; i++) {
            let linhaCompleta = true;
            for (let j = 0; j < 5; j++) {
                if (!(i === 2 && j === 2) && !cells[i * 5 + j].classList.contains('numero-sorteado')) {
                    linhaCompleta = false;
                    break;
                }
            }
            if (linhaCompleta) {
                alert(`A cartela ${nomeCartela} completou 5 números marcados na horizontal!`);
                return;
            }
        }

        // Verificar colunas
        for (let j = 0; j < 5; j++) {
            let colunaCompleta = true;
            for (let i = 0; i < 5; i++) {
                if (!(i === 2 && j === 2) && !cells[i * 5 + j].classList.contains('numero-sorteado')) {
                    colunaCompleta = false;
                    break;
                }
            }
            if (colunaCompleta) {
                alert(`A cartela ${nomeCartela} completou 5 números marcados na vertical!`);
                return;
            }
        }

        // Verificar diagonais
        let diagonal1Completa = true;
        let diagonal2Completa = true;
        for (let i = 0; i < 5; i++) {
            if (!(i === 2 && i === 2) && !cells[i * 5 + i].classList.contains('numero-sorteado')) {
                diagonal1Completa = false;
            }
            if (!(i === 2 && i === 2) && !cells[i * 5 + (4 - i)].classList.contains('numero-sorteado')) {
                diagonal2Completa = false;
            }
        }
        if (diagonal1Completa) {
            alert(`A cartela ${nomeCartela} completou 5 números marcados na diagonal!`);
            return;
        }
        if (diagonal2Completa) {
            alert(`A cartela ${nomeCartela} completou 5 números marcados na diagonal!`);
            return;
        }
    }
}

document.getElementById('btnSortearNumero').addEventListener('click', sortearNumero);
