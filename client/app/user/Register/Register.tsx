"use client";
import AXIOS from "axios";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const nav = useRouter();
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "Name is required";
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email address is invalid";
        }
        break;
      case "phone":
        if (!value) {
          error = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Mobile number is invalid";
        }
        break;
      case "dob":
        if (!value) error = "Date of Birth is required";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Validate the field on change and update errors state
    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

    // Validate all fields, including those that are empty
    ["name", "email", "phone", "dob"].forEach((key) => {
      const error = validate(key, data[key] || ""); // Check if the value is empty
      if (error) {
        formIsValid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      AXIOS.post("http://localhost:9000/user/register", data)
        .then((res) => {
          // Handle registration response
          toast.success(res.data.message)
          nav.push("/pages/Otp");
        })
        .catch((error) => {
          // Handle registration error
          toast.error(error.response.data.message)
          toast.error(error)
        });
    } else {
      toast.error("Clear the errors to proceed")
    }
  };

  useEffect(() => {
    sessionStorage.setItem("email", data.email);
  }, [data.email]);

  return (
    <div className="register">
      <div className="container">
        <h1>Register</h1>
        <ToastContainer/>
        <form>
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="mobile">Mobile</label>
          <input type="tel" name="phone" onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label htmlFor="dob">Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} />
          {errors.dob && <p className="error">{errors.dob}</p>}

          <button type="submit" className="submitbutton" onClick={handleSubmit}>
            Other Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
