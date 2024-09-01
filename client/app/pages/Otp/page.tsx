"use client";
import AXIOS from "axios";
import React, {
  ButtonHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Otp.css";
import { useRouter } from "next/navigation";

const OtpVerification = () => {
  const nav = useRouter();
  const [tab, setTab] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>({});
  const emailref = useRef<HTMLInputElement>(null);
  const phoneref = useRef<HTMLInputElement>(null);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEmail && isPhone) {
      nav.push("/pages/aadhar");
    } else {
      console.log("verify email and password");
    }
  };

  useEffect(() => {
    const emailid = sessionStorage.getItem("email");
    if (emailid) {
      const url = `http://localhost:9000/user/data?email=${encodeURIComponent(
        emailid
      )}`;

      AXIOS.get(url)
        .then((response) => {
          const { email, phone } = response.data;
          if (emailref.current) emailref.current.value = email;
          if (phoneref.current) phoneref.current.value = phone;
          console.log(response);
        })
        .catch((err) => {});
    } else {
    }
  }, []);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, otp: e.target.value });
  };

  const handleSendOtpClick = (tabType: string) => {
    const payload =
      tabType === "email"
        ? { email: emailref.current?.value }
        : { phone: phoneref.current?.value };

    console.log("Sending OTP to:", payload); // Debugging line

    const apiUrl =
      tabType === "email"
        ? "http://localhost:9000/otp/req-otp"
        : "http://localhost:9000/otp/sms";

    AXIOS.post(apiUrl, payload)
      .then((response) => {
        alert(response.data.msg);
        setTab(tabType);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleVerifyOtp = () => {
    const verifyUrl =
      tab === "email"
        ? "http://localhost:9000/otp/verify-otp"
        : "http://localhost:9000/otp/sms-verify";

    const payload = {
      otp: data.otp,
      email: tab === "email" ? emailref.current?.value : undefined,
      phone: tab === "phone" ? phoneref.current?.value : undefined,
    };

    AXIOS.post(verifyUrl, payload)
      .then((response) => {
        alert(response.data.msg);
        console.log("OTP verified successfully");
        handleCloseModal();
        if (tab === "email") {
          setIsEmail(true);
        } else {
          setIsPhone(true);
        }
      })
      .catch((error) => {
        // Handle OTP verification error
        console.error("Error verifying OTP:", error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTab(null);
  };

  return (
    <div className="register">
      <div className="container">
        <h1>Otp Verification</h1>
        <form>
          <label htmlFor="email">Email</label>
          <div className="verifyemail">
            <input type="email" name="email" ref={emailref} disabled />
            {!isEmail && (
              <button
                type="button"
                className="verifybtn"
                onClick={() => handleSendOtpClick("email")}
              >
                Send OTP
              </button>
            )}

            {isEmail && <span className="verified">Verified</span>}
          </div>

          <label htmlFor="mobile">Mobile</label>
          <div className="verifymobile">
            <input type="tel" name="phone" ref={phoneref} />
            {!isPhone && (
              <button
                type="button"
                className="verifybtn"
                onClick={() => handleSendOtpClick("phone")}
              >
                Send OTP
              </button>
            )}
            {isPhone && <span className="verified">Verified</span>}
          </div>

          <button type="submit" className="submitbutton" onClick={handleSubmit}>
            Next
          </button>
        </form>
      </div>

      {/* Modal for OTP Verification */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Verify {tab === "email" ? "Email" : "Phone"}</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              onChange={handleOtpChange}
            />
            <button onClick={handleVerifyOtp}>Verify</button>
            <button className="close-modal" onClick={handleCloseModal}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
