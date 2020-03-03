const handleConfirmation = (data) =>{
    console.log(data);
    
    const name = document.getElementById('name');
    name.innerText = `${data.firstName} ${data.lastName}`;
    const email = document.getElementById('email');
    email.innerText= data.email;
    const seat = document.getElementById('seat');
    email.innerText= data.seat;
}

module.exports = { handleConfirmation };