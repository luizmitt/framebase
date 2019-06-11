<?php

use \Routing\Router;
use \App\Domain\AppView as View;
use \App\Domain\AppModel as Model;
// exemplo
// Router::get('/controller/(:any)/(:any)', function($id, $text) {
//     echo "id: $id <br/> text: $text <br/>";
// });

Router::any('/xhrMenuSearch', function() {
    \App\Helpers\Request::post($data);
    echo Model::getMenuSearch($data['TX_SISTEMA'], $data['TX_SEARCH']);
});

Router::get('/pmm-generator', function() {
    if(\Service\Session::get('s_environment') === 'pro') {
        View::render("@templates/Error/404");
        return;
    }

    View::render("@stemplates/Generator/index");
});

Router::get('/thupan-generator/pmm/(:any)', function($model) {
    echo Model::$model();
});

Router::any('/xhr_preview', function() {
    $g = new \Generator\Generator();
    echo $g->query();

});

Router::any('/xhr_generate_program', function() {
    $g = new \Generator\Generator();
    $g->generate();
});

// essa é a rota de teste
Router::get('/api/login/(:any)/(:any)', function($username, $password) {

    $environment = 'dev';

    // se não tiver retorno, então conexao foi realizada!
    if(!$erro = \Service\Auth::connection($username, $password, $environment, $connection = null)) {



        // prepara os dados
        $data = [
			  'TX_OBJETO_BD' => 'awqwerty009',
			'CS_TIPO_OBJETO' => 1,

         ];

        \App\Http\Models\Objeto::pesquisar(null);
        \App\Http\Models\Objeto::delete('OBJETO_BD', 'ID_OBJETO_BD = 2516');
        \App\Http\Models\Objeto::add($data);
        \App\Http\Models\Objeto::pesquisar(null);

        dd( \App\Http\Models\Objeto::getQueries());

    } else {
        // se houver retorno, mostra msg de erro.
        echo 'não foi possivel fazer login. causa: '. $erro[0];
    }

});
