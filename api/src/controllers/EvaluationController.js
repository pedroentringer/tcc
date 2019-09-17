const User = require("../models/User");
const Sos = require("../models/Sos");
const UserEvaluation = require("../models/UserEvaluation");
const MechanicalEvaluation = require("../models/MechanicalEvaluation");

module.exports = {
    async list(req, res) {
        const { id, idSos } = req.params;
        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            const sos = await Sos.findById(idSos);
            const userEvaluation = await UserEvaluation.findById(sos.evaluations.user);
            const mechanicalEvaluation = await MechanicalEvaluation.findById(sos.evaluations.mechanical);

            return res.json({ status: true, evaluations: { user: userEvaluation, mechanical: mechanicalEvaluation } });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async store(req, res) {
        const { id, idSos } = req.params;
        const evaluation = req.body;

        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            const sos = await Sos.findById(idSos);
            const { id, stars, description } = evaluation.content;

            if (evaluation.type == "user") {
                const newEvaluation = await UserEvaluation.create({ user: id, stars, description });

                sos.evaluations.user = newEvaluation._id;
                await sos.save();

                return res.json({ status: true, message: "Mecânico avaliado com sucesso." });
            } else if (evaluation.type == "mechanical") {
                const newEvaluation = await MechanicalEvaluation.create({ mechanical: id, stars, description });

                sos.evaluations.mechanical = newEvaluation._id;
                await sos.save();

                return res.json({ status: true, message: "Usuário avaliado com sucesso." });
            }

            return res.status(400).json({ status: false, message: "Tipo inválido." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    }
};
