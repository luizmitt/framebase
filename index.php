<?php

define(PROTOCOL, isset($_SERVER['HTTPS']) ? 'https://' : 'http://');
define(URL, $_SERVER['HTTP_HOST']);
define(REQUEST, $_SERVER['REQUEST_URI']);
header('LOCATION: '.PROTOCOL.URL.REQUEST.'/'.'public/');
