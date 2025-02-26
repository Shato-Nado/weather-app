const apiKey = 'YOUR_API_KEY'; // Замени на свой API-ключ
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Предотвращаем перезагрузку страницы
  const city = cityInput.value;

  if (city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      const data = await response.json();

      if (data.cod === 200) {
        const weather = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Температура: ${Math.round(data.main.temp)}°C</p>
          <p>Погода: ${data.weather[0].description}</p>
          <p>Влажность: ${data.main.humidity}%</p>
          <p>Ветер: ${data.wind.speed} м/с</p>
        `;
        weatherResult.innerHTML = weather;
      } else {
        weatherResult.innerHTML = `<p>Город не найден. Попробуйте ещё раз.</p>`;
      }
    } catch (error) {
      weatherResult.innerHTML = `<p>Ошибка при запросе данных. Попробуйте позже.</p>`;
    }
  } else {
    weatherResult.innerHTML = `<p>Введите название города.</p>`;
  }
});