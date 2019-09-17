export default class UserSchema {
    static schema = {
        name: "Token",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            token: "string"
        }
    };
}
