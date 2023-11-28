export default class APIService {
  static async AddNewAdmin(body) {
    try {
      const response = await fetch(`/addAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application.json" },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }
}
