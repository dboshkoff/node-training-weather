const fetchWeatherData = (address) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/weather?address=${address}`)
      .then((res) => {
        resolve(res.json());
      });
  });
}


window.addEventListener('DOMContentLoaded', () => {
  const weatherForm = document.querySelector('form');
  const search = document.querySelector('input');
  const errorMsg = document.querySelector('#errorMsg');
  const weatherInfo = document.querySelector('#weatherInfo');

  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    weatherInfo.innerText = 'Loading...';
    fetchWeatherData(location).then((response) => {
      if (response.errors) {
        errorMsg.innerText = response.errors[0];
        weatherInfo.innerText = '';
      } else {
        weatherInfo.innerText = response.forecast;
        errorMsg.innerText = '';
      }
    });
  })
});
