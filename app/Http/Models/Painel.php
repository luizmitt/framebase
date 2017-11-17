<?php

namespace App\Http\Models;

use \App\Domain\AppModel as Model;

class Painel extends Model {

    // não valida permissão de acesso
    public $validate = false;
}
