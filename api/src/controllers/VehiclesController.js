const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

module.exports = {
    async list(req, res) {
        const { id } = req.params;
        const loggedUser = await User.findById(id);

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Usuário não encontrado." });
        }

        const vehicles = await Vehicle.find({ _id: loggedUser.vehicles });

        return res.json({ status: true, vehicles: vehicles });
    },
    async index(req, res) {
        const { id, idVehicle } = req.params;
        const loggedUser = await User.findOne({ _id: id, vehicles: { $gte: idVehicle } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Veículo não encontrado." });
        }

        const vehicle = await Vehicle.findById(idVehicle);

        return res.json({ status: true, vehicle: vehicle });
    },
    async store(req, res) {
        const { id } = req.params;
        const VehicleBody = req.body;

        const loggedUser = await User.findById(id);
        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Usuário não encontrado." });
        }

        const VehicleExists = await Vehicle.findOne({ board: VehicleBody.board });
        if (VehicleExists) {
            return res.status(400).json({ status: false, message: "Veículo já cadastrado" });
        }

        try {
            const newVehicle = await Vehicle.create(VehicleBody);
            loggedUser.vehicles.push(newVehicle._id);
            await loggedUser.save();
            return res.json({ status: true, message: "Veiculo cadastrado com sucesso.", _id: newVehicle._id });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async update(req, res) {
        const { id, idVehicle } = req.params;
        const VehicleBody = req.body;

        const loggedUser = await User.findOne({ _id: id, vehicles: { $gte: idVehicle } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Veículo não encontrado." });
        }

        try {
            const vehicle = await Vehicle.findByIdAndUpdate(idVehicle, VehicleBody);

            return res.json({ status: true, message: "Veiculo atualizado com sucesso." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async remove(req, res) {
        const { id, idVehicle } = req.params;

        const loggedUser = await User.findOne({ _id: id, vehicles: { $gte: idVehicle } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "Veículo não encontrado." });
        }

        try {
            await Vehicle.findByIdAndRemove(idVehicle);
            for (let i = 0; i < loggedUser.vehicles.length; i++) {
                if (loggedUser.vehicles[i]._id == idVehicle) {
                    loggedUser.vehicles.splice(i, 1);
                    await loggedUser.save();
                }
            }

            return res.json({ status: true, message: "Veiculo removido com sucesso." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    }
};
