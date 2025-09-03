const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`, { cache: "no-store" }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function postItems({ name, imageUrl, weather }) {
  if (!name || !imageUrl || !weather) {
    return Promise.reject("Invalid item data");
  }
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error posting item:", error);
      throw error;
    });
}

function deleteItems(item) {
  if (!item || !item._id) {
    return Promise.reject("Invalid item for deletion");
  }
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return item._id;
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
}

export { getItems, postItems, deleteItems };
