class User {
    constructor(nom,postnom,genre,datenaiss,phone,adresse,email,username,password,role) {
        this.nom = nom;
        this.postnom = postnom;
        this.genre = genre;
        this.datenaiss = datenaiss;
        this.phone = phone;
        this.adresse = adresse;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
    save(user) {

    }
    getAll(){

    }
}

module.exports = User
