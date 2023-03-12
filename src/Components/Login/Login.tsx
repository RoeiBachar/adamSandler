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
import { useForm } from "react-hook-form";
import { movieInterface } from "../../Interfaces/movieInterface";
import "./Login.css";
import { loginInterface } from "../../Interfaces/loginInterface";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { app } from "../../Firebase/firebase";
import { useState } from "react";

function Login(): JSX.Element {
  const [getErr, setErr] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<loginInterface>();
  const db = getFirestore(app);

  const send = async (data: loginInterface) => {
    try {
      console.log(data);
      checkUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const checkUsers = async (data: loginInterface) => {
    const usersCollection = await collection(db, "users");
    const userColumn = await getDocs(usersCollection);
    const users = userColumn.docs.map((doc) => doc.data());
    const q = query(usersCollection, where("username", "==", data.username));
    const querySnapshot = await getDocs(q);
     const docId =  querySnapshot.docs[0].id;
     console.log(docId);
    const normalUser = users.filter(
      (item) =>
        item.username === data.username && item.password === data.password
    );
    const myUsers: loginInterface[] = normalUser.map((item) => {
      return {
        username: item.username,
        password: item.password,
        first_name: item.first_name,
        favorites: item.favorites,
      };
    });
    console.log(myUsers);

    const isUserExists = myUsers.some(
      (obj) => obj.username === data.username && obj.password === data.password
    );
    if (isUserExists) {
      navigate("/main");
    } else {
      setErr("הנתונים שגויים");
    }
  };
  return (
    <div className="Login">
      <div id="loginContainer">LOGIN</div>
      <div id="inputs">
        <form onSubmit={handleSubmit(send)}>
          <label>Username:</label>
          <input type="text" {...register("username", { required: true })} />
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          <h2>{getErr}</h2>
          <input id="loginImage" type="submit" value="" />
        </form>
        <p id="registerNavigate">
          <NavLink to="/register">NOT REGISTERED YET?</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
