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
  const currentUser = await firebase.auth().currentUser;
  if (!currentUser) {
    throw Error("User is not signed in");
  }
  return currentUser.getIdToken();
};

const service = axios.create({
  baseURL: `http://dev.gitbot.im${API_VERSION}`,
  timeout: 10000
});

addAuthorizationHeader(service);

const signup = async (email, password) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  return service.post("/signup");
};

const login = async (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const createBot = async payload => {
  return service.post("/bot/new", payload);
};

const getAvailableRepositories = async () => {
  return service.get("/bot/new");
};

const getBots = async ({ detailed = false }) => {
  const params = { detailed };
  return service.get("/bots/list", { params });
};

export default {
  signup,
  login,
  createBot,
  getBots,
  getAvailableRepositories
};
