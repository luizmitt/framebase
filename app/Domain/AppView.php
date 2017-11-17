<?php
/**
 * Classe que contem todas as regras de view da aplicação.
 */

namespace App\Domain;

use \Routing\Router;
use \Kernel\View;
use \App\Helpers\Session;

use \App\Helpers\XHR;
use \Thupan\Pmm\PmmView;

class AppView extends PmmView {

    public static function setConfig() {
        // adicionar funçoẽs personalizadas para view a partir desta linha
        //
        //self::$functions[] = new \Twig_SimpleFunction('nomedafuncao', function($args) {
           // codigo da funcao
        //});

        // não remover esta linha
        parent::setConfig();
    }

    // Override
    public static function render($template, $data = []) {

        self::setConfig();

        $data = (self::$data) ? array_merge(self::$data, $data) : $data;

        $template = str_replace('.', '/', $template);

        echo self::getInstance()->render($template . EXT_TWIG, $data);
    }
}
