// Obtener los favoritos del LocalStorage
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const monedaBaseSelect = document.getElementById('moneda-base');
const monedaDestinoSelect = document.getElementById('moneda-destino');
const cantidadBaseInput = document.getElementById('cantidad-base');
const btnCalcular = document.getElementById('btn-calcular');
const resultadoElement = document.getElementById('resultado');



// Agregar las opciones de monedas favoritas al select de moneda base
favoritos.forEach(favorito => {
  const option = document.createElement('option');
  option.value = favorito;
  option.textContent = favorito;
  monedaBaseSelect.appendChild(option);
});

// Agregar las opciones de monedas favoritas al select de moneda destino
favoritos.forEach(favorito => {
  const option = document.createElement('option');
  option.value = favorito;
  option.textContent = favorito;
  monedaDestinoSelect.appendChild(option);
});

// Event listener para el botón "Calcular"
btnCalcular.addEventListener('click', function () {
  const monedaBase = monedaBaseSelect.value;
  const monedaDestino = monedaDestinoSelect.value;
  const cantidadBase = parseFloat(cantidadBaseInput.value);

  if (isNaN(cantidadBase)) {
    alert('Ingrese una cantidad válida.');
    return;
  }

  // Obtener los datos de las monedas desde la API de CoinGecko
  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${monedaBase},${monedaDestino}&vs_currencies=usd`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const precioBase = data[monedaBase].usd;
      const precioDestino = data[monedaDestino].usd;

      // Realizar el cálculo
      const resultado = (cantidadBase * precioDestino) / precioBase;

      // Mostrar el resultado
      resultadoElement.textContent = `Resultado: ${resultado.toFixed(2)} ${monedaDestino}`;
    })
    .catch(error => {
      console.log(error);
    });
});
