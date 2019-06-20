import axios from "axios";
import firebase from "firebase";

const API_VERSION = "/v1";

const addAuthorizationHeader = axiosInstance => {
  axiosInstance.interceptors.request.use(
    async config => {
      const token = await getToken();
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    error => Promise.reject(error)
  );
};

const getToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw Error("User is not signed in");
  }
  return currentUser.getIdToken();
};

const service = axios.create({
  baseURL: `https://dev.gitbot.im${API_VERSION}`,
  timeout: 1000
});

addAuthorizationHeader(service);

// auth axios instance do not use versioning for routes
// it's intended to be used for <gitbot>/signup
// instead of <gitbot>/v1/signup
const auth = axios.create({
  baseURL: "https://dev.gitbot.im",
  timeout: 1000
});

addAuthorizationHeader(auth);

const signup = async (email, password) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  return auth.post("/signup");
};

const login = async (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const createBot = async data => {
  return service.post("/bot/new", data);
};

export default {
  signup,
  login,
  createBot
};
