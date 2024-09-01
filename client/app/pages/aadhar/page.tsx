"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./Aadhar.css";
import AXIOS from "axios";

const Aadhar = () => {
  const nav = useRouter();
  const [data, setData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSendOtpClick = () => {
    AXIOS.post("http://localhost:9000/otp/aadhar", data).then((res) => {
      console.log(res.data.sts);
      if (res.data.sts === 1) {
        setIsVerified(true);
      }
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
        <h1>Aadhar Verification</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Aadhar Number</label>
          <div className="verifyemail">
            <input type="email" name="aadhar" onChange={handleChange} />
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
