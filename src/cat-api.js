

// export function fetchBreeds() {
//     const url = "https://api.thecatapi.com/v1/breeds";
//     return fetch(`${url}?api_key=${api_key}`)
//       .then((response) => response.json())
//       .then((data) => data.map((breed) => ({ id: breed.id, name: breed.name })))
//       .catch((error) => {
//         console.error("Error fetching cat breeds:", error);
//         throw error;
//       });
//   }
//   const api_key = '.live_QNuZvtSN3UGa7HP2HfgztxO5DMSYVh0cDuh0B1hhe45xqMmgQ8Liq19NZ2mMEB4T'
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'llive_QNuZvtSN3UGa7HP2HfgztxO5DMSYVh0cDuh0B1hhe45xqMmgQ8Liq19NZ2mMEB4T';

function fetchBreeds() {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  return fetch(`${BASE_URL}breeds?${params}`).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/${breedId}?api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };