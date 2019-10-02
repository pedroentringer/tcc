const User = require("../../models/User");
const Sos = require("../../models/Sos");
const Vehicle = require("../../models/Vehicle");

const km = 10;
const milha = km / 1.609;
const radius = milha / 3963.2;

module.exports = {
    async search(req, res) {
        const { lat, long } = req.query;
        const latitude = parseFloat(lat);
        const longitude = parseFloat(long);

        if (latitude && longitude) {
            try {
                const sos = await Sos.find(
                    {
                        local: {
                            $geoWithin: {
                                $centerSphere: [[longitude, latitude], radius]
                            }
                        }
                    },
                );

                return res.json({ status: true, sos: sos });
            } catch (e) {
                console.log(e);
                return res.status(400).json({ status: false, message: e });
            }
        }

        return res.status(400).json({ status: false, message: "Coordenadas não encontradas." });
    }
};
