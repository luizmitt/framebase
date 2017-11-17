#!/bin/bash

if command -v bower > /dev/null;
	then echo 'Detected bower...';
	else echo 'Updating bower...';
		sudo npm update -g bower;
fi;

if command -v gulp > /dev/null;
	then echo 'Detected gulp...';
	else echo 'Updating gulp...';
		sudo npm update -g `cat package.files | xargs -d'\n'`;
fi;

if diff bower.json bower.lock > /dev/null;
	then echo 'ok';
	else echo 'bower update';
		cd ${PWD}
		bower update;
		sh ${PWD}/resources/scripts/config_gulp.sh;
		cp -rf bower.json bower.lock;
fi;
