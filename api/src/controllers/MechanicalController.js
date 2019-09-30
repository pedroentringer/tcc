const Mechanical = require("../models/Mechanical");
const Sos = require("../models/Sos");
const User = require("../models/User");
const UserEvaluation = require("../models/UserEvaluation");
const jwt = require("../middlewares/jsonwebtoken");

const km = 10;
const milha = km / 1.609;
const radius = milha / 3963.2;

let indexed = false;

Mechanical.createIndexes({ address: { local: "2dsphere" } });
Mechanical.on("index", err => {
    if (!err) {
        indexed = true;
    }
});

module.exports = {
    async index(req, res) {
        try {
            const { id } = req.params;
            let loggedMechanical = await Mechanical.findById(id, { password: 0 });

            if (!loggedMechanical) {
                return res.status(400).json({ status: false, message: "Mecânico não encontrado." });
            }
            let evaluationsArray = [];

            let evaluations = await Sos.find({ evaluations: { mechanical: id } });
            evaluations.forEach(async function(evaluation) {
                const idUserEvaluation = evaluation.user;

                let userEvaluation = await UserEvaluation.findById(idUserEvaluation);
                let user = await UserEvaluation.findById(userEvaluation.user, { name: 1, picture: 1 });

                const insertEvaluation = { user, userEvaluation };

                evaluationsArray.push(insertEvaluation);
            });

            return res.json({ status: true, mechanical: loggedMechanical, evaluations: evaluationsArray });
        } catch (e) {
            return res.status(400).json({ status: false, message: "Mecânico não encontrado." });
        }
    },
    async list(req, res) {
        if (indexed == false) {
            return res.status(500).json({ status: false, message: "Mecânicos ainda não indexados, aguarde." });
        } else {
            const { lat, long } = req.query;
            const latitude = parseFloat(lat);
            const longitude = parseFloat(long);

            if (latitude && longitude) {
                try {
                    const mechanicals = await Mechanical.find(
                        {
                            "address.local": {
                                $geoWithin: {
                                    $centerSphere: [[longitude, latitude], radius]
                                }
                            }
                        },
                        { _id: 1, name: 1, picture: 1, description: 1, "address.local.coordinates": 1 }
                    );

                    return res.json({ status: true, mechanicals: mechanicals });
                } catch (e) {
                    console.log(e);
                    return res.status(400).json({ status: false, message: e });
                }
            }

            return res.status(400).json({ status: false, message: "Coordenadas não encontradas." });
        }
    },
    async store(req, res) {
        const mechanicalBody = req.body;

        const mechanicalExists = await Mechanical.findOne({ cnpj: mechanicalBody.cnpj });
        if (mechanicalExists) {
            return res.status(400).json({ status: false, message: "Mecânico já cadastrado" });
        }

        try {
            let mechanical = await Mechanical.create(mechanicalBody);
            mechanical.password = undefined;

            const token = await jwt.new(mechanical);
            return res.json({ mechanical: mechanical, token: token });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async update(req, res) {
        const mechanicalBody = req.body;
        const { id } = req.params;

        try {
            let mechanical = await Mechanical.findByIdAndUpdate(id, mechanicalBody, { password: 0 });

            if (!mechanical) {
                return res.status(400).json({ status: false, message: "Mecânico não encontrado" });
            }

            mechanicalBody._id = mechanical._id;

            const token = await jwt.new(mechanicalBody);
            return res.json({ mechanical: mechanicalBody, token: token });
        } catch (e) {
            return res.status(400).json({ status: false, message: e });
        }
    }
};
