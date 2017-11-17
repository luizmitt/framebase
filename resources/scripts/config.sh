#!/bin/bash

arr=['apuau','cruxati','daraa'];
if echo ${arr[@]} | grep -q -w ${HOSTNAME} > /dev/null;
	then echo "Applications Server" ${HOSTNAME};
	else
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
fi;
