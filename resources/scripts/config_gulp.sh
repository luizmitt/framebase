#!/bin/bash

rm -rf public/assets/dist
rm -rf public/assets/fonts
echo 'Start gulp';
cd ${PWD}
gulp
rm -rf resources/bower_components
rm -rf node_modules
