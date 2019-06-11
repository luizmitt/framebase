<?php

namespace App\Helpers;

use \Thupan\Pmm\PmmSession;

class Session extends PmmSession {
    public static function validarAcesso() {
        // verifica se o usuário está logado
        if(self::validarUsuario()) {
            // faz a validacao de acesso.
            return true;
            // if(md5(self::get('ID_USUARIO')) === (str_replace(self::get('s_token'), '', self::get('s_token_access')))) {
            //     return true;
            // }
        }
    }

    public static function validarUsuario() {
        // se estiver logado
        if(self::get('s_loggedIn')) {
            // verifica se o token ainda é o mesmo de quando foi criado.
            if(self::get('s_token') . md5(self::get('ID_USUARIO')) === self::get('s_loggedIn')) {
                return true;
            }
        }
        return false;
    }
}
