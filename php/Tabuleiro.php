<?php

    class Tabuleiro {

        private $tabuleiro;
        public function __construct() {
            $this->tabuleiro = [
                ['p', null, 'p', null, 'p', null, 'p', null],
                [null, 'p', null, 'p', null, 'p', null, 'p'],
                ['p', null, 'p', null, 'p', null, 'p', null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, 'b', null, 'b', null, 'b', null, 'b'],
                ['b', null, 'b', null, 'b', null, 'b', null],
                [null, 'b', null, 'b', null, 'b', null, 'b'],
            ];
        }

        public function getTabuleiro() {

            return $this->tabuleiro;
        
        }


        
    
    }


    



?>