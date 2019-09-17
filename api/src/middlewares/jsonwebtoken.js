const jwt = require("jsonwebtoken");
const secret = "oajsihsdanjek-SOSCAR-qwhashdoaeeho";

module.exports = {
    new: user => {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(user.toJSON(), secret);
                resolve(token);
            } catch (e) {
                reject(e);
            }
        });
    },
    verify: (req, res, next) => {
        const token = req.headers["token"];
        if (!token) return res.status(401).send({ status: false, mensagem: "Token não informado." });

        jwt.verify(token, secret, function(err, decoded) {
            if (err) return res.status(500).send({ status: false, mensagem: "Falha ao autenticar token." });

            req.user = decoded;
            next();
        });
    }
};
