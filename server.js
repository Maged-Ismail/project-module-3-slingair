'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const PORT = process.env.PORT || 8000;

const { seats } = require(__dirname + '/test-data/flightSeating.js');
const { reservations } = require(__dirname + '/test-data/reservations.js');

let receivedData={};
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
    // .set('view engine', 'ejs')

    
    // endpoints

    .get('/seat-select', (req, res)=>{
        res.sendFile(__dirname + '/public/seat-select/index.html');
    })
    .get('/load', (req, res) =>{
        const flights = Object.keys(seats);
        console.log(flights);
        
        res.status(200).json({body: flights})
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
        receivedData = req.body;
        console.log(receivedData);
        res.status(200).json({ status: 'success'});  
    })
    .get('/confirmed', (req, res) =>{
        console.log(receivedData);
        let newReservation = {
            id: Math.round(Math.random()*76590865322876),
            flight: receivedData.flight,
            seat: receivedData.seat,
            givenName: receivedData.firstName,
            surname: receivedData.lastName,
            email: receivedData.email
        };
        reservations.push(newReservation);
        console.log(reservations);
        
        res.status(200).json(receivedData);
    })
    .get('/reservation', (req, res) =>{
        res.sendFile(__dirname + '/public/seat-select/view-reservation.html');
    })
    .post('/fetch', (req, res) => {
        console.log(req);
        let id = req.body;
        console.log(id);
        
        reservations.forEach(reservation =>{
            if (reservation.id === id ){
                let data= {
                    flight: reservation.flight,
                    seat: reservation.seat,
                    name: `${reservation.givenName} ${reservation.surname}`,
                    email: reservation.email
                }
                console.log(data); 
            }
        })
        res.status(200).json({ body: data});
    })

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));