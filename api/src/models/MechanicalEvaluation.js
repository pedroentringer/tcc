const { Schema, model } = require("mongoose");

const MechanicalEvaluation = new Schema(
    {
        mechanical: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Mechanical"
        },
        stars: {
            type: Schema.Types.Decimal128,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: "versionSchema"
    }
);

module.exports = model("MechanicalEvaluation", MechanicalEvaluation);
