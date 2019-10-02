const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Mechanical = require("../models/Mechanical");
const jwt = require("../middlewares/jsonwebtoken");

module.exports = {
    async user(req, res) {
        const user = req.body;
        const loggedUser = await User.findOne({ tel: user.tel, password: user.password }, { password: 0, sos: 0 });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Cadastro não encontrado." });
        }

        const vehicles = [];

        for (let i = 0; i < loggedUser.vehicles.length; i++) {
            const vehicle = await Vehicle.findById(loggedUser.vehicles[i]);
            if (vehicle) {
                vehicles.push(vehicle);
            }
        }

        try {
            const token = await jwt.new(loggedUser);
            return res.json({ status: true, token: token, user: loggedUser, vehicles: vehicles });
        } catch (e) {
            return res.status(400).json({ status: false, message: "Falha ao gerar token." });
        }
    },
    async mechanical(req, res) {
        const mechanical = req.body;
        const loggedMechanical = await Mechanical.findOne({ tel: mechanical.tel, password: mechanical.password }, {password:0});

        if (!loggedMechanical) {
            return res.status(400).json({ status: false, message: "Cadastro não encontrado." });
        }

        try {
            const token = await jwt.new(loggedMechanical);
            return res.json({ status: true, token: token, mechanical: loggedMechanical });
        } catch (e) {
            return res.status(400).json({ status: false, message: "Falha ao gerar token." });
        }
    }
};
