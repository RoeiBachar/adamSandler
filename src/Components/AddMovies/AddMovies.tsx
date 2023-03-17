import { useForm } from "react-hook-form";
import { movieInterface } from "../../Interfaces/movieInterface";
import "./AddMovies.css";
import { app } from "../../Firebase/firebase";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
function AddMovies(): JSX.Element {
    const { v4: uuidv4 } = require('uuid');
    const db = getFirestore(app);
    


  const { register, handleSubmit } = useForm<movieInterface>();

  const send = async(data: movieInterface) => {
    try {
        const result = await setDoc(doc(db, "movies", uuidv4()), data);
        console.log(result);
      } catch (error) {
        console.log(error);
      }

  };
  return (
    <div className="AddMovies">
         <div className="Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add movie</h2>
        <label>title:</label>
        <input type="text" {...register("title", { required: true })} />
        <label>year</label>
        <input type="number" {...register("year", { required: true })} />
        <label>img:</label>
        <input type="text" {...register("img", { required: true })} />
        <label>description:</label>
        <input type="text" {...register("description")} />
        <label>imdb:</label>
        <input type="number" step="0.01"{...register("imdb", { required: true })} />
        
        <input
          type="submit"
          value="Add Movie"
          style={{
            height: 50,
            backgroundColor: "lightgreen",
            borderRadius: 20,
          }}
        />
        <input
          type="reset"
          value="reset"
          style={{
            height: 50,
            backgroundColor: "lightgreen",
            borderRadius: 20,
          }}
        />
      </form>
      </div>
    </div>
  );
}

export default AddMovies;
