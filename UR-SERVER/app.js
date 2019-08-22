//packages
import http from 'http'; 
import express from 'express'; 
import logger from 'morgan'; 
import bodyParser from 'body-parser';

//configs
import {APPLICATION_PORT} from './api/config/data/app';
import db from './api/config/common/mongoose';
import { development } from './api/config/data/db';

//Routes
import { router } from "./api/routes";

const app = express();

//setup express application 
const server = http.createServer(app);
app.use(logger('dev')); 
app.use(bodyParser.json()); // Parse incoming requests data 
app.use(bodyParser.urlencoded({ extended: false }));


//Allow header for cross origin
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization"); 
    res.header("Access-Control-Allow-Methods","*");
	next();
});

//Bind routs 
app.use(router);

//wild route
app.get('*', (req, res) => res.status(200).send({ message: 'Requested Page Not Avilable', })); 
server.listen(APPLICATION_PORT, development.host, () => { console.log(`Server running at http://${development.host}:${APPLICATION_PORT}/`); });

//db connection
db.then(
	() => { console.log("MongoDB ready to use"); },
	err => { console.log('handle initial connection error'); }
  );