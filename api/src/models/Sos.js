const { Schema, model } = require("mongoose");

const SosSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        local: {
            type: { type: String },
            coordinates: []
        },
        status: {
            type: String,
            enum: ["P", "F", "C"],
            required: true
        },
        vehicle: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Vehicle"
        },
        evaluations: {
            user: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "UserEvaluation"
            },
            mechanical: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "MechanicalEvaluation"
            }
        },
        budget: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Budget"
            }
        ]
    },
    {
        timestamps: true,
        versionKey: "versionSchema"
    }
);

module.exports = model("Sos", SosSchema);
