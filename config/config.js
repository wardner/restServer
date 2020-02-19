const env = require('../env.json');

//========
// Puerto
//========
process.env.PORT = process.env.PORT || env.port;

//
// MongoDB Atlas Conecction
//
process.env.DBURI = env.dburi || process.env.DBURI;