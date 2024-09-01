"use client";
import React, { useEffect, useState } from "react";
import "./Bank.css";
import AXIOS from "axios";
import { useRouter } from "next/navigation";

const Bank = () => {
  const nav = useRouter();
  const [data, setData] = useState({});
  const [isVerify, setIsVerify] = useState<boolean>(false); // Default to false for initial state

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setData((prevData) => ({ ...prevData, email }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSendOtpClick = () => {
    AXIOS.post("http://localhost:9000/otp/bank", data).then((res) => {
      if (res.data.sts === 1) {
        setIsVerify(true);
      } else {
        alert("Invalid Bank details");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting normally
    nav.push("/pages/pincode");
  };

  return (
    <div className="register">
      <div className="container">
        <h1>Bank Verification</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="accno">Accout Number</label>
          <div className="verifyemail">
            <input type="text" name="accno" onChange={handleChange} />
            <label htmlFor="ifsc">IFSC</label>
            <input type="text" name="ifsc" onChange={handleChange}/>
            </div>
            {!isVerify && (
              <button
                type="button"
                className="verifybtn"
                onClick={handleSendOtpClick}
              >
                Verify
              </button>
            )}

            {isVerify && <span className="verified">Verified</span>}
          
          {isVerify && (
            <div className="next">
              <button type="submit">Proceed</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Bank;
