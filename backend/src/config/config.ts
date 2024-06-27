// PORT
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;

// MongoDB
const mongo_ip =  process.env.MONGO_IP ? process.env.MONGO_IP : 'localhost';
const mongo_port =  process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT) : 27017;
const mongo_user =  process.env.MONGO_INITDB_ROOT_USERNAME? process.env.MONGO_INITDB_ROOT_USERNAME : 'root'
const mongo_password =  process.env.MONGO_INITDB_ROOT_PASSWORD? process.env.MONGO_INITDB_ROOT_PASSWORD : '12345678'
const mongo_db = process.env.MONGO_INITDB_DATABASE? process.env.MONGO_INITDB_DATABASE : 'petdb'

// MySQL
const mysql_ip = process.env.MYSQL_IP ? process.env.MYSQL_IP : 'localhost';
const mysql_port =  process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306;
const mysql_user = process.env.MYSQL_USER ? process.env.MYSQL_USER : 'root';
const mysql_password = process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : '12345678';
const mysql_db = process.env.MYSQL_DB ? process.env.MYSQL_DB : 'userdb';


export {
    port, 
    mongo_ip, mongo_port, mongo_user, mongo_password, mongo_db,
    mysql_ip, mysql_port, mysql_user, mysql_password, mysql_db
}