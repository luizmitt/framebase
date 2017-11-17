<?php
/**
 * Classe que contem todas as regras de controller da aplicação.
 */

namespace App\Domain;

use \App\Domain\AppView as View;
use \Thupan\Pmm\PmmController;

class AppController extends PmmController {
    // para acessar um controller é obrigatorio estar logado.
    public $auth = true;

    public function __construct() {
        parent::__construct();
        // define variaveis para twig para verificar permissao de acesso.
        if(\Routing\Router::getControllerName() != 'autenticacao') {
  	// registros globais aqui.
  
        }
    }
}
