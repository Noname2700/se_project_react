const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`, { cache: "no-store" }).then(checkResponse);
}

function postItems({ name, imageUrl, weather }) {
  if (!name || !imageUrl || !weather) {
    return Promise.reject("Invalid item data");
  }
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Error posting item:", error);
      throw error;
    });
}

function deleteItems(item) {
  if (!item || !item._id) {
    return Promise.reject("Invalid item for deletion");
  }
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then(checkResponse)
    .then(() => item._id)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { getItems, postItems, deleteItems, addCardLike, removeCardLike };
