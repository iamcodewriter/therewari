import axios from "axios";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  const excectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!excectedError) {
    logger.log(error);
    alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
