const secret = require('../config/auth.config')
const User = require('../models').User;
const Role = require('../models').Role;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {
    create(req, res, next) {
        return User
            .create({
                eMail: req.body.eMail,
                password: bcrypt.hashSync(req.body.password, 8)
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },
    getUserAndRolesByUserId(req, res) {
        return User
            .findByPk(req.params.userId, {
                include: [{
                    model: Role,
                    as: 'roles'
                }]
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },
    login(req, res) {
        return User
            .findOne({where: {
                    eMail: req.body.eMail
            }})
            .then(user => {
                if (!user)
                    return res.status(400).send({ message: "User not found" });
                if (bcrypt.compareSync(req.body.password, user.password)){
                    var token = jwt.sign({ id: user.id }, secret.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    return res.status(200).send({
                        userId: user.id,
                        token: token
                        });
                    }
                else return res.status(400).send({ message: "Wrong password" });
            })
            .catch(error => res.status(400).send(error));   
        },
    changePassword(req, res){
        return User
            .findByPk(req.body.userId)
            .then(user => {
                if (!user)
                    return res.status(400).send({ message: "User not found" });
                if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                    return user
                        .update({
                            password: bcrypt.hashSync(req.body.newPassword, 8)
                        })
                        .then(() => res.status(200).send({ message: "Password changed!" }))
                        .catch(error => res.status(400).send(error));
                } else res.status(400).send({ message: "Wrong password"});

            }).catch(error => res.status(400).send(error));
    }
};