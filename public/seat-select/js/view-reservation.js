const handleId = (event) =>{
    event.preventDefault();
    let id = document.getElementById('ID').value;
    console.log(id);
    // URLSearchParams.get()

fetch('/fetch', {
    method: 'POST',
    body: JSON.parse(id),
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
})
.then (res => res.json())
.then (data => {
    handleData(data.body);
})
}

const handleData = (data) =>{
    console.log(data);
    const name = document.getElementById('name');
    name.innerText = data.name
    const email = document.getElementById('email');
    email.innerText= data.email;
    const seat = document.getElementById('seat');
    seat.innerText= data.seat;
    const flight = document.getElementById('flight');
    flight.innerText= data.flight;
}