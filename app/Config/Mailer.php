<?php

return [
        'smtp' => [
            'debug'     => 0,
            'secure'    => '',	// padrão tls
            'host'      => 'email.pmm.am.gov.br',	// webmail.manaus.am.gov.br',	// ip 172.17.100.5
            'port'      => '587',	// padrão 25
            'auth'      => true,
            'name'      => 'Sistemas PMM',
            'email'     => 'admin.sistemaspmm@pmm.am.gov.br',
            'username'  => 'admin.sistemaspmm@pmm.am.gov.br',
            'password'  => 'Admin2013',
        ],

        'imap' => [

        ],

        'pop3' => [

        ],

        'options' => [
            'ssl' => [
                'verify_peer'       => false,
                'verify_peer_name'  => false,
                'allow_self_signed' => true
            ],
        ],
];
