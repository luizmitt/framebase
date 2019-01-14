<?php

namespace App\Http\Controllers;

use App\Domain\AppController as Controller;
use App\Domain\AppView as View;
use App\Http\Models\Auth;
use Service\Request;

class AuthController extends Controller
{
    public $auth = false;

    public function index()
    {
        View::render('auth.index');
    }

    public function getUserData()
    {
        Request::post($data, false);
        header('Content-Type: application/json');
        echo Auth::getUserByAccount($data['account']);
    }

    public function getUserAccess()
    {
        Request::post($data, false);
        header('Content-Type: application/json');
        echo Auth::getUserAccess($data);
    }
}
