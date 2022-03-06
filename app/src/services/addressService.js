import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/addresses";
export function getAddresses() {
  return http.get(apiEndpoint);
}
export function getAddress(addressId) {
  return http.get(apiEndpoint + "/" + addressId);
}
export function deleteAddress(addressId) {
  return http.delete(apiEndpoint + "/" + addressId);
}
export function saveAddress(address) {
  if (address._id) {
    const body = { ...address };
    delete body._id;
    return http.put(apiEndpoint + "/" + address._id, body);
  }
  return http.post(apiEndpoint, address);
}
