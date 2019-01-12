<?php

namespace App\Http\Controllers;

use \Database\Database;
use \App\Domain\AppController as Controller;
use \App\Domain\AppView as View;
use \App\Domain\AppModel as Mode;
use \App\Exception\Exception as Exception;
//use \App\Http\Models\Auth;
use \App\Helpers\Request;

class AuthController extends Controller {

    public $auth = false;

    public function index() {
        View::render("auth.index");
    }
}