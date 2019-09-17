const { Schema, model } = require("mongoose");

const UserEvaluation = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
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

module.exports = model("UserEvaluation", UserEvaluation);
