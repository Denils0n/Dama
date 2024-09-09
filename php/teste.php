<?php
    session_start();

    // Funções de inicialização e manipulação do tabuleiro

    function moverPeca(&$tabuleiro, $origem, $destino) {
        if ($origem < 0 || $origem >= 64 || $destino < 0 || $destino >= 64) {
            return false;
        }

        if ($tabuleiro[$origem] === null || $tabuleiro[$destino] !== null) {
            return false;
        }

        $tabuleiro[$destino] = $tabuleiro[$origem];
        $tabuleiro[$origem] = null;

        return true;
    }

    function capturarPeca(&$tabuleiro, $origem, $destino) {
        if ($origem < 0 || $origem >= 64 || $destino < 0 || $destino >= 64) {
            return false;
        }

        if ($tabuleiro[$origem] === null || $tabuleiro[$destino] !== null) {
            return false;
        }

        $meio = ($origem + $destino) / 2;

        if ($tabuleiro[$meio] === null || $tabuleiro[$meio] === $tabuleiro[$origem]) {
            return false;
        }

        $tabuleiro[$destino] = $tabuleiro[$origem];
        $tabuleiro[$origem] = null;
        $tabuleiro[$meio] = null;

        return true;
    }

    // Processar movimentos
   
    if (isset($_POST['origem']) && isset($_POST['destino'])) {
        $origem = intval($_POST['origem']);
        $destino = intval($_POST['destino']);
        $acao = $_POST['acao'];
        

        if ($acao === 'mover') {
            moverPeca($_SESSION['tabuleiro'], $origem, $destino);
            print_r($_SESSION['tabuleiro']);
            return;
        } elseif ($acao === 'capturar') {
            capturarPeca($_SESSION['tabuleiro'], $origem, $destino);
        }
    }


    // Redireciona de volta para a página principal
    header("Location: index.php");
    exit;
