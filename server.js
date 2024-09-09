const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Estado do tabuleiro e turno
let tabuleiro = Array(8).fill(null).map(() => Array(8).fill(null));
let turnoAtual = 'branca';

// Inicializa o tabuleiro com peças
function inicializarTabuleiro() {
    tabuleiro = Array(8).fill(null).map(() => Array(8).fill(null));
    for (let y = 0; y < 3; y++) {
        for (let x = (y % 2); x < 8; x += 2) {
            tabuleiro[y][x] = 'branca';
        }
    }
    for (let y = 5; y < 8; y++) {
        for (let x = (y % 2); x < 8; x += 2) {
            tabuleiro[y][x] = 'preta';
        }
    }
}

// Função para mover uma peça
function moverPeca(xAntigo, yAntigo, xNovo, yNovo) {
    const corPeca = tabuleiro[yAntigo][xAntigo];
    tabuleiro[yNovo][xNovo] = corPeca;
    tabuleiro[yAntigo][xAntigo] = null;
    
    // Verifica captura
    if (Math.abs(xNovo - xAntigo) === 2) {
        const xEntre = (xAntigo + xNovo) / 2;
        const yEntre = (yAntigo + yNovo) / 2;
        tabuleiro[yEntre][xEntre] = null;
    }
}

// Configuração do servidor
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Novo jogador conectado');

    // Envia o estado inicial do tabuleiro e o turno para o novo jogador
    socket.emit('estadoJogo', { tabuleiro, turnoAtual });
    socket.emit('atribuirCor', { cor: turnoAtual });

    // Recebe movimento de peça do cliente
    socket.on('moverPeca', (dados) => {
        console.log('Movimento Recebido:', dados);
        if (dados.cor === turnoAtual) {
            moverPeca(dados.xAntigo, dados.yAntigo, dados.xNovo, dados.yNovo);
            turnoAtual = turnoAtual === 'branca' ? 'preta' : 'branca';
            io.emit('estadoJogo', { tabuleiro, turnoAtual });
        } else {
            socket.emit('erro', { mensagem: 'Não é a sua vez de jogar.' });
        }
    });

    socket.on('disconnect', () => {
        console.log('Jogador desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
    inicializarTabuleiro();
});
