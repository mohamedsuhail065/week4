"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./Aadhar.css";
import AXIOS from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Aadhar = () => {
  const nav = useRouter();
  const [data, setData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSendOtpClick = () => {
    AXIOS.post("http://localhost:9000/otp/aadhar", data).then((res) => {
      if (res.data.sts === 1) {
        setIsVerified(true);
      } 
      else{
        toast.error('Invalid Aadhar')
      }
    }).catch((error)=>{
      toast.error(error)
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nav.push("/pages/pan");
  };
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setData((prevData) => ({ ...prevData, email }));
    }
  }, []);
  return (
    <div className="register">
      <div className="container">
        <ToastContainer/>
        <h1>Aadhar Verification</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Aadhar Number</label>
          <div className="verifyemail">
            <input type="text" name="aadhar" onChange={handleChange} />
            {!isVerified && (
              <button
                type="button"
                className="verifybtn"
                onClick={handleSendOtpClick}
              >
                Send OTP
              </button>
            )}

            {isVerified && <span className="verified">Verified</span>}
          </div>
          {isVerified && (
            <div className="next">
              <button type="submit">Proceed</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Aadhar;
