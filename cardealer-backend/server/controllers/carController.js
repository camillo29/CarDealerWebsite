const Car = require('../models').Car;
const CarBrand = require('../models').CarBrand;
const FuelType = require('../models').FuelType;
const GearBoxType = require('../models').GearBoxType;
const Office = require('../models').Office;
const Person = require('../models').Person;

module.exports = {
    create(req, res) {
        return Car
            .create({
                model: req.body.model,
                engineCapacity: req.body.engineCapacity,
                kilometersTraversed: req.body.kilometersTraversed,
                price: req.body.price,
				carBrandId: req.body.carBrandId,
				fuelTypeId: req.body.fuelTypeId,
				gearBoxTypeId: req.body.gearBoxTypeId,
				officeId: req.body.officeId,
				personId: req.body.personId
            })
            .then(car => res.status(200).send(car))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return Car
        .findAll({
            include: [{
                model: CarBrand
                },{
                model: FuelType
                },{
                model: GearBoxType
                },{
                model: Office
                },{
                model: Person
                }],
            })
        .then(car => res.status(200).send(car))
        .catch(error => res.status(400).send(error))
    },
    getCarById(req, res){
        return Car
        .findByPk(req.params.id, {
            include: [{
                model: CarBrand
                },{
                    model: FuelType
                },{
                    model: GearBoxType
                },{
                    model: Office
                },{
                model: Person
                }],
        })
        .then(car => res.status(200).send(car))
        .catch(error => res.status(400).send(error))
    },
    addBuyerToCar(req, res){
        return Car
        .findByPk(req.params.carId)
        .then(car => {
            if(!car){
                return res.status(400).send({ message: "Car not found" });
            }
            return car
                .update({
                    personId: req.body.personId
                })
                .then(() => res.status(200).send(car))
                .catch(error => res.status(400).send(error));
        })
    },
    deleteCar(req, res){
        return Car
            .then(car => {
                if (!car)
                    return res.status(400).send({ message: "Car not found!" });
                return car
                    .destroy()
                    .then(() => res.status(200).send({message: "Car removed!"}))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }

};