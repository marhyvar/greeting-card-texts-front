import http from "../http-common";

class TekstiDataService {

  //hakee kaikki tekstit
  getAll() {
    return http.get("/tekstit");
  }

  //hakee tekstin id:n perusteella
  get(id) {
    return http.get(`/tekstit/${id}`);
  }

  //luo uuden tekstin
  create(data) {
    return http.post("/tekstit", data);
  }

  //päivittää olemassa olevan tekstin tietoja
  update(id, data) {
    return http.put(`/tekstit/${id}`, data);
  }

  //poistaa tekstin
  delete(id) {
    return http.delete(`/tekstit/${id}`);
  }

  //hakee kaikki teemat
  getTeemat() {
      return http.get("/teemat");
  }

  //luo uuden teeman
  createTeema(data) {
      return http.post("/teemat", data);
  }

  //hakee teeman id:n perusteella
  findByTeema(id) {
    return http.get(`/teemat/${id}/tekstit`);
  }
}

export default new TekstiDataService();
