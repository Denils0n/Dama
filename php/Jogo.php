<?php 
    require_once 'Tabuleiro.php';

    class Jogo {

        private $campo;
        public function __construct() {
            $this->campo = new Tabuleiro();
        }
    
        public function getCampo() {
            return $this->campo;
        }

        
        
    }


?>