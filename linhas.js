// Função para preencher os números da cartela do bingo
function preencherCartelaNumeros(cartela, numeros) {
    numeros.forEach((linhaNumeros, i) => {
        let linhaElement = document.createElement('div');
        linhaElement.className = 'row';
        cartela.appendChild(linhaElement);

        linhaNumeros.forEach((numero, j) => {
            let cell = document.createElement('div');
            cell.className = 'cell';
            if (!(i === 2 && j === 2)) {
                cell.textContent = numero ? adicionarZeros(numero) : '';
            } else {
                cell.textContent = ''; 
                cell.classList.add('free-space'); 
            }
            linhaElement.appendChild(cell);
        });
    });
}

// Função para adicionar uma nova cartela
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
            let input = prompt(`Digite os números da linha ${i + 1}, separados por vírgula (5 números):`);
            let numeros = input.split(',').map(num => parseInt(num.trim()));
            if (i === 2) numeros[2] = 0; // Define o valor central da linha 3 como 0
            numerosCartela.push(numeros);
        }

        let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
        cartelasSalvas.push({ nome: cartelaNome, numeros: numerosCartela });
        localStorage.setItem('cartelas', JSON.stringify(cartelasSalvas));

        preencherCartelaNumeros(novaCartela, numerosCartela);
    }
});

// Função para carregar cartelas do armazenamento local
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

// Função para excluir uma cartela
function excluirCartela(botaoExcluir) {
    let cartela = botaoExcluir.parentElement;
    cartela.remove();

    let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
    let nomeCartelaExcluir = cartela.getAttribute('data-nome');
    let novaListaCartelas = cartelasSalvas.filter(cartela => cartela.nome !== nomeCartelaExcluir);
    localStorage.setItem('cartelas', JSON.stringify(novaListaCartelas));
}

function adicionarZeros(numero) {
    return numero < 10 ? '0' + numero : numero;
}

carregarCartelasDoLocalStorage();
