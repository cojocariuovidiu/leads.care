import * as mongoose from 'mongoose';

export class Database {
    private static ConnectionString: string = 'mongodb://127.0.0.1/leadem';
    public DatabaseConnection: mongoose.Connection;

    public Initialize(): Promise<any> {
        (<any>mongoose).Promise = Promise;
        let connect = new Promise<any>((resolve, reject) => {
            mongoose.connect(Database.ConnectionString).catch(err => {
                console.log('database connection failed');
            });

            this.DatabaseConnection = mongoose.connection;
            this.DatabaseConnection.on('error', (error: any) => {
                console.log(`database error: ${error}`);
            });

            this.DatabaseConnection.once('open', function () {
                console.log(`Connected to mongodb`);
                resolve('success');
            });

            this.DatabaseConnection.on('debug', (value: any) => {
                console.log(value);
            });
        });
        return connect;
    }

    public Dispose(err?: Error): void {
        if (err) {
            this.HandleMethodException(err);
        }
        else {
            this.DatabaseConnection.close().then(() => {
                console.log('mongodb connection closed');
            });
        }
    }

    public HandleMethodException(err: Error): void {
        console.error(err);
    }
}
