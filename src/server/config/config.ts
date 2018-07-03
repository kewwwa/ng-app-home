import { Database } from './database';
import { Server } from './server';

export class Config {
    private database: Database;
    private server: Server;

    constructor() {
        this.database = new Database();
        this.server = new Server();
    }

    public init(): Promise<any> {
        return this.database.connect()
            .then(() => this.server.listen());
    }
}