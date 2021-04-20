#!/bin/bash
HOST="localhost"
DB="musicdesign"
USER="root"
PASS="sunliquan123"
PORT="3306"
DIR="./db/models"
JSON_DEFINED="./definitions.json"
# EXEC="sequelize-auto -o ${DIR} -d ${DB} -h ${HOST} -u ${USER} -p ${PORT} -x ${PASS} -e mysql -a ${JSON_DEFINED}"

sequelize-auto -o './db/models' -d musicdesign -h localhost -u root -p 3306 -x sunliquan123 -e mysql -a ./definitions.json