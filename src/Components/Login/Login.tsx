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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { send } from "process";
import { updateUserData } from "../../Redux/features/dataSlice";
import { userInterface } from "../../Interfaces/userInterface";

function Login(): JSX.Element {
  const [getErr, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<loginInterface>();
  const db = getFirestore(app);

  const send = async (data: loginInterface) => {
    try {
      checkUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

    const checkUsers = async (data: loginInterface) => {
    const usersCollection = await collection(db, "users");
    const userColumn = await getDocs(usersCollection);
    const usersDocs = userColumn.docs.map((doc) => doc.data());
    const queryDocs = query(usersCollection, where("username", "==", data.username));
    const querySnapshot = await getDocs(queryDocs);
    const docId = querySnapshot.docs[0]?.id;
    console.log(docId);
    
    const loggedInUser = usersDocs.find((userDoc) => {
      if (
        userDoc.username === data.username &&
        userDoc.password === data.password
      ) {
        const userData: userInterface = {
          id:docId,
          username: userDoc.username,
          password: userDoc.password,
          first_name: userDoc.first_name,
          favorites: userDoc.favorites,
        };
        console.log(userData);
        
        return userData;
      } else {
        return undefined;
      }
    }) as userInterface | undefined;

    if (loggedInUser) {
      dispatch(updateUserData(loggedInUser));
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
