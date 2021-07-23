#!/bin/bash
cd /home/ubuntu/enstagram/server
sudo npm install
sudo npm install pm2@latest -g
sudo npm install mysql
sudo npm install mysql2
sudo npm install cors
sudo npm install sequelize sequelize-cli
sudo npm install cookie-parser
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo touch /etc/authbind/byport/443
sudo chown ubuntu /etc/authbind/byport/80
sudo touch /etc/authbind/byport/443
sudo chmod 755 /etc/authbind/byport/80
sudo touch /etc/authbind/byport/443