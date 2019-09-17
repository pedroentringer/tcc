const User = require("../models/User");
const Sos = require("../models/Sos");
const Budget = require("../models/Budget");
const Mechanical = require("../models/Mechanical");

module.exports = {
    async list(req, res) {
        const { id, idSos } = req.params;

        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });
        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        const sos = await Sos.findById(idSos);
        let budget = await Budget.find({ _id: sos.budget });

        for (let i = 0; i < budget.length; i++) {
            budget[i].mechanical = await Mechanical.findById(budget[i].mechanical, { _id: 1, picture: 1, name: 1 });
        }

        return res.json({ status: true, budgets: budget });
    },
    async index(req, res) {
        const { id, idSos, idBudget } = req.params;
        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        const budget = await Budget.findById(idBudget);

        return res.json({ status: true, budget: budget });
    },
    async store(req, res) {
        const { id, idSos } = req.params;
        const BudgetBody = req.body;

        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            const sos = await Sos.findById(idSos);
            const newBudget = await Budget.create(BudgetBody);
            sos.budget.push(newBudget._id);
            await sos.save();
            return res.json({ status: true, message: "Orçamento cadastrado com sucesso." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async update(req, res) {
        const { id, idSos, idBudget } = req.params;
        const BudgetBody = req.body;
        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            const budget = await Budget.findByIdAndUpdate(idBudget, BudgetBody);

            if (!budget) {
                return res.status(400).json({ status: false, message: "Orçamento não encontrado." });
            }
            return res.json({ status: true, message: "Orçamento atualizado com sucesso." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    },
    async remove(req, res) {
        const { id, idSos, idBudget } = req.params;

        const loggedUser = await User.findOne({ _id: id, sos: { $gte: idSos } });

        if (!loggedUser) {
            return res.status(400).json({ status: false, message: "SOS não encontrado." });
        }

        try {
            const sos = await Sos.findById(idSos);
            for (let i = 0; i < sos.budget.length; i++) {
                if (sos.budget[i]._id == idBudget) {
                    sos.budget.splice(i, 1);
                    await sos.save();
                    await Budget.findByIdAndRemove(idBudget);
                    return res.json({ status: true, message: "Orçamento removido com sucesso." });
                }
            }
            return res.status(400).json({ status: false, message: "Orçamento não encontrado." });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ status: false, message: e });
        }
    }
};
