"use client";
import React, { useEffect, useState } from "react";
import "./Pincode.css";
import AXIOS from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Pincode = () => {
  interface DetailsType {
    area: string;
    district: string;
    state: string;
  }

  const nav = useRouter();
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [pindetails, setPinDetails] = useState<DetailsType[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>("");

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOfficeName = e.target.value;
    setSelectedOffice(selectedOfficeName);

    // Find the selected office details
    const selectedDetails = pindetails.find(
      (item) => item.area === selectedOfficeName
    );

    // Update the data state with the selected office details
    if (selectedDetails) {
      setData((prevData) => ({
        ...prevData,
        area: selectedDetails.area,
        district: selectedDetails.district,
        state: selectedDetails.state,
      }));
    }
  };

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
    AXIOS.post("http://localhost:9000/otp/pincode", data).then((res) => {
      setPinDetails(res.data);
      console.log(res.data);
      if (res.data.length > 0) {
        setIsVerify(true);
      } else {
        toast.error("Invalid Pincode");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting normally

    AXIOS.post("http://localhost:9000/otp/pindetails", data).then((res) => {
    });
    nav.push("/user/Details");
  };

  return (
    <div className="register">
      <div className="container">
        <ToastContainer/>
        <h1>Address</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pin">Pin Number</label>
          <div className="verifyemail">
            <input type="text" name="pin" onChange={handleChange} />
          </div>
          {!isVerify && (
            <button
              type="button"
              className="verifybtn"
              onClick={handleSendOtpClick}
            >
              Get details
            </button>
          )}

          {isVerify && (
            <div className="postal">
              <div>
                <label htmlFor="select">Select your Office</label>
                <select onChange={onSelect}>
                  <option>Select your office</option>
                  {pindetails.map((item, index) => (
                    <option key={index} value={item.area}>
                      {item.area}
                    </option>
                  ))}
                </select>
                {selectedOffice && (
                  <div>
                    <label htmlFor="city">Area</label>
                    <input
                      type="text"
                      name="area"
                      value={data.area || ""}
                      disabled
                    />
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      name="district"
                      value={data.district || ""}
                      disabled
                    />
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      value={data.state || ""}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {isVerify && (
            <div className="next">
              <button type="submit">Submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Pincode;
