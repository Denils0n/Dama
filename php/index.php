<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabuleiro de Dama</title>
    <style>
        .tabuleiro {
            display: grid;
            grid-template-columns: repeat(8, 60px); /* Ajuste para considerar o espaçamento */
            grid-template-rows: repeat(8, 60px); /* Ajuste para considerar o espaçamento */
            gap: 0;
            border: 1px solid #000;
            width: 480px; /* 8 colunas x 60px cada */
            height: 480px; /* 8 linhas x 60px cada */
            margin: 20px auto; /* Centralizar o tabuleiro */
        }
        .quadrado {
            width: 60px; /* Ajuste o tamanho dos quadrados */
            height: 60px; /* Ajuste o tamanho dos quadrados */
            box-sizing: border-box; /* Inclui a borda e o padding no tamanho total */
            border: 1px solid #000; /* Borda para separar os quadrados */
        }
        .quadrado.cor-clara {
            background-color: #f0d9b5; /* Cor clara */
        }
        .quadrado.cor-escura {
            background-color: #b58863; /* Cor escura */
        }
        .peca {
            width: 40px; /* Ajuste o tamanho das peças */
            height: 40px; /* Ajuste o tamanho das peças */
            border-radius: 50%;
            background-color: red; /* Cor da peça */
            margin: auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        .peca.branca {
            background-color: white;
        }
    </style>
</head>
<body>
    <div class="tabuleiro">
        <?php
        $pecas = [
            ['x' => 1, 'y' => 0, 'cor' => 'branca'],
            ['x' => 2, 'y' => 1, 'cor' => 'branca'],
            ['x' => 3, 'y' => 0, 'cor' => 'branca'],
            ['x' => 1, 'y' => 2, 'cor' => 'preta'],
            ['x' => 2, 'y' => 3, 'cor' => 'preta'],
            ['x' => 3, 'y' => 2, 'cor' => 'preta'],
            // Adicione mais peças conforme necessário
        ];

        for ($i = 0; $i < 64; $i++) {
            $x = $i % 8;
            $y = floor($i / 8);

            // Definindo a cor do quadrado com base em sua posição
            $corQuadrado = (($x + $y) % 2 == 0) ? 'cor-clara' : 'cor-escura';

            $peca = '';
            foreach ($pecas as $p) {
                if ($p['x'] == $x && $p['y'] == $y) {
                    $peca = "<div class='peca {$p['cor']}'></div>";
                    break;
                }
            }

            echo "<div class='quadrado {$corQuadrado}'>{$peca}</div>";
        }
        ?>
    </div>
</body>
</html>
