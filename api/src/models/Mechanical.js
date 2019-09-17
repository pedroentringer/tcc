const { Schema, model } = require("mongoose");

const MechanicalSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tel: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true
        },
        evaluation: {
            quantity: {
                type: Number,
                required: true
            },
            number: {
                type: Schema.Types.Decimal128,
                required: true
            }
        },
        address: {
            uf: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 2
            },
            city: {
                type: String,
                required: true
            },
            neighborhood: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            zipcode: {
                type: String,
                required: true,
                minlength: 9,
                maxlength: 9
            },
            local: {
                type: { type: String },
                coordinates: []
            }
        },
        services: [
            {
                type: String,
                required: true
            }
        ]
    },
    {
        timestamps: true,
        versionKey: "versionSchema"
    }
);

module.exports = model("Mechanical", MechanicalSchema);
