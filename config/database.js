/*module.exports = {
    database: 'mongodb://127.0.0.1:27017/foot',
    secret: 'secret'
}*/


//MONGODB COMPASS connection string : 
//mongodb://pronoadmin:pronopassynov@pronofoot-shard-00-00-raenv.mongodb.net:27017,pronofoot-shard-00-01-raenv.mongodb.net:27017,pronofoot-shard-00-02-raenv.mongodb.net:27017/admin?replicaSet=pronofoot-shard-0&ssl=true



module.exports = {
    database: 'mongodb://pronoadmin:pronopassynov@pronofoot-shard-00-00-raenv.mongodb.net:27017,pronofoot-shard-00-01-raenv.mongodb.net:27017,pronofoot-shard-00-02-raenv.mongodb.net:27017/pronofoot?ssl=true&replicaSet=pronofoot-shard-0&authSource=admin',
    secret: 'secret'
}
