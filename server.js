'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const PORT = process.env.PORT || 8000;

const { seats } = require(__dirname + '/test-data/flightSeating.js');
const { reservations } = require(__dirname + '/test-data/reservations.js');
const { handleConfirmation } = require(__dirname + '/public/seat-select/js/confirmed.js');

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .set('view engine', 'ejs')

    
    // endpoints

    .get('/seat-select', (req, res)=>{
        res.sendFile(__dirname + '/public/seat-select/index.html');
    })
    .post('/check', (req, res) =>{
        let flight =req.body.flight;
        // console.log(seats.hasOwnProperty(flight));;
        if(seats.hasOwnProperty(flight)){
        res.status(200).json({ status: 'success', seats : seats[flight]});
        }
        else{
            res.status(404).json({status: 'failure', message: 'Invalid flight Number'});
        }
    })
    .post('/confirmed', (req, res) =>{
        let receivedData = req.body;
        console.log(receivedData);
        res.sendFile(__dirname + '/public/seat-select/confirmed.html');
        // handleConfirmation(receivedData);
        
    })
    // .get('/confirmed', (req, res) =>{
    //     sendFile(__dirname + '/public/seat-select/confirmed.html');
    // })

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));