import mysql, { MysqlError } from 'mysql';
import { mysql_ip, mysql_user, mysql_password, mysql_db } from "../config/config";

export default class MySQL {
    private static _instance: MySQL;
    public connected: boolean = false;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = mysql.createConnection({
            host: mysql_ip,
            user: mysql_user,
            password: mysql_password,
            database: mysql_db
        });

        this.connectDB();
    }

    // Singleton for DB connection
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private connectDB() {
        this.connection.connect((err: MysqlError) => {
            if (err) {
                console.error("Error connecting to MySQL:", err.message);
            } else {
                this.connected = true;
            }
        });
    }

    public waitForConnection(timeout: number, startTime = Date.now()) {
        if (!this.connected && Date.now() - startTime < timeout) {
            setTimeout(() => this.waitForConnection(timeout, startTime), 1000); // Retry after 1 second
            
        } else if (!this.connected) {
            console.error("Impossible to stablish connection with MySQL!")
        }
    }

    public getConnection() {
        return this.connection;
    }
}
