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
    name.style.color = 'red';
    const email = document.getElementById('email');
    email.innerText= data.email;
    email.style.color = 'red';
    const seat = document.getElementById('seat');
    seat.innerText= data.seat;
    seat.style.color = 'red';
    const flight = document.getElementById('flight');
    flight.innerText= data.flight;
    flight.style.color = 'red';
}