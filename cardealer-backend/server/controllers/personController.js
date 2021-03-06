const Person = require('../models').Person;
const User = require('../models').User;
const UserRole = require('../models').UserRole;
const Role = require('../models').Role;

module.exports = {
    create(req, res) {
        return Person
            .create({
                name: req.body.name,
                surname: req.body.surname,
                eMail: req.body.eMail,
                phoneNumber: req.body.phoneNumber,
                userId: req.body.userId
            })
            .then(person => res.status(200).send(person))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return Person
            .findAll()
            .then(person => res.status(200).send(person))
            .catch(error => res.status(400).send(error));
    },
    getPersonByUserId(req, res){
        return Person
            .findOne({
                where: {
                    userId: req.params.userId,
                }
            })
            .then(person => res.status(200).send(person))
            .catch(error => res.status(400).send(error));
    },
};
