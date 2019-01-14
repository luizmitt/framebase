<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Estilo de retorno do PDO
    |--------------------------------------------------------------------------
    | Por padrão, o banco de dados retorna a instancia de dados em array.
    | Mas pode ser alterado conforme a sua necessidade.
    |
    | Padrão: PDO::FETCH_ASSOC
    | Opcional: PDO::FETCH_CLASS
    */
    'DB_FETCH' => PDO::FETCH_ASSOC,

    /*
    |--------------------------------------------------------------------------
    | Servidor de Banco Padrão
    |--------------------------------------------------------------------------
    | Este determina o servidor padrão da aplicação caso não seja informado na
    | tela de login ou caso seja removido a escolha da tela de login.
    |
    */
    'DB_DEFAULT_ENV' => 'dev',

    /*
    |--------------------------------------------------------------------------
    | Estilo de conexão
    |--------------------------------------------------------------------------
    | Este determina o tipo de conexão com o banco de dados.
    |
    | Opções disponiveis: table ou database.
    |
    | Modo table: false.
    | Modo database: true.
    |
    */
    'DB_AUTH' => true,

    /*
    |--------------------------------------------------------------------------
    |Nome de conexão do Banco Padrão
    |--------------------------------------------------------------------------
    | Este determina o nome da conexão padrão do banco de dados
    |
    */
    'DB_DEFAULT_CONN' => 'conn1',

    /*
    |--------------------------------------------------------------------------
    | Alter Session do Oracle
    |--------------------------------------------------------------------------
    | Pode definir todas as alter sessions do oracle dentro da chave DB_OCI_NLS
    | se a chave não existir então o padrão do oracle será definido.
    |
    */
    'DB_OCI_NLS' => [
    'NLS_TERRITORY' => 'BRAZIL',
    'NLS_LANGUAGE' => 'BRAZILIAN PORTUGUESE',
    'NLS_ISO_CURRENCY' => 'BRAZIL',
    'NLS_NUMERIC_CHARACTERS' => '.,',
    'NLS_DATE_FORMAT' => 'DD/MM/RRRR HH24:MI:SS',
    'NLS_SORT' => 'WEST_EUROPEAN_AI',
    'NLS_COMP' => 'BINARY',
    ],

    /*
    |--------------------------------------------------------------------------
    | Ambientes
    |--------------------------------------------------------------------------
    | Este determinar as possiveis conexoes de uma aplicacao
    |
    */
    'connections' => [
        'dev' => [
            [
            'driver' => 'oci',
            'autoload' => false,
            'connection' => 'conn1',
            'database' => 'pmmdev',
            'host' => '172.17.131.45', //'172.18.1.160',
            'port' => '1521',
            'username' => '',
            'password' => '',
            ],

            [
                'driver' => 'oci',
                'autoload' => true,
                'connection' => 'api',
                'database' => 'pmmdev',
                'host' => '172.17.131.45x', //'172.18.1.160',
                'port' => '1521',
                'username' => 'LUIZ_SCHMITT',
                'password' => '123456',
            ],

            [
            'driver' => 'mysql',
            'autoload' => false,
            'connection' => 'conn2',
            'database' => 'thupan',
            'host' => '172.17.121.35',
            'port' => '3306',
            'username' => '',
            'password' => '',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            ],

            [
            'driver' => 'mysql',
            'autoload' => false,
            'connection' => 'conn3',
            'database' => 'thupan',
            'host' => 'localhost',
            'port' => '3306',
            'username' => '',
            'password' => '',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            ],
        ],

        'hom' => [
            [
            'driver' => 'oci',
            'autoload' => true,
            'connection' => 'conn1',
            'database' => 'pmmhom',
            'host' => '172.17.131.45',
            'port' => '1521',
            'username' => '',
            'password' => '',
            ],

            [
            'driver' => 'mysql',
            'autoload' => false,
            'connection' => 'conn2',
            'database' => 'thupan',
            'host' => '172.17.121.34',
            'port' => '3306',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            ],
        ],

        'pro' => [
            [
            'driver' => 'oci',
            'autoload' => true,
            'connection' => 'conn1',
            'database' => 'pmm',
            'host' => 'pitua',
            'port' => '1521',
            'username' => '',
            'password' => '',
            ],

            [
            'driver' => 'mysql',
            'autoload' => false,
            'connection' => 'conn2',
            'database' => 'thupan',
            'host' => '172.17.121.33',
            'port' => '3306',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => false,
            'engine' => null,
            ],
        ],
    ],
];
