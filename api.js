let favoritas = []
const btnObtenerDatos = document.getElementById('btndatos');
const btnFavoritas = document.getElementById('btnfavorita');
const resultado = document.getElementById('resultado');
document.getElementById("btnfavorita").style.display = 'none';

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('monedas');

    // Iterar sobre los datos y crear las opciones del select
    data.forEach(coin => {
      const option = document.createElement('option');
      option.value = coin.id;
      option.text = coin.name;
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.log(error);
  });

btnObtenerDatos.addEventListener('click', function () {
  const selectElement = document.getElementById('monedas');
  const selectedCoinId = selectElement.value;
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoinId}`;
  const nombreElement = document.getElementById('nombre');
  const valorMonedaElement = document.getElementById('valor');
  const valorMaximoElement = document.getElementById('valorMaximo');
  const valorMinimoElement = document.getElementById('valorMinimo');
  const cambio24hElement = document.getElementById('cambio24h');
  const ultimaActualizacionElement = document.getElementById('ultimaActualizacion');
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const nombre = data.name;
        const valorMoneda = data.market_data.current_price.usd;
        const valorMaximo = data.market_data.high_24h.usd;
        const valorMinimo = data.market_data.low_24h.usd;
        const cambio24h = data.market_data.price_change_24h;
        const ultimaActualizacion = data.market_data.last_updated;

        nombreElement.textContent = nombre;
        valorMonedaElement.textContent = `Valor actual en USD: $${valorMoneda}`;
        valorMaximoElement.textContent = `Valor máximo: $${valorMaximo}`;
        valorMinimoElement.textContent = `Valor mínimoc: $${valorMinimo}`;
        cambio24hElement.textContent = `Cambio en las últimas 24 horas: $${cambio24h}`;
        ultimaActualizacionElement.textContent = `Última actualización: ${ultimaActualizacion}`;
 
        document.getElementById("btnfavorita").style.display = 'block';
        document.getElementById("hero") .style.display = 'none';
        document.getElementById("resultado").style.display = 'block';
    })
    .catch(error => {
      console.log(error);
    });
});

btnFavoritas.addEventListener('click', function () {
    const selectElement = document.getElementById('monedas');
    const selectedCoinId = selectElement.value;
    const valorMonedaElement = document.getElementById('valor');
    const descripcionElement = document.getElementById('descripcion');
    const data = [selectedCoinId, valorMonedaElement.textContent, descripcionElement.textContent]
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosfull = JSON.parse(localStorage.getItem('favoritosfull')) || [];

    if (favoritos.includes(selectedCoinId)) {
        alert('Esta moneda ya está en la lista de favoritos.');
        return;
    }
    favoritos.push(selectedCoinId);
    favoritosfull.push(data);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    localStorage.setItem('favoritosfull', JSON.stringify(favoritosfull));
    alert("Se ha agregado la moneda a favoritos.")
});