import http from "../httpService";
import { apiUrl } from "../../config.json";
const apiEndpoint = apiUrl + "/products";
export function getProducts() {
  return http.get(apiEndpoint);
}
export function getProduct(productId) {
  return http.get(apiEndpoint + "/" + productId);
}
export function deleteProduct(productId) {
  return http.delete(apiEndpoint + "/" + productId);
}
export function saveProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(apiEndpoint + "/" + product._id, body);
  }
  return http.post(apiEndpoint, product);
}
