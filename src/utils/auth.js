import { checkResponse } from "./api.js";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const authorize = (identifier, password) => {
  const baseUrl = "http://localhost:3001/auth/local";
  return request(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });
};

export const checkToken = (token) => {
  const baseUrl = "http://localhost:3001/users/me";
  return request(baseUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const signup = ({ name, avatar, email, password }) => {
  const baseUrl = "http://localhost:3001/signup";
  return request(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const signin = ({ email, password }) => {
  const baseUrl = "http://localhost:3001/signin";
  return request(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const editProfile = ({ name, avatar, email }) => {
  const token = localStorage.getItem("jwt");
  const baseUrl = "http://localhost:3001/users/me";
  return request(baseUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, email }),
  });
};

export default { signup, signin, authorize, checkToken, editProfile };
