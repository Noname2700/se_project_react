import { checkResponse } from "./api.js";

export const authorize = (identifier, password) => {
  return fetch("http://localhost:3001/auth/local", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const signup = ({ name, avatar, email, password }) => {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const editProfile = ({ name, avatar, email }) => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:3001/users/me", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, email }),
  }).then(checkResponse);
};

export default { signup, signin, authorize, checkToken, editProfile };
