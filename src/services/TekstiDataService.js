import http from "../http-common";

class TekstiDataService {
  getAll() {
    return http.get("/tekstit");
  }

  get(id) {
    return http.get(`/tekstit/${id}`);
  }

  create(data) {
    return http.post("/tekstit", data);
  }

  update(id, data) {
    return http.put(`/tekstit/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tekstit/${id}`);
  }

  getTeemat() {
      return http.get("/teemat");
  }

  createTeema(data) {
      return http.post("/teemat", data);
  }

  findByTeema(id) {
    return http.get(`/teemat/${id}/tekstit`);
  }
}

export default new TekstiDataService();
