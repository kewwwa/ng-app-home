import { Mongoose, Schema } from "mongoose";

const options: {
    mongodbUri: string,
} = {
    mongodbUri: 'mongodb://localhost',
};

export class Database {
    private mongoose: Mongoose;

    constructor() {
        this.mongoose = new Mongoose();
    }

    private configure(): void {
        this.mongoose.model('Test', new Schema({
            title: String,
        }));
    }

    public connect(): Promise<void> {
        console.log('Connecting database...');

        return this.mongoose.connect(options.mongodbUri)
            .then(() => console.log('Database connected !'))
            .catch(reason => {
                console.error('Database failed to connect !!!');
                console.error(reason);
            });
    }
}
