import { Express } from 'express';

export class Routes {
    public static Configure(app: Express): void {
        console.log('Configuring routes...');
        
        app.route('/api/todo').get((req, res) => {
            res.send([
                { name: 'first', done: false },
                { name: 'second', done: true }
            ]);
        });
    }
}
