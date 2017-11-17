<?php
 // não deixa os headers serem enviados ate que ocorra um clean.
ob_start();

header("X-Frame-Options: Deny");
header("X-Frame-Options: SameOrigin");

if (file_exists($tools_pmm = __DIR__ . '/../vendor/thupan/pmm/src/tools.php')) {
    require $tools_pmm;
}

// utilitarios e funções essenciais do frame
if (file_exists($tools_thupan = __DIR__ . '/../vendor/thupan/framework/src/Support/tools.php')) {
    require $tools_thupan;
}

// utilitarios e funcoes opcionais da app
if(file_exists($tools_app = __DIR__ . '/../app/Support/tools.php')) {
    require $tools_app;
}

// Override
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/../';

$config = require __DIR__ . '/../app/Config/App.php';

// seta o timezone da aplicação. Resolve problemas com o twig.
date_default_timezone_set($config['TIMEZONE']);

// refaz algumas configurações padroes do php
ini_set("memory_limit", "512M");
ini_set("display_errors", $config['DEBUG']);
ini_set("display_startup_errors", $config['DEBUG']);
ini_set("log_erros", true);
ini_set("error_log", __DIR__ . '/../app/Store/Log/error.log');
ini_set("upload_max_filesize", "30M");

error_reporting(E_ALL  & ~E_NOTICE);

$autoload = __DIR__ . '/../app/Boot/autoload.php';

// carrega o autoload
file_exists($autoload) ? require $autoload : die("<h3 style='width:100%;height:auto;padding:30px;text-align:center'>Oopss! Ocorreu um erro na instalação do framework.<br> Certifique se todos os arquivos foram copiados ou descompactados corretamente <br><small style='float:right; margin-right:50px; font-weight:normal'>thupanframework</small></h3>");

// inicializa as rotas
\Routing\Router::dispatch();

// libera o buffer
ob_end_flush();