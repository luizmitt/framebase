#!/bin/bash

if command -v bower > /dev/null;
	then echo 'Detected bower...';
	else echo 'Installing bower...';
		sudo npm install -g bower;
fi;

if command -v gulp > /dev/null;
	then echo 'Detected gulp...';
	else echo 'Installing gulp...';
		sudo npm install -g `cat package.files | xargs -d'\n'`;
fi;

echo 'bower install';
cd ${PWD}
bower install;
sh ${PWD}/resources/scripts/config_gulp.sh;
cp -rf bower.json bower.lock;