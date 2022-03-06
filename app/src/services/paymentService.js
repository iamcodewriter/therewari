import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/payments";
export function getPayments() {
  return http.get(apiEndpoint);
}
export function getPayment(paymentId) {
  return http.get(apiEndpoint + "/" + paymentId);
}
export function deletePayment(paymentId) {
  return http.delete(apiEndpoint + "/" + paymentId);
}
export function savePayment(payment) {
  if (payment._id) {
    const body = { ...payment };
    delete body._id;
    return http.put(apiEndpoint + "/" + payment._id, body);
  }
  return http.post(apiEndpoint, payment);
}
