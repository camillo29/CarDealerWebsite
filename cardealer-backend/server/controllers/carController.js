const Car = require('../models').Car;
const CarBrand = require('../models').CarBrand;
const FuelType = require('../models').FuelType;
const GearBoxType = require('../models').GearBoxType;
const Office = require('../models').Office;
const Person = require('../models').Person;


module.exports = {
    create(req, res, next) {
        if(req.files!=null){
            var fs = require('fs');
            var fileName = Date.now() + '.jpg';
            fs.writeFile("./server/routes/uploads/" + fileName, req.files.image.data, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
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
                personId: req.body.personId,
                image: fileName
            })
            .then(car => {
                res.status(200).send(car);
                next();
            })
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
    listNotReserved(req, res){
        return Car
            .findAll({
                where: {
                    personId: null
                },
                include: [{
                    model: CarBrand
                }, {
                    model: FuelType
                }, {
                    model: GearBoxType
                }, {
                    model: Office
                }, {
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
    addReservationToCar(req, res){
        return Car
        .findByPk(req.body.carId)
        .then(car => {
            if(!car){
                return res.status(400).send({ message: "Car not found" });
            }
            return car
                .update({
                    personId: req.body.personId
                })
                .then(() => res.status(200).send({message: 'Car reserved'}))
                .catch(error => res.status(400).send(error));
        })
    },
    deleteCar(req, res){
        return Car
            .findByPk(req.body.carId)
            .then(car => {
                if (!car)
                    return res.status(400).send({ message: "Car not found!" });
                if(car.image!=null){
                    var fs = require('fs');
                    var fileName = car.image;
                    fs.unlink("./server/routes/uploads/" + fileName, function(err){
                        if (err)
                            console.log(err);
                        else console.log("File deleted");
                    })
                    }
                return car
                    .destroy()
                    .then(() => res.status(200).send({message: "Car removed!"}))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    getCarByPersonId(req, res){
        return Car
            .findAll({
                where: {
                    personId: req.params.personId,
                },
                include: [{
                    model: CarBrand
                }, {
                    model: FuelType
                }, {
                    model: GearBoxType
                }, {
                    model: Office
                }, {
                    model: Person
                }],
            })
            .then(car => res.status(200).send(car))
            .catch(error => res.status(400).send(error));
    },

};