const User = require("../../models/User");
const Sos = require("../../models/Sos");
const Vehicle = require("../../models/Vehicle");
const ObjectId = require('mongoose').Types.ObjectId; 

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
                        },
                        status: 'P'
                    } 
                );

                const allSos = [];
                for (let i = 0; i < sos.length; i++) {
                    const newSos = JSON.parse(JSON.stringify(sos[i]));
                    newSos.vehicle = await Vehicle.findById(sos[i].vehicle, { _id: 1, picture: 1, board: 1 });
                    const user = await User.findOne({sos: new ObjectId(sos[i]._id)}, {_id:1});
                    newSos.userId = user._id;
                    allSos.push(newSos);
                }

                return res.json({ status: true, sos: allSos });
            } catch (e) {
                return res.status(400).json({ status: false, message: e });
            }
        }

        return res.status(400).json({ status: false, message: "Coordenadas não encontradas." });
    }
};
