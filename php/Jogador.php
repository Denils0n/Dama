<?php

    class Jogador {

        private $nome;
        private $cor;
        private $pontuar;


        public function __construct($nome, $cor, $pontuar) {
            $this->nome = $nome;
            $this->cor = $cor;
            $this->pontuar = $pontuar;
        }
    
        public function getNome() {
            return $this->nome;
        }
        
        public function getCor() {
            return $this->cor;
        }
    
        public function getPontuar() {
            return $this->pontuar;
        }
    
    }
    $tab = new Jogador("as", "asd", "asd");

    print_r ($tab);


?>