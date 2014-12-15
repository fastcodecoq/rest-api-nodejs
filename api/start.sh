#!/bin/sh

sudo git pull
sudo dbUser='soluntech' dbPass='$_S0lunt3ch;' dbUrl='localhost' dbName='cyz' s3Key='' s3Secret='' node main.js

