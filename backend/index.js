const express = require("express")
// const bodyParser = require('body-parser');
// const cors = require("cors");
const app = express()
app.use(express.json())
const userrouter = require('./routes/user')

// app.use(cors())
// app.options('*',cors());
//  app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
//   }));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }
    });
   
    app.use("/", userrouter)

  

    app.listen(3000, ()=> {
        console.log("Server is up and running")
    })