import mongoose from 'mongoose';
import { mongo_ip, mongo_port } from '../config/config';

class MongoDB {
    private static _instance: MongoDB;
    public connected: boolean = false;
    
    private constructor() {
        this.connect()
    }

    public static get instance(): MongoDB {
        if (!this._instance) {
            this._instance = new MongoDB();
        }
        return this._instance;
    }

    private connect() {
        mongoose.connect(`mongodb://${mongo_ip}:${mongo_port}/pet`)
            .then(() => this.connected = true)
            .catch((err) => console.error(err))
    }

    public waitForConnection(timeout: number, startTime = Date.now()) {
        if (!this.connected && Date.now() - startTime < timeout) {
            setTimeout(() => this.waitForConnection(timeout, startTime), 1000); // Retry after 1 second
            
        } else if (!this.connected) {
            console.error("Impossible to stablish connection with MongoDB!")
        }
    }
}

export default MongoDB;
