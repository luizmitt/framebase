<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Informações da app
    |--------------------------------------------------------------------------
    |
    | Esse valor determina dados da app.
    |
    */
    'APP_NAME'    => 'ADMIN',
    'APP_VERSION' => 'beta',
    'APP_TITLE'   => 'Administrativo PMM',

    /*
    |--------------------------------------------------------------------------
    | Protocolo de acesso a app.
    |--------------------------------------------------------------------------
    |
    | Este valor determinar o protocolo de acesso a app..
    | Padrão: http.
    |
    */
    'PROTOCOL' => 'http',

    /*
    |--------------------------------------------------------------------------
    | Debug da aplicação
    |--------------------------------------------------------------------------
    |
    | Esse valor determina se a aplicação estará em modo de debug.
    | Padrão: true.
    |
    */
    'DEBUG' => true,

    /*
    |--------------------------------------------------------------------------
    | Chave de Seguraça
    |--------------------------------------------------------------------------
    | Este determina a chave de segurança desta aplicação. É extremamente
    | recomendado alterar este valor antes utilizar sua aplicação.
    |
    */
    'KEY' => '8ffa403ae0c6b573abd340bd3dade57c',

    /*
    |--------------------------------------------------------------------------
    | Data/Hora
    |--------------------------------------------------------------------------
    | Este determina data e hora do servidor da aplicação.
    |
    */
    'TIMEZONE' => 'America/Manaus',

    /*
    |--------------------------------------------------------------------------
    | Idioma da aplicação
    |--------------------------------------------------------------------------
    | Este determina qual o idioma principal da aplicação
    | Padrão: pt_BR
    |
    */
    'LOCALE' => 'pt_BR',

    /*
    |--------------------------------------------------------------------------
    | Controlador Principal
    |--------------------------------------------------------------------------
    | Este determina qual o controller inicial da aplicação.
    | Padrão: painel
    |
    */
    'DEFAULT_CONTROLLER' => 'painel',

    /*
    |--------------------------------------------------------------------------
    | Tema
    |--------------------------------------------------------------------------
    | Este determina qual o tema da aplicação.
    | Padrão: thupan, pode-se utilizar o tema da prefeitura: pmm
    |
    */
    'DEFAULT_THEME' => 'pmm',

    /*
    |--------------------------------------------------------------------------
    | Diretórios Públicos
    |--------------------------------------------------------------------------
    | Este determina a url para acesso a aplicação.
    |
    | NOTE: /public é o diretório raíz portanto não precisa especificar.
    |
    */
    'BOWER_COMPONENTS'     => 'assets/thupan/bower_components/',
    'DEBUGBAR_RESOURCES'   => 'assets/thupan/debug/',

    /*
    |--------------------------------------------------------------------------
    | Twig
    |--------------------------------------------------------------------------
    | Este determina a configuração do gerenciador de templates.
    |
    */
    'TWIG_VIEWS'                => __DIR__ . '/../Http/Views/',
    'TWIG_CACHE'                => __DIR__ . '/../Store/Cache/',
    'TWIG_AUTO_ESCAPE'          => true,
    'TWIG_AUTO_RELOAD'          => true,
    'TWIG_TAG_BLOCK'            => ['{%', '%}'],
    'TWIG_TAG_VARIABLE'         => ['{{', '}}'],
    'TWIG_TAG_COMMENT'          => ['{#', '#}'],
    'TWIG_TAG_INTERPOLATION'    => ['#{', '}'],
    'TWIG_PAGE_LANG'            => 'pt_BR',
    'TWIG_PAGE_CHARSET'         => 'utf8',

    /*
    |--------------------------------------------------------------------------
    | Sessão
    |--------------------------------------------------------------------------
    | Este determina a configuração de sessão
    |
    */
    'SESSION_EXPIRE'            => 60, // min
    'SESSION_COOKIE_HTTPONLY'   => true,
];
