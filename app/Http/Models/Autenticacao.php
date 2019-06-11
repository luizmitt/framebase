<?php

namespace App\Http\Models;

use \App\Domain\AppModel as Model;

class Autenticacao extends Model {
    // não faz validação do model automatico.
    public $validate = false;

    public static function login($data) {
        $env = \App\Helpers\Session::get('s_environment');
        $config = autoload_config();
        extract($data);

        $host = $config['database']['connections'][$env][0]['host'] . ':' . $config['database']['connections'][$env][0]['port'] . '/' . $config['database']['connections'][$env][0]['database'];
        
        return @oci_connect($username, $password, $host);
    }

    public static function validaAcesso($ID_USUARIO) {
        return self::query("SELECT * FROM GRUPO_USUARIO WHERE ID_USUARIO = $ID_USUARIO AND ID_GRUPO = 1");
    }
}
