

export function fetchBreeds() {
    const url = "https://api.thecatapi.com/v1/breeds";
    return fetch(`${url}?api_key=live_QNuZvtSN3UGa7HP2HfgztxO5DMSYVh0cDuh0B1hhe45xqMmgQ8Liq19NZ2mMEB4T`)
      .then((response) => response.json())
      .then((data) => data.map((breed) => ({ id: breed.id, name: breed.name })))
      .catch((error) => {
        console.error("Error fetching cat breeds:", error);
        throw error;
      });
  }
  
  