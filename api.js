let favoritas = []
const btnObtenerDatos = document.getElementById('btndatos');

const btnFavoritas = document.getElementById('btnfavorita');
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
  const valorMonedaElement = document.getElementById('valor');
  const descripcionElement = document.getElementById('descripcion');
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const valorMoneda = data.market_data.current_price.usd;
        const symbol = data.symbol;
        valorMonedaElement.textContent = `Valor de la moneda: $${valorMoneda}`;
        descripcionElement.textContent = symbol;
        document.getElementById("btnfavorita").style.display = 'block';
        
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