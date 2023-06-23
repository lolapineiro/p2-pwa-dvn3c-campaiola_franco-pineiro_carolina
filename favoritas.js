const favoritosContainer = document.getElementById("favoritas");

const nombreElement = document.getElementById("nombre");
const valorMonedaElement = document.getElementById("valor");

function mostrarFavoritos() {
  favoritosContainer.innerHTML = "";
  const favoritos = JSON.parse(localStorage.getItem("favoritosfull")) || [];

  if (favoritos.length === 0) {
    const mensajeElement = document.createElement("div");
    mensajeElement.textContent = "No hay monedas agregadas a tus favoritos";
    mensajeElement.classList.add("text-white");
    favoritosContainer.appendChild(mensajeElement);
  } else {
    favoritos.forEach((favorito) => {
      const favoritoElement = document.createElement("div");
      favoritoElement.classList.add("favorito");
      favoritoElement.innerHTML = `
        <div class="text-white">${favorito[0].toUpperCase()}</div>
        <div class="text-white">${favorito[1]}</div>
      `;
      favoritosContainer.appendChild(favoritoElement);
    });
  }
}

mostrarFavoritos();
