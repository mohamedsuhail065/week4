"use client";
import React, { useEffect, useState } from "react";
import "./Gst.css";
import AXIOS from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Gstin = () => {
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
    AXIOS.post("http://localhost:9000/otp/gst", data).then((res) => {
      if (res.data.sts === 1) {
        setIsVerify(true);
      } else {
        toast.error("Invalid GSTIN");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting normally
    nav.push("/pages/bank");
  };

  return (
    <div className="register">
      <div className="container">
        <ToastContainer/>
        <h1>Gstin Verification</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="gst">Gstin Number</label>
          <div className="verifyemail">
            <input type="text" name="gstin" onChange={handleChange} />
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
          </div>
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

export default Gstin;
