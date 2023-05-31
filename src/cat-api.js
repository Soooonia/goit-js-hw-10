

export function fetchBreeds() {
    const url = "https://api.thecatapi.com/v1/breeds";
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.map((breed) => ({ id: breed.id, name: breed.name })))
      .catch((error) => {
        console.error("Error fetching cat breeds:", error);
        throw error;
      });
  }
  