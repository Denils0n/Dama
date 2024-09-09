const socket = io();

let jogadorAtual = null;
let pecaSelecionada = null;

const tabuleiro = document.getElementById('tabuleiro');
const linhas = 8;
const colunas = 8;

function criarTabuleiro(tabuleiroEstado) {
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro existente
    console.log('Criando tabuleiro com estado:', tabuleiroEstado);
    for (let y = 0; y < linhas; y++) {
        for (let x = 0; x < colunas; x++) {
            const quadrado = document.createElement('div');
            quadrado.classList.add('quadrado');
            quadrado.setAttribute('data-x', x);
            quadrado.setAttribute('data-y', y);

            if ((x + y) % 2 === 0) {
                quadrado.classList.add('cor-clara');
            } else {
                quadrado.classList.add('cor-escura');
                const corPeca = tabuleiroEstado[y][x];
                console.log(`Criando peça em (${x}, ${y}) com cor: ${corPeca}`);
                if (corPeca) {
                    const peca = document.createElement('div');
                    peca.classList.add('peca', corPeca);
                    quadrado.appendChild(peca);
                }
            }

            quadrado.addEventListener('click', onClickQuadrado);
            tabuleiro.appendChild(quadrado);
        }
    }
    atualizarStatusTurno();
}


// Função chamada ao clicar em um quadrado
function onClickQuadrado(event) {
    const quadrado = event.currentTarget;
    const peca = quadrado.querySelector('.peca');

    if (pecaSelecionada) {
        if (quadrado.classList.contains('destacar')) {
            if (pecaSelecionada.classList.contains(jogadorAtual)) {
                const xAntigo = parseInt(pecaSelecionada.parentElement.getAttribute('data-x'));
                const yAntigo = parseInt(pecaSelecionada.parentElement.getAttribute('data-y'));
                const xNovo = parseInt(quadrado.getAttribute('data-x'));
                const yNovo = parseInt(quadrado.getAttribute('data-y'));

                socket.emit('moverPeca', { cor: jogadorAtual, xAntigo, yAntigo, xNovo, yNovo });
            } else {
                alert('Não é a sua vez de mover esta peça.');
            }
        }
        pecaSelecionada.classList.remove('selecionada');
        pecaSelecionada = null;
        removerDestaque();
    } else if (peca && peca.classList.contains(jogadorAtual)) {
        pecaSelecionada = peca;
        peca.classList.add('selecionada');
        destacarMovimentos(quadrado);
    } else {
        alert('Selecione uma peça sua para mover.');
    }
}

// Atualiza o status do turno
function atualizarStatusTurno() {
    const statusTurno = document.getElementById('status-turno');
    if (statusTurno) {
        statusTurno.textContent = `É a vez das peças ${jogadorAtual === 'branca' ? 'brancas' : 'pretas'}`;
    }
}

// Recebe o estado do jogo do servidor
socket.on('estadoJogo', (dados) => {
    console.log('Estado do jogo recebido:', dados); // Correto
    criarTabuleiro(dados.tabuleiro);
    jogadorAtual = dados.turnoAtual;
    atualizarStatusTurno();
});

socket.on('atribuirCor', (dados) => {
    console.log('Cor recebida:', dados.cor); // Correto
    jogadorAtual = dados.cor;
    atualizarStatusTurno();
});

socket.on('erro', (dados) => {
    alert(dados.mensagem);
});

// Função para destacar os quadrados onde a peça pode se mover
function destacarMovimentos(quadrado) {
    const x = parseInt(quadrado.getAttribute('data-x'));
    const y = parseInt(quadrado.getAttribute('data-y'));
    const pecaAtual = quadrado.querySelector('.peca');

    // Remove qualquer destaque existente
    removerDestaque();

    // Lógica para destacar quadrados válidos para movimento e captura
    document.querySelectorAll('.quadrado').forEach(el => {
        const ex = parseInt(el.getAttribute('data-x'));
        const ey = parseInt(el.getAttribute('data-y'));

        // Verifica se a peça pode se mover para frente (normalmente apenas uma casa diagonal)
        if (Math.abs(ex - x) === 1 && Math.abs(ey - y) === 1) {
            if (pecaAtual.classList.contains('branca') && ey > y && !el.querySelector('.peca')) {
                el.classList.add('destacar');
            } else if (pecaAtual.classList.contains('preta') && ey < y && !el.querySelector('.peca')) {
                el.classList.add('destacar');
            }
        }

        // Verifica captura (movimento de 2 casas)
        if (Math.abs(ex - x) === 2 && Math.abs(ey - y) === 2) {
            const xEntre = (x + ex) / 2;
            const yEntre = (y + ey) / 2;
            const quadradoEntre = document.querySelector(`[data-x="${xEntre}"][data-y="${yEntre}"]`);
            const pecaEntre = quadradoEntre.querySelector('.peca');

            // Se houver uma peça adversária entre as coordenadas e o destino estiver vazio
            if (pecaEntre && !pecaEntre.classList.contains(jogadorAtual) && !el.querySelector('.peca')) {
                el.classList.add('destacar');
            }
        }
    });
}

// Função para remover destaque de todos os quadrados
function removerDestaque() {
    document.querySelectorAll('.destacar').forEach(el => {
        el.classList.remove('destacar');
    });
}

// Chama a função para criar o tabuleiro quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    socket.emit('iniciarJogo'); // Solicita o estado inicial do jogo
});
