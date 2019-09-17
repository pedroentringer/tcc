const User = require("../models/User");
const jwt = require("../middlewares/jsonwebtoken");

module.exports = {
    async index(req, res) {
        const { id } = req.params;
        let loggedUser = await User.findById(id, { password: 0 });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Usuário não encontrado." });
        }

        return res.json({ status: true, user: loggedUser });
    },
    async store(req, res) {
        const userBody = req.body;

        const userExists = await User.findOne({ tel: userBody.tel });
        if (userExists) {
            return res.status(400).json({ status: false, message: "Usuário já cadastrado" });
        }

        try {
            let user = await User.create(userBody);
            user.password = undefined;
            user.sos = undefined;
            user.vehicles = undefined;

            const token = await jwt.new(user);
            return res.json({ user: user, token: token });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async update(req, res) {
        const { id } = req.params;
        const userBody = req.body;

        try {
            let user = await User.findByIdAndUpdate(id, userBody, { password: 0 });

            if (!user) {
                return res.status(400).json({ status: false, message: "Usuário não encontrado" });
            }

            userBody._id = user._id;
            const token = await jwt.new(userBody);
            return res.json({ user: userBody, token: token });
        } catch (e) {
            return res.status(400).json({ status: false, message: e });
        }
    }
};
