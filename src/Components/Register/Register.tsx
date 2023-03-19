import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginInterface } from "../../Interfaces/loginInterface";
import { registerInterface } from "../../Interfaces/registerInterface copy";
import "./Register.css";
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "@firebase/firestore";
import { app } from "../../Firebase/firebase";
import { useEffect, useState } from "react";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [getErr, setErr] = useState("");
  const { register, handleSubmit } = useForm<registerInterface>();
  const { v4: uuidv4 } = require("uuid");
  const db = getFirestore(app);
  const send = async (data: registerInterface) => {
    const id = uuidv4();
    const newData = { ...data, favorites: [], id: id };
    const usersCollection = await collection(db, "users");
    const userColumn = await getDocs(usersCollection);
    const usersDocs = userColumn.docs.map((doc) => doc.data());
    const isUserExist = await getDocs(query(usersCollection, where("username", "==", newData.username)));

   
    if (isUserExist.empty) {
      try {
        const result = await setDoc(doc(db, "users", id), newData);
        console.log(result);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr("כבר קיים שם משתמש כזה");
    }
  };
  return (
    <div className="Register">
      <div id="registerContainer">Register</div>
      <div id="inputs">
        <form onSubmit={handleSubmit(send)}>
          <label>First Name</label>
          <input
            type="string"
            {...register("first_name", { required: true })}
          />
          <label>Username:</label>
          <h2>{getErr}</h2>
          <input type="text" {...register("username", { required: true })} />
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />

          <input id="loginImage" type="submit" value="" />
        </form>
        <p id="registerNavigate">
          <NavLink to="/">Already have a user?</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
