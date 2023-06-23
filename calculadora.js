const monedaBaseSelect = document.getElementById("moneda-base");
const monedaDestinoSelect = document.getElementById("moneda-destino");
const cantidadBaseInput = document.getElementById("cantidad-base");
const btnCalcular = document.getElementById("btn-calcular");
const resultadoElement = document.getElementById("resultado");
const resultadoContainer = document.getElementById("resultado-container");

// Función para agregar una opción a un select
function agregarOpcion(select, valor, texto) {
  const option = document.createElement("option");
  option.value = valor;
  option.textContent = texto;
  select.appendChild(option);
}

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
  .then((response) => response.json())
  .then((data) => {
    // Iterar sobre los datos y crear las opciones del select
    data.forEach((coin) => {
      agregarOpcion(monedaBaseSelect, coin.id, coin.name);
      agregarOpcion(monedaDestinoSelect, coin.id, coin.name);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Event listener para el botón "Calcular"
btnCalcular.addEventListener("click", function () {
  const monedaBase = monedaBaseSelect.value;
  const monedaDestino = monedaDestinoSelect.value;
  const cantidadBase = parseFloat(cantidadBaseInput.value);

  if (isNaN(cantidadBase)) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  // Obtener los datos de las monedas desde la API de CoinGecko
  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${monedaBase},${monedaDestino}&vs_currencies=usd`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const precioBase = data[monedaBase].usd;
      const precioDestino = data[monedaDestino].usd;

      // Realizar el cálculo
      const resultado = (cantidadBase * precioDestino) / precioBase;

      resultadoContainer.classList.remove("hidden");

      // Mostrar el resultado
      resultadoElement.textContent = `Resultado: ${resultado.toFixed(
        2
      )} ${monedaDestino}`;
    })
    .catch((error) => {
      console.log(error);
    });
});
