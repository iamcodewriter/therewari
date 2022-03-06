import http from "../httpService";
import { apiUrl } from "../../config.json";
const apiEndpoint = apiUrl + "/inventories";
export function getInventories() {
  return http.get(apiEndpoint);
}
export function getInventory(inventoryId) {
  return http.get(apiEndpoint + "/" + inventoryId);
}
export function deleteInventory(inventoryId) {
  return http.delete(apiEndpoint + "/" + inventoryId);
}
export function saveInventory(inventory) {
  if (inventory._id) {
    const body = { ...inventory };
    delete body._id;
    return http.put(apiEndpoint + "/" + inventory._id, body);
  }
  return http.post(apiEndpoint, inventory);
}
