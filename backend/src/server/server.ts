import express from "express";
import MySQL from '../databases/mysql'
import MongoDB from "../databases/mongo";

export default class Server {
    public app: express.Application;
    public port: number;
    private mysql_instance: MySQL;
    private mongodb_instance: MongoDB;

    constructor(port: number){
        this.port = port;
        this.app = express();
        this.mysql_instance = MySQL.instance;
        this.mongodb_instance = MongoDB.instance;
    }

    static init(port: number){
        return new Server(port);
    }

    async start(callback: (() => void)){
        // Connect to MySQL
        await this.mysql_instance.waitForConnection(5000);
        console.log("MySQL connection online");
        // Conect to MongoDB
        await this.mongodb_instance.waitForConnection(5000);
        console.log('MongoDB connection established');
        
        this.app.listen(this.port, callback);
    }
}