import { useState, useEffect, useCallback } from "react";
// import backgroundImage from "../assets/m1.jpg";
import { Link } from "react-router-dom";

export default function Login({ onToggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const validate = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  }, [email, password]); // Dependencies of validate

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
  }, [validate]); // Use the memoized validate function as a dependency

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Handle successful form submission (e.g., send data to an API)
      console.log("Form submitted successfully");
    }
  };

  return (
    <div
       className="flex justify-center ">
        
      <div className="absolute h-screen inset-auto opacity-100 max-w-md w-screen custom3:h-screen custom3:inset-0 rounded-lg p-8 backdrop-blur-lg ">
        <h1 className="text-center underline text-3xl mb-4 mt-11">Login</h1>
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-medium mb-4 text-lg">
            Email:
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter the Email"
            className={`mb-1 w-full rounded-3xl p-2 focus:outline-none focus:ring-2 ${
              errors.email ? "ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
          <label htmlFor="password" className="font-medium mb-4 text-lg">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter the Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={`mb-1 w-full rounded-3xl p-2 focus:outline-none focus:ring-2 ${
              errors.password ? "ring-red-500" : "focus:ring-blue-500"
            }`}
           
          />
          {errors.password && (
            <p className="text-red-500 text-sm ">{errors.password}</p>
          )}
          <Link to="/home"
            type="submit"
            className="bg-blue-700 mb-4 w-full rounded-3xl p-2 text-center mt-4 hover:bg-blue-900 transition duration-300"
          >
            Submit
          </Link>
          <p>
            Don't have an account?{" "}
            <i>
              <span
                onClick={onToggle}
                className="underline text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                signup
              </span>
            </i>
          </p>
        </form>
       
      </div>
      
    </div>
  );
}
