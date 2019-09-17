export default class UserSchema {
    static schema = {
        name: "NewUser",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            name: "string",
            birthday: "string",
            genre: "string",
            board: "string"
        }
    };
}
