const Office = require('../models').Office;

module.exports = {
    create(req, res) {
        return Office
            .create({
                city: req.body.city,
                street: req.body.street,
                postCode: req.body.postCode,
                phoneNumber: req.body.phoneNumber
            })
            .then(office => res.status(200).send(office))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return Office
            .findAll()
            .then(office => res.status(200).send(office))
            .catch(error => res.status(400).send(error));
    },
    getOfficeById(req, res){
        return Office
            .findByPk(req.params.officeId)
            .then(office => res.status(200).send(office))
            .catch(error => res.status(400).send(error));
    },
    deleteOfficeById(req, res){
        return Office
            .findByPk(req.body.officeId)
            .then(office => {
                if (!office)
                    return res.status(400).send({ message: "Office not found!" });
                return office
                    .destroy()
                    .then(() => res.status(200).send({message: "Office deleted!"}))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }

};