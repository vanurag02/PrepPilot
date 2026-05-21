/* =============== IMPORTS =============== */
import axios from "axios";

/* =============== AXIOS INSTANCE =============== */
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/* =============== REGISTER USER API =============== */
/**
@name - REGISTER
@description - SEND REGISTER USER REQUEST TO SERVER
*/

export async function register({ username, email, password }) {
  try {
    /* =============== SENDING REGISTER REQUEST =============== */
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/* =============== LOGIN USER API =============== */
/**
@name - LOGIN
@description - SEND LOGIN USER REQUEST TO SERVER
*/

export async function login({ email, password }) {
  try {
    /* =============== SENDING LOGIN REQUEST =============== */
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/* =============== LOGOUT USER API =============== */
/**
@name - LOGOUT
@description - SEND LOGOUT USER REQUEST TO SERVER
*/

export async function logout() {
  try {
    /* =============== SENDING LOGOUT REQUEST =============== */
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/* =============== GET LOGGED IN USER API =============== */
/**
@name - GET-ME
@description - FETCH CURRENT LOGGED IN USER DETAILS
*/

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
