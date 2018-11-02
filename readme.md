mongo
schow dbs //  list of db
use projectdb
show collections
db.blogs.find().pretty()


_________________________
#Deployment
Добавляем в GIT проект
.gitignore: /node_modules


ps.kz
oblako.kz
https://www.digitalocean.com/


Настройка
dns-zone: IP vps - domain

Подключение к VPS через SSH
ssh root@<IP ADDRESS>
password

cd /opt

git clone <URL_of_repository>

#install NVM
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps


install NODEJS
nvm install 

#install MONGODB
https://www.digitalocean.com/community/tutorials/mongodb-ubuntu-16-04-ru

#install PM2 - for create Nodejs as demon
http://pm2.keymetrics.io/docs/usage/quick-start/
npm install pm2 -g

cd /opt/project
pm2 start server.js --name process_name


#install ngninx
sudo apt-get install nginx

https://medium.com/@utkarsh_verma/configure-nginx-as-a-web-server-and-reverse-proxy-for-nodejs-application-on-aws-ubuntu-16-04-server-872922e21d38

vi /etc/nginx/sites-available/default		//open file
delete all content into file


add for project server:
server {
    listen 80;
    server_name your_domain.com;
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }
}


Check config ngnix:
ngnix -t

Start ngnix as service:
sudo servece ngnix restart


install SSL-cert for https
https://certbot.eff.org/all-instructions
https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx.html
