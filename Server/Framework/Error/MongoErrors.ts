export class MongoErrors {
    public static GetMongoError(mongoErrorObject: any) {
        switch (mongoErrorObject.code) {
            case 11000: return { name: 'duplication error', message: 'This entry already exists' }
            default: return { name: 'error', message: 'There was an error. Try again in a moment' }
        }
    };
}
