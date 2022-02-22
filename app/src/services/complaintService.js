import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/complaints";
export function getComplaints() {
  return http.get(apiEndpoint);
}
export function getComplaint(complaintId) {
  return http.get(apiEndpoint + "/" + complaintId);
}
export function deleteComplaint(complaintId) {
  return http.delete(apiEndpoint + "/" + complaintId);
}
export function saveComplaint(complaint) {
  if (complaint._id) {
    const body = { ...complaint };
    delete body._id;
    return http.put(apiEndpoint + "/" + complaint._id, body);
  }
  return http.post(apiEndpoint, complaint);
}
