const favoritosContainer = document.getElementById('favoritas');


function mostrarFavoritos() {
    favoritosContainer.innerHTML = '';
    const favoritos = JSON.parse(localStorage.getItem('favoritosfull')) || [];
    favoritos.forEach(favorito => {
      const favoritoElement = document.createElement('div');
      favoritoElement.textContent = favorito;
  
      favoritosContainer.appendChild(favoritoElement);
    });
  }
  
  mostrarFavoritos();