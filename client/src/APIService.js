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

// import APIService from "./APIService";
// function Form({ addedAdmin }) {
//     const [a_email, setA_email] = useState("JohnLee@gmail.com");
//     const [fname, setFname] = useState("John");
//     const [lname, setLname] = useState("Lee");

//     const AddNewAdmin = () => {
//       APIService.AddNewAdmin({ a_email, fname, lname })
//         .then((res) => addedAdmin(res))
//         .catch((error) => console.log(error));
//     };

//     function handleSubmit(e) {
//       e.preventDefault();
//       add;
//     }
//   }
