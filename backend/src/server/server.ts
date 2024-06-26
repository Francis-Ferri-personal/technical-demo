import express from "express";
import MySQL from '../databases/mysql'

export default class Server {
    public app: express.Application;
    public port: number;
    private mysql_instance: MySQL;

    constructor(port: number){
        this.port = port
        this.app = express();
        this.mysql_instance = MySQL.instance;
    }

    static init(port: number){
        return new Server(port);
    }

    async start(callback: (() => void)){
        // Connect to MySQL
        await this.mysql_instance.waitForConnection()
        console.log("MySQL connection online");
        
        this.app.listen(this.port, callback)
    }
}