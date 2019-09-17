export default class VehicleSchema {
    static schema = {
        name: "Vehicle",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            _id: "string",
            board: "string",
            brand: "string",
            model: "string",
            picture: "string"
        }
    };
}
