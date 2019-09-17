const { Schema, model } = require("mongoose");

const VehicleSchema = new Schema(
    {
        board: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        year: {
            model: {
                type: Number,
                required: true
            },
            fabrication: {
                type: Number,
                required: true
            }
        }
    },
    {
        timestamps: true,
        versionKey: "versionSchema"
    }
);

module.exports = model("Vehicle", VehicleSchema);
