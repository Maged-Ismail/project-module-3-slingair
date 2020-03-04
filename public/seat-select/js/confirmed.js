fetch('/confirmed', {
    method: 'GET'
})
.then (res => res.json())
.then (data => {
    handleConfirmation(data);
})

const handleConfirmation = (data) =>{
    // console.log(data);
    const name = document.getElementById('name');
    name.innerText = `${data.firstName} ${data.lastName}`;
    const email = document.getElementById('email');
    email.innerText= data.email;
    const seat = document.getElementById('seat');
    seat.innerText= data.seat;
    const flight = document.getElementById('flight');
    flight.innerText= data.flight;
}