const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const jwt = require("../middlewares/jsonwebtoken");

module.exports = {
    async index(req, res) {
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
    }
};
