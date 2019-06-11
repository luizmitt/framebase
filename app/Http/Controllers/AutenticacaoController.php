<?php

namespace App\Http\Controllers;

use \Database\Database;

use \App\Domain\AppController as Controller;
use \App\Domain\AppView as View;
use \App\Domain\AppModel as Mode;

use \App\Exception\Exception as Exception;

use \App\Http\Models\Autenticacao;

use \App\Helpers\Request;
use \App\Helpers\Redirect;
use \App\Helpers\Session;

class AutenticacaoController extends Controller {

    public $auth = false;

    public function __construct() {
        parent::__construct();
    }

    public function validarSenha() {
            View::flash("Sua senha foi alterada com sucesso.", 'success');
            Redirect::to("autenticacao");
    }

    public function alterarSenha() {
        Request::post($data, false);

        extract($data);

        // exp reg oara no minimo 6 caracteres
        $min6c   = "/^[a-zA-Z0-9]{6,}$/";
        // exp reg para no minimo 1 letra minuscula
        $min1lmi = "/(?=[a-z]{1,})[a-zA-Z0-9]+/";
        // exp reg para no minimo 1 letra maiuscula
        $min1lma = "/(?=[A-Z]{1,})[a-zA-Z0-9]+/";
        // exp reg para no minimo 1 numero
        $min1nu  = "/(?=[0-9]{1,})[a-zA-Z0-9]+/";


        if(!preg_match($min6c, $password_new)) {
            $error[] = "minínimo 6 caracteres.";
        }

        if(!preg_match($min1lmi, $password_new)) {
            $error[] = "minínimo 1 letra minuscula.";
        }

        if(!preg_match($min1lma, $password_new)) {
            $error[] = "minínimo 1 letra maiuscula.";
        }

        if(!preg_match($min1nu, $password_new)) {
            $error[] = "minínimo 1 número.";
        }


        if($error) {
            echo json_encode(['erro' => implode("<br />", $error)]);
            exit;
        }

        if(!Autenticacao::ociChangePassword($username, $password_current, $password_new)) {
            echo json_encode(['erro' => 'não foi possível alterar a senha.']);
        } else {
            echo json_encode(['success' => 'senha alterada com sucesso!']);
        }

    }

    public function index() {
        View::assign('environment', [
                                ''     => translate('app', 'choose'),
                                'dev'  => translate('app', 'development'),
                                'hom'  => translate('app', 'statement'),
                                'pro'  => translate('app', 'production'),
        ]);

        View::render("autenticacao/index");
    }

    public function run() {
        Request::post($data, false);

        // Session::set('s_username', $data['username']);
        // Session::set('s_password', base64_encode($data['password']));

        if(!$data['environment']) {
            $data['environment'] = $this->config['database']['DB_DEFAULT_ENV'];
        }

        Session::set('s_environment', $data['environment']);

        Session::set('s_username', $this->config['database']['connections'][$data['environment']][0]['username']);
        Session::set('s_password', base64_encode($this->config['database']['connections'][$data['environment']][0]['password']));   

        $database = new \Database\Database();
        $database = $database->getInstance();

        if($error = $database->getError()) {
            preg_match('/ORA-([0-9]*)/', $error[0], $code);

            switch($code[1]) {
                case '01017':
                    $error = 'Usuário ou senha inválidos.';
                break;

                case '12543':
                    $error = 'Comunicação com o banco de dados não estabelecida!. :-(';
                break;

                case '12545':
                    $error = 'Não foi possível conectar com o banco de dados. :-(';
                break;

                case '28001':
                    Session::set('login_expired', true);
                    $error = '[28001] Sua conta expirou, altere sua senha agora. clique <a id="as_btn_modal" href="#">aqui</a>.';
                    // fazer redirect para paginar de alterar senha!
                break;

                case '28000':
                    $error = 'Sua conta foi <strong>BLOQUEADA</strong>!, por favor entre em contato com a equipe dos SISTEMAS PMM, pelo e-mail <a href="mailto:sistemaspmm@pmm.am.gov.br">sistemaspmm@pmm.am.gov.br</a>, para desbloqueio da conta.';
                break;

                case '28011':
                    //Session::set('login_will_expire', 'Sua conta irá expirar em breve, altere sua senha agora. clique <a href="#">aqui</a>.');
                    Session::set('login_expired', true);
                    $error = '[28011] Sua conta expirou, altere sua senha agora. clique <a id="as_btn_modal" href="#">aqui</a>.';
                break;

                case '01045':
                    $error = 'Sua conta não tem permissão para logar no sistemas pmm. Por favor entre em contato com a equipe dos SISTEMAS PMM, pelo e-mail <a href="mailto:sistemaspmm@pmm.am.gov.br">sistemaspmm@pmm.am.gov.br</a>, para resolver o problema.';
                break;

                default:
                    $error = 'Oops! Ocorreu um erro interno, entre em contato com a equipe dos SISTEMAS PMM, pelo e-mail <a href="mailto:sistemaspmm@pmm.am.gov.br">sistemaspmm@pmm.am.gov.br</a>. :-( Code Error: ' . $code[1];
            }

            View::flash($error, 'danger');
            Redirect::to('autenticacao');
        } else {
            if($this->config['database']['DB_AUTH']) {
                Session::set('s_loggedIn', Session::get('s_token') . md5($data['username'].$data['password']));
                foreach(Autenticacao::getUserInfo($data['username']) as $index => $array) {
                    foreach($array as $key => $value) {
                        Session::set($key, $value);
                    }
                }
            } else {
                if(Autenticacao::login($data)) {

                    foreach(Autenticacao::getUserInfo($data['username']) as $index => $array) {
                        foreach($array as $key => $value) {
                            Session::set($key, $value);
                        }
                    }

                    if (!Autenticacao::validaAcesso(Session::get('ID_USUARIO'))) {
                        View::flash('Você não tem permissão para acessar este sistema.', 'danger');
                        Redirect::to('/');
                        die;
                    }

                    Session::set('s_loggedIn', Session::get('s_token') . md5($array['ID_USUARIO']));
     
                } else {
                    View::flash(translate('autenticacao', 'login_invalid'), 'danger');
                }
            }
            Redirect::to('/');
        }
    }

    public static function logout() {
        \App\Helpers\Auth::logout();
    }
}
