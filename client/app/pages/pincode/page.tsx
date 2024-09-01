"use client";
import React, { useEffect, useState } from "react";
import "./Pincode.css";
import AXIOS from "axios";
import { useRouter } from "next/navigation";

const Pincode = () => {
  interface DetailsType {
    office_name: string;
    division_name: string;
    district_name: string;
    state_name: string;
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
      (item) => item.office_name === selectedOfficeName
    );

    // Update the data state with the selected office details
    if (selectedDetails) {
      setData((prevData) => ({
        ...prevData,
        city: selectedDetails.division_name,
        district: selectedDetails.district_name,
        state: selectedDetails.state_name,
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
    console.log(data);
  };

  const handleSendOtpClick = () => {
    AXIOS.post("http://localhost:9000/otp/pincode", data).then((res) => {
      setPinDetails(res.data);
      console.log(res.data);
      if (res.data.length > 0) {
        setIsVerify(true);
      } else {
        alert("Invalid Pincode");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting normally
    AXIOS.post("http://localhost:9000/otp/pindetails", data).then((res) => {
      console.log("Submitted:", res.data);
    });
    nav.push("/pages/pincode");
  };

  return (
    <div className="register">
      <div className="container">
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
                    <option key={index} value={item.office_name}>
                      {item.office_name}
                    </option>
                  ))}
                </select>
                {selectedOffice && (
                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      value={data.city || ""}
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
              <button type="submit">Proceed</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Pincode;
