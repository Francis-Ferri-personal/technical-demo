// PORT
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// MongoDB
const mongo_ip =  process.env.MONGO_IP ? process.env.MONGO_IP : 'localhost';
const mongo_port =  process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT) : 27017;

// MySQL
const mysql_ip = process.env.MYSQL_IP ? process.env.MYSQL_IP : 'localhost';
const mysql_port =  process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306;
const mysql_user = process.env.MYSQL_USER ? process.env.MYSQL_USER : 'root';
const mysql_password = process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : '12345678';
const mysql_db = process.env.MYSQL_DB ? process.env.MYSQL_DB : 'userdb';


export {
    port, 
    mongo_ip, mongo_port, 
    mysql_ip, mysql_port, mysql_user, mysql_password, mysql_db
}