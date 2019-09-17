const User = require("../models/User");
const Sos = require("../models/Sos");
const Vehicle = require("../models/Vehicle");

module.exports = {
    async list(req, res) {
        const { id } = req.params;
        const loggedUser = await User.findById(id);

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Usuário não encontrado." });
        }

        let sos = await Sos.find({ _id: loggedUser.sos }).sort({ createdAt: "desc" });

        for (let i = 0; i < sos.length; i++) {
            sos[i].vehicle = await Vehicle.findById(sos[i].vehicle, { _id: 1, picture: 1, board: 1 });
        }
        return res.json({ status: true, sos: sos });
    },
    async index(req, res) {
        const { id, idSos } = req.params;
        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        const sos = await Sos.findById(idSos);

        return res.json({ status: true, sos: sos });
    },
    async store(req, res) {
        const { id } = req.params;
        const SosBody = req.body;

        const loggedUser = await User.findById(id);
        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Usuário não encontrado." });
        }

        try {
            const newsos = await Sos.create(SosBody);
            loggedUser.sos.push(newsos._id);
            await loggedUser.save();
            return res.json({ status: true, message: "SOS cadastrado com sucesso." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async update(req, res) {
        const { id, idSos } = req.params;
        const SosBody = req.body;

        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            const sos = await Sos.findByIdAndUpdate(idSos, SosBody);

            return res.json({ status: true, message: "SOS atualizado com sucesso." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async remove(req, res) {
        const { id, idSos } = req.params;

        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            for (let i = 0; i < loggedUser.sos.length; i++) {
                if (loggedUser.sos[i]._id == idSos) {
                    loggedUser.sos.splice(i, 1);
                    await loggedUser.save();
                    await Sos.findByIdAndRemove(idSos);
                    return res.json({ status: true, message: "SOS removido com sucesso." });
                }
            }
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    }
};
