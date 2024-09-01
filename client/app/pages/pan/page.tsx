"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import './Pan.css'
import AXIOS from "axios";

const Pan = () => {
  const nav = useRouter();
  const [data, setData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSendOtpClick = () => {
    AXIOS.post("http://localhost:9000/otp/pan", data).then((res) => {
      console.log(res.data);
      if (res.data.sts === 1) {
        setIsVerified(true);
      }
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nav.push("/pages/gst");
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
        <h1>PAN Verification</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pan">Pan Number</label>
          <div className="verifyemail">
            <input type="text" name="pan" onChange={handleChange} />
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

export default Pan;
