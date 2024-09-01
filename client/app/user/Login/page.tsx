"use client";
import AXIOS from "axios";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { useRouter } from "next/navigation";
const Login = () => {
  const nav=useRouter();
  const [data, setData] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    const emailid = sessionStorage.setItem("email", data.email);
  });
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    AXIOS.post("http://localhost:9000/user/login", data).then((res) => {
      console.log(res.data.sts);
      if(res.data.sts===1){
nav.push('/pages/Otp')
      }
      else if (res.data.sts===2){
        nav.push('/pages/aadhar')
      }
      else if(res.data.sts===3){
        nav.push('/pages/pan')
      }
      else if(res.data.sts===4){
        nav.push('/pages/gst')
      }
      else if(res.data.sts===5){
        nav.push('/pages/bank')
      }
      else if(res.data.sts===6){
        nav.push('/pages/pincode')
      }
    });
  };
  return (
    <div className="register">
      <div className="container">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />

          <button
            type="submit"
            className="submitbutton"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
