const UserRole = require('../models').UserRole;
const Role = require('../models').Role;

module.exports = {
    create(req, res) {
        return UserRole
            .create({
                userId: req.body.userId,
                roleId: req.body.roleId
            })
            .then(userrole => res.status(200).send(userrole))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res){
        return UserRole
            .findOne({
                where: {
                    userId: req.body.userId,
                    roleId: req.body.roleId
                }
            })
            .then(userrole => {
                if (!userrole)
                    res.status(401).send({ message: "Cannot find specified user or role" });
                return userrole
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};