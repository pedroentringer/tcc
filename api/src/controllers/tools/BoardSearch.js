const sinesp = require("sinesp-api");
const GoogleImages = require("google-images");
const googleClient = new GoogleImages("011787517415592112446:x7faoonkwre", "AIzaSyAS6kOdLbf-h-PPhx3D5JJRRMzixHIWTjM");

module.exports = {
    async search(req, res) {
        const { board } = req.params;

        try {
            const vehicle = await sinesp.search(board);
            const images = await googleClient.search(`${vehicle.modelo} cor ${vehicle.cor} ${vehicle.ano}/${vehicle.anoModelo}`);

            const info = {
                brand: vehicle.marca.split("/")[0],
                model: vehicle.modelo.split("/")[1],
                year: {
                    fabrication: vehicle.ano,
                    model: vehicle.anoModelo
                },
                color: vehicle.cor,
                uf: vehicle.uf,
                city: vehicle.municipio,
                restrictions: vehicle.situacao,
                picture: images[0].url
            };

            return res.json({ status: true, vehicle: info });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: "Falha ao consultar veículo." });
        }
    }
};
