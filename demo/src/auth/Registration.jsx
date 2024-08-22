import { useEffect, useCallback } from "react";
import { useState } from "react";


export default function Registration({ onToggle }) {
  const [allInputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const savingData = async (lname, fname, email, password) => {
    const myEndpoint = "http://localhost:5000/user/register-user/";
    try {
      const response = await fetch(myEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lname,
          fname,
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const myJsonData = await response.json();
      console.log("myJsonData: ", myJsonData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault(); //prevent page loading when click on button
    const validationErrors = validate();
    setErrors(validationErrors);

    if (!emailExists && Object.keys(validationErrors).length === 0) {
      try {
        await savingData(
          allInputData.lname,
          allInputData.fname,
          allInputData.email,
          allInputData.password
        );

        setInputData({
          lname: "",
          fname: "",
          email: "",
          password: "",
        });
        onToggle();
      } catch (error) {
        console.log("Failed to save data:", error);
      }
    } else {
      console.log("Form validation failed or email already exists");
    }
  };

  const [emailExists, setEmailExists] = useState(false);

  const onChangeInput = (event) => {
    setInputData({ ...allInputData, [event.target.name]: event.target.value });
    if (event.target.name === "email") {
      checkEmailExists(event.target.value);
    }
  };

  const checkEmailExists = async (email) => {
    const checkEmailEndpoint =
      "http://localhost:5000/user/register-user/check-email";
    try {
      const response = await fetch(checkEmailEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }
    } catch (error) {
      console.error("Error checking email:", error.message);
    }
  };

  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!allInputData.fname) {
      errors.fname = "First Name is required";
    } else if (!nameRegex.test(allInputData.fname)) {
      errors.fname = "First name cannot be other than alphabets";
    } else if (allInputData.fname.length < 3) {
      errors.fname = "First name must be atleast 3 character long";
    }

    if (!allInputData.lname) {
      errors.lname = "Last Name is required";
    } else if (!nameRegex.test(allInputData.lname)) {
      errors.lname = "Last name cannot be other than alphabets";
    } else if (allInputData.lname.length < 3) {
      errors.lname = "Last name must be atleast 3 character long";
    }

    if (!allInputData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(allInputData.email)) {
      errors.email = "Invalid email format";
    } else if (emailExists) {
      errors.email = "email already exist";
    }

    if (!allInputData.password) {
      errors.password = "Password is required";
    } else if (allInputData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  }, [
    allInputData.email,
    allInputData.password,
    allInputData.fname,
    allInputData.lname,
    emailExists,
  ]);

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
  }, [validate]);

  return (
    <div className="flex justify-center ">
      <div className="absolute  inset-auto opacity-100 max-w-md w-screen h-screen  custom3:inset-0 rounded-lg p-8 backdrop-blur-lg ">
        <h1 className="text-center underline text-3xl mb-10 md:mb-4">Signup</h1>
        <form className="flex flex-col items-start mt-auto">
          <label htmlFor="fname" className="font-medium  text-lg mb-1">
            First Name:
          </label>
          <input
            type="fname"
            id="fname"
            name="fname"
            placeholder="Enter the First Name"
            className={` w-full rounded-3xl p-2 focus:outline-none focus:ring-2 ${
              errors.fname ? "ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={onChangeInput}
            value={allInputData.fname}
          />
          {errors.fname && (
            <p className="text-red-500 text-sm ">{errors.fname}</p>
          )}
          <label htmlFor="lname" className="font-medium mt-2 text-lg mb-1">
            Last Name:
          </label>
          <input
            type="lname"
            id="lname"
            name="lname"
            placeholder="Enter the Last Name"
            className={` w-full rounded-3xl p-2 focus:outline-none focus:ring-2 ${
              errors.lname ? "ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={onChangeInput}
            value={allInputData.lname}
          />

          {errors.lname && (
            <p className="text-red-500 text-sm isVisible ? 'block' : 'hidden'">
              {errors.lname}
            </p>
          )}
          <label htmlFor="email" className="font-medium mt-2 text-lg mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter the Email"
            className={` w-full rounded-3xl p-2 focus:outline-none focus:ring-2 ${
              errors.email ? "ring-red-500" : "focus:ring-blue-500"
            }`}
            onChange={onChangeInput}
            value={allInputData.email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <label htmlFor="password" className="font-medium text-lg mt-2 mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter the Password"
            onChange={onChangeInput}
            value={allInputData.password}
            className={` w-full rounded-3xl p-2 focus:outline-none focus:ring-2 ${
              errors.password ? "ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-1">{errors.password}</p>
          )}
          <button
            type="submit"
            onClick={onSubmitHandle}
            className="bg-blue-700 w-full rounded-3xl p-2 hover:bg-blue-900 transition duration-300 mt-4"
          >
            Submit
          </button>
          <p>
            Already have an account?{" "}
            <i>
              <span
                onClick={onToggle}
                className="underline text-blue-700   hover:text-blue-900 cursor-pointer"
              >
                signin
              </span>
            </i>
          </p>
        </form>
      </div>
    </div>
  );
}
