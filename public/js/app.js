const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// Weather fetcher
const locationSearch = (location) => {
  const weatherURL = `/weather?address=${location}`;

  fetch(weatherURL).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        // console.log(data.error);
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forcast
      }
    })
  })
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  const location = search.value
  locationSearch(location)
})
