const User = require('../model/usersModel')
class usersController {

    createUser(req, res) {
        const userAdd = new User()
        const { nom, postnom, genre, datenaiss, phone, adresse, email, username, password, role } = req.body;
        const user = new usersController(nom, postnom, genre, datenaiss, phone, adresse, email, username, password, role);
        user.save({ nom, postnom, genre, datenaiss, phone, adresse, email, username, password, role });
        res.send(user);
    }


}