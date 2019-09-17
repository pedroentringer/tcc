const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
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
        birthDate: {
            type: Date,
            required: true
        },
        genre: {
            type: String,
            enum: ["male", "female", "other"],
            required: true
        },
        picture: {
            type: String
        },
        cpf: {
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
        vehicles: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Vehicle"
            }
        ],
        sos: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Sos"
            }
        ]
    },
    {
        timestamps: true,
        versionKey: "versionSchema"
    }
);

module.exports = model("User", UserSchema);
