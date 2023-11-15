systemctl start docker 

docker run -d \
 -p 27017:27017 \
 --name smsgfx-api-mongo \
 -v mongo-data:/data/db \
 -e MONGODB_INITDB_ROOT_USERNAME=smsgfx-user \
 -e MONGODB_INITDB_ROOT_PASSWORD=smsgfx-pass \
 mongo:latest