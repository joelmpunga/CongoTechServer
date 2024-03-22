const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const port = 3000 || process.env.PORT
const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()
class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        //this.server.use(express.static(__dirname + '/public'));
        this.server.use('/user', userRoutes);
    }
    start() {
        this.server.listen(port, () => {
            console.log(`Server running on port ${port}, to run project http://localhost:${port}`);
        });
    }
}
const app = new App();
app.start();