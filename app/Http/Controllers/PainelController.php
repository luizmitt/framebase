<?php

namespace App\Http\Controllers;

use \App\Domain\AppController as Controller;
use \App\Domain\AppView       as View;
use \App\Domain\AppModel      as Mode;

use \App\Exception\Exception as Exception;

use \App\Http\Models\Painel;

class PainelController extends Controller {

    // login obrigatório para ter acesso ao controlador.
    public $auth = true;

    public function index() {
        View::render("painel/index");
    }
}
