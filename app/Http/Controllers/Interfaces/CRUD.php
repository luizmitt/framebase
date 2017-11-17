<?php

namespace App\Http\Controllers\Interfaces;

interface CRUD {
    public function index();
    public function detail($id);
    public function novo();
    public function edit($id);
    public function delete($id);
    public function save();
}
