//client side js

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageOne.textContent = 'Test paragraph from javascript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault() //preventing page refreshment on key press

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                const dataBeta = data.forecast.summary
                messageTwo.textContent = data.forecast.summary + ' Current temperature is ' + data.forecast.current_temp + '°C with a chance of rain equal to ' + data.forecast.chance_rain + '%.'
                console.log(data.forecast)
            }
        })
    })
})