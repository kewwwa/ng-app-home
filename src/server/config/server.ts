import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import { Routes } from './routes';

const options: {
    serverPort: number,
    publicDir: string,
} = {
    serverPort: +process.env.PORT || 3000,
    publicDir: './dist/client',
};

export class Server {
    private app: express.Express;

    constructor() {
        this.app = express();
    }

    private static addHandlers(app: express.Express): void {
        app.use(morgan('dev'))
            .use(helmet())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(bodyParser.json())
            .use(bodyParser.json({
                type: 'application/vnd.api+json'
            }))
            .use(methodOverride())
            .use(express.static(options.publicDir));
        console.log('Root dir: ' + __dirname);
    }

    public listen(): Promise<express.Express> {
        Server.addHandlers(this.app);
        Routes.Configure(this.app);

        return new Promise((resolve, reject) => {
            console.log(`Starting server on port ${options.serverPort}...`);

            this.app.listen(options.serverPort, () => {
                console.log(`Server listening on port ${options.serverPort} !`);
                resolve(this.app);
            });
        });
    }
}
