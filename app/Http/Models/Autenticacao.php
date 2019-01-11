<?php

namespace App\Http\Models;

use \App\Domain\AppModel as Model;

class Autenticacao extends Model {
    // não faz validação do model automatico.
    public $validate = false;

    public static function login($data) {
        extract($data);

        $password = md5($password);

        $data = self::query("SELECT count(ID_USUARIO) as LOGADO FROM USUARIO WHERE TX_LOGIN = '{$username}' AND TX_SENHA = '{$password}' ");

        return $data[0]['LOGADO'] == 1 ? true : false;
    }
}
