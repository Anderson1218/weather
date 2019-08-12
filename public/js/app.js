const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    msg1.textContent = 'loading...';
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            msg1.textContent = data.error;
            msg2.textContent = '';
        } else {
            msg2.textContent = data.forecast + data.location;
            msg1.textContent = '';
        }
    });

});