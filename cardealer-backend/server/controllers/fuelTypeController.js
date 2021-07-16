const FuelType = require('../models').FuelType;

module.exports = {
    create(req, res) {
        return FuelType
            .create({
                name: req.body.name,
            })
            .then(fueltype => res.status(200).send(fueltype))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return FuelType
            .findAll()
            .then(fueltype => res.status(200).send(fueltype))
            .catch(error => res.status(400).send(error));
    },
    getFuelTypeById(req, res){
        return FuelType
            .findByPk(req.params.fuelTypeId)
            .then(fueltype => res.status(200).send(fueltype))
            .catch(error => res.status(400).send(error));
    },
    deleteFuelTypeById(req, res){
        return FuelType
            .findByPk(req.body.fuelTypeId)
            .then(fueltype => {
                if (!fueltype)
                    return res.status(400).send({ message: "FuelType not found!" });
                return fueltype
                    .destroy()
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }


};