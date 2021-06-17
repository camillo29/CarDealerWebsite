const User = require('../models').User;

checkDuplicateEMail = (req, res, next) => {
    User.findOne({
        where: {
            eMail: req.body.eMail,
        }
        })
        .then(user => {
            if (user){
                res.status(400).send({ message: "eMail is already used!" });
                return;
                }
            next();
            
        })
        .catch(error => res.status(400).send(error));
}

const signUpVerification = {
    checkDuplicateEMail: checkDuplicateEMail,
}

module.exports = signUpVerification;
