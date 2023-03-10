import { setDoc, doc } from "@firebase/firestore";
import { useForm } from "react-hook-form";
import { movieInterface } from "../../Interfaces/movieInterface";
import "./Login.css";
import { loginInterface } from "../../Interfaces/loginInterface";
import { NavLink, Navigate } from "react-router-dom";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<loginInterface>();
  const send = async (data: loginInterface) => {
    try {
      console.log(data);
      // const result = await setDoc(doc(db, "movies", uuidv4()), data);
      // console.log(result);
    } catch (error) {
      console.log(error);
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
          <input id="loginImage" type="submit" value="" />
        </form>
        <p id="registerNavigate"><NavLink to="/register">NOT REGISTERED YET?</NavLink></p>
      </div>
    </div>
  );
}

export default Login;
