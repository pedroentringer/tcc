export default class UserSchema {
    static schema = {
        name: "User",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            _id: "string",
            name: "string",
            tel: "string",
            email: "string",
            birthDate: "string",
            genre: "string",
            picture: "string",
            cpf: "string",
            evaluationNumber: "double"
        }
    };
}
