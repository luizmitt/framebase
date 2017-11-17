<?php
/**
 * Verifica se o autoload do composer existe.
 */
$composer = __DIR__ . '/../../vendor/autoload.php';

file_exists($composer) ? require $composer : die("<h3 style='width:100%;height:auto;padding:30px;text-align:center'>É necessário a instalação do composer para inicializar o sistema. (<a href='https://getcomposer.org/doc/00-intro.md'>https://getcomposer.org/doc/00-intro.md</a>)<br><small style='float:right; margin-right:50px; font-weight:normal'>thupanframework</small></h3>");

/**
 * Carrega o bootstrap da app.
 */
require __DIR__ . '/bootstrap.php';
