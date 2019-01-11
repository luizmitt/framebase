<?php

define('AUTH_API_DIR', __DIR__.'/../../vendor/thupan/pmm/src/PmmRouterAuthAPI.php');

if (file_exists(AUTH_API_DIR)) {
    require_once AUTH_API_DIR;
}
