import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { loginInterface } from "../../Interfaces/loginInterface";
import { registerInterface } from "../../Interfaces/registerInterface copy";
import "./Register.css";

function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<registerInterface>();
  const send = async (data: registerInterface) => {
    try {
      console.log(data);
      // const result = await setDoc(doc(db, "movies", uuidv4()), data);
      // console.log(result);
    } catch (error) {
      console.log(error);
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
