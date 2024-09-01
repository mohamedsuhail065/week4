"use client";
import AXIOS from "axios";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { useRouter } from "next/navigation";

const Register = () => {
  const nav = useRouter();
  const [data, setData] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    AXIOS.post("http://localhost:9000/user/register", data)
      .then((res) => {
        // Handle registration response
        nav.push("/pages/Otp");
      })
      .catch((error) => {
        // Handle registration error
        console.log(error);
      });
  };
 useEffect(()=>{
  sessionStorage.setItem("email", data.email);
 })

  return (
    <div className="register">
      <div className="container">
        <h1>Register</h1>
        <form>
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
          <label htmlFor="mobile">Mobile</label>
          <input type="tel" name="phone" onChange={handleChange} />
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} />

          <button type="submit" className="submitbutton" onClick={handleSubmit}>
            Other Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
