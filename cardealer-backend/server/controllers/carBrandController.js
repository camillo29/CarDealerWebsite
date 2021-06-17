const CarBrand = require('../models').CarBrand;

module.exports = {
    create(req, res) {
        return CarBrand
            .create({
                name: req.body.name,
            })
            .then(carbrand => res.status(200).send(carbrand))
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return CarBrand
            .findAll()
            .then(carbrand => res.status(200).send(carbrand))
            .catch(error => res.status(400).send(error));
    },
    getCarBrandById(req, res){
        return CarBrand
            .findByPk(req.params.carBrandId)
            .then(carbrand => res.status(200).send(carbrand))
            .catch(error => res.status(400).send(error));
    },
    deleteCarBrandById(req, res){
        return CarBrand
            .findByPk(req.params.carBrandId)
            .then(carbrand => {
                if (!carbrand)
                    return res.status(400).send({ message: "CarBrand not found!" });
                return carbrand
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};