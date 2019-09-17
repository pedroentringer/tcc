const { Schema, model } = require("mongoose");

const BudgetSchema = new Schema(
    {
        mechanical: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Mechanical"
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Schema.Types.Decimal128,
            required: true
        },
        price: {
            type: Schema.Types.Decimal128,
            required: true
        },
        status: {
            type: String,
            enum: ["P", "A", "R", "C", "F"],
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: "versionSchema"
    }
);

module.exports = model("Budget", BudgetSchema);
