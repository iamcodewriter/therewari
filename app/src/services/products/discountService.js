import http from "../httpService";
import { apiUrl } from "../../config.json";
const apiEndpoint = apiUrl + "/discounts";
export function getDiscounts() {
  return http.get(apiEndpoint);
}
export function getDiscount(discountId) {
  return http.get(apiEndpoint + "/" + discountId);
}
export function deleteDiscount(discountId) {
  return http.delete(apiEndpoint + "/" + discountId);
}
export function saveDiscount(discount) {
  if (discount._id) {
    const body = { ...discount };
    delete body._id;
    delete body.__v;
    return http.put(apiEndpoint + "/" + discount._id, body);
  }
  return http.post(apiEndpoint, discount);
}
