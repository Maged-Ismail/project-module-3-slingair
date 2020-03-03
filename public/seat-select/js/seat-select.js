const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

const givenNameInput = document.getElementById('givenName');
const surnameInput = document.getElementById('surname');
const emailInput = document.getElementById('email');
const seatNumberInput = document.getElementById('seat-number');

let selection = '';

const renderSeats = (availableSeats) => {
    // console.log(availableSeats);
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            seat.innerHTML = seatAvailable;
            row.appendChild(seat);
        }
    }
    availableSeats.seats.forEach((x) =>{
        if (x.isAvailable === false){
            // document.getElementById(x.id).style.zIndex = '-5';
            document.getElementById(x.id).classList.remove('available');
            document.getElementById(x.id).classList.add('occupied');

        }
    })
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}


const toggleFormContent = (event) => {
    const flightNumber = (flightInput.value).toUpperCase();
    // console.log('toggleFormContent: ', flightNumber);
    let flightNoArray = (flightNumber.split(''));
    // console.log(flightNoArray);
    
    if((flightNoArray[0] === 'S') && (flightNoArray[1] === 'A') && flightNoArray.length === 5) {
        console.log('Valid Flight No');
        let data = { flight: flightNumber};
        // console.log(data);
        
        fetch('/check', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            // console.log(data);
            if(data.status === 'success'){
            renderSeats(data);
            }
            // else{
            //     let error = document.createElement('p');
            //     error.innerText = "Non-Existant Flight, Try Again";
            //     document.getElementById('flightNumber').appendChild(error);
            // }
        }) 
    }
    else {
        console.log('Invalid Flight No');
        
    }

    // TODO: contact the server to get the seating availability
    //      - only contact the server if the flight number is this format 'SA###'.
    //      - Do I need to create an error message if the number is not valid?
    
    // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
    // renderSeats();
}

const handleConfirmSeat = (event) => {
    let givenName = (givenNameInput.value);
    let surname = (surnameInput.value);
    let email = (emailInput.value);
    let seatSelected = selection;
    let data = {
        firstName: givenName,
        lastName: surname,
        email: email,
        seat: seatSelected
    }
    
    fetch('/confirmed', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
    // .then( res => res.json())
}

flightInput.addEventListener('blur', toggleFormContent);