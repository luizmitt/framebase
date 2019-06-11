<?php

use \Routing\Router;
use \App\Domain\AppView as View;

Router::get('/docs', function() {
        View::render('@templates/Docs/index');
});
