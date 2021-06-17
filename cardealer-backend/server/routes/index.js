const carBrandController = require("../controllers").carBrandController;
const fuelTypeController = require("../controllers").fuelTypeController;
const gearBoxTypeController = require("../controllers").gearBoxTypeController;
const officeController = require("../controllers").officeController;
const carController = require("../controllers").carController;
const personController = require("../controllers").personController;
const userController = require("../controllers").userController;
const roleController = require("../controllers").roleController;
const userRoleController = require("../controllers").userRoleController;
const { authJwt } = require("../middlewares");
const { signUpVerification } = require("../middlewares");

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to API!',
    }));

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.post('/api/createCarBrand', [authJwt.verifyToken, authJwt.isAdmin], carBrandController.create);
    app.post('/api/createFuelType', [authJwt.verifyToken, authJwt.isAdmin], fuelTypeController.create);
    app.post('/api/createGearBoxType', [authJwt.verifyToken, authJwt.isAdmin], gearBoxTypeController.create);
    app.post('/api/createOffice', [authJwt.verifyToken, authJwt.isAdmin], officeController.create);
    app.post('/api/createCar', [authJwt.verifyToken, authJwt.isAdmin], carController.create);
    app.post('/api/createPerson', personController.create);
    app.post('/api/signup',[signUpVerification.checkDuplicateEMail], userController.create);
    app.post('/api/signin', userController.login);
    app.post('/api/createRole', [authJwt.verifyToken, authJwt.isAdmin], roleController.create);
    app.post('/api/linkUserAndRole', userRoleController.create); //CREATE SECOND ONE FOR ADMIN, LEAVE THIS FOR FRONTEND CALLS WHEN SIGNUPING USER
    
    app.get('/api/listCarBrands', carBrandController.list);
    app.get('/api/listCars', carController.list);
    app.get('/api/listFuelTypes', fuelTypeController.list);
    app.get('/api/listGearBoxTypes', gearBoxTypeController.list);
    app.get('/api/listOffices', officeController.list);
    app.get('/api/listPeople', [authJwt.verifyToken, authJwt.isAdmin], personController.list);
    app.get('/api/listRoles', [authJwt.verifyToken, authJwt.isAdmin], roleController.list);
    app.get('/api/getCarById/:id', carController.getCarById);
    app.get('/api/getCarBrandById/:carBrandId', carBrandController.getCarBrandById);
    app.get('/api/getFuelTypeById/:fuelTypeId', fuelTypeController.getFuelTypeById);
    app.get('/api/getGearBoxTypeById/:gearBoxTypeId', gearBoxTypeController.getGearBoxTypeById);
    app.get('/api/getOfficeById/:officeId', officeController.getOfficeById);
    app.get('/api/getPersonById/:personId', personController.getPersonById)
    app.get('/api/getUserAndRolesByUserId/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.getUserAndRolesByUserId);

    app.put('/api/addBuyerToCar/:carId', carController.addBuyerToCar);

    app.delete('/api/deleteCar/:carId', [authJwt.verifyToken, authJwt.isAdmin], carController.deleteCar);
    app.delete('/api/deleteCarBrand/:carBrandId', [authJwt.verifyToken, authJwt.isAdmin], carBrandController.deleteCarBrandById);
    app.delete('/api/deleteFuelType/:fuelTypeId', [authJwt.verifyToken, authJwt.isAdmin], fuelTypeController.deleteFuelTypeById);
    app.delete('/api/deleteGearBoxType/:gearBoxTypeId', [authJwt.verifyToken, authJwt.isAdmin], gearBoxTypeController.deleteGearBoxTypeById);
    app.delete('/api/deleteOffice/:officeId', [authJwt.verifyToken, authJwt.isAdmin], officeController.deleteOfficeById);
    app.delete('/api/removeRoleFromUser',[authJwt.verifyToken, authJwt.isAdmin] ,userRoleController.delete);
};