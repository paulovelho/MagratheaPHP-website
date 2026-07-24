<?php
require __DIR__ . "/../vendor/autoload.php";

try {
	Magrathea2\MagratheaPHP::Instance()
		->AppPath(realpath(dirname(__FILE__)))
		->AddRootCodeFolder("api")
		->Prod()
		->Load();
} catch (Exception $ex) {
	\Magrathea2\p_r($ex);
}
