const GearBoxType = require('../models').GearBoxType;

module.exports = {
    create(req, res) {
        return GearBoxType
            .create({
                name: req.body.name,
            })
            .then(gearboxtype => res.status(200).send(gearboxtype))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return GearBoxType
            .findAll()
            .then(gearboxtype => res.status(200).send(gearboxtype))
            .catch(error => res.status(400).send(error));
    },
    getGearBoxTypeById(req, res){
        return GearBoxType
            .findByPk(req.params.gearBoxTypeId)
            .then(gearboxtype => res.status(200).send(gearboxtype))
            .catch(error => res.status(400).send(error));
    },
    deleteGearBoxTypeById(req, res){
        return GearBoxType
            .findByPk(req.params.gearBoxTypeId)
            .then(gearboxtype => {
                if (!gearboxtype)
                    return res.status(400).send({ message: "GearBoxType not found!" });
                return gearboxtype
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }

};