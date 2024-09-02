"use client";
import React, { useEffect, useState } from "react";
import AXIOS from "axios";
import { useRouter } from "next/navigation";
import "./UserDetails.css";

// Define the type for user
interface User {
  name: string;
  email: string;
  phone: string;
  dob: string; // or Date if you prefer to use Date objects
  aadharNumber?: string;
  gstno?: string;
  accno?: string;
  pan?: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  address?: {
    pincode?: string;
    area?: string;
    district?: string;
    state?: string;
  };
}

const UserDetails = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const emailid = sessionStorage.getItem("email");
      if (!emailid) {
        setError("No email found in session.");
        setLoading(false);
        return;
      }
      try {
        const response = await AXIOS.get<User>(
          "http://localhost:9000/user/details",
          {
            headers: {
              email: emailid, // Add email to headers
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!user) return <p>No user data available.</p>;

  return (
    <div className="user-details">
      <h1>User Details</h1>
      <div className="detail">
        <strong>Name:</strong> <span>{user.name}</span>
      </div>
      <div className="detail">
        <strong>Email:</strong> <span>{user.email}</span>
      </div>
      <div className="detail">
        <strong>Phone:</strong> <span>{user.phone}</span>
      </div>
      <div className="detail">
        <strong>Date of Birth:</strong>
        <span>
          {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
        </span>
      </div>
      <div className="detail">
        <strong>Aadhar Number:</strong>
        <span>{user.aadharNumber || "N/A"}</span>
      </div>
      <div className="detail">
        <strong>GST Number:</strong> <span>{user.gstno || "N/A"}</span>
      </div>
      <div className="detail">
        <strong>Account Number:</strong> <span>{user.accno || "N/A"}</span>
      </div>
      <div className="detail">
        <strong>PAN:</strong> <span>{user.pan || "N/A"}</span>
      </div>
      <div className="detail">
        <strong>Phone Verified:</strong>
        <span>{user.isPhoneVerified ? "Yes" : "No"}</span>
      </div>
      <div className="detail">
        <strong>Email Verified:</strong>
        <span>{user.isEmailVerified ? "Yes" : "No"}</span>
      </div>
      <div className="detail">
        <strong>Address:</strong>
        <div className="pin">
          <strong>Pincode:</strong>
          <span>{user.address?.pincode || "N/A"}</span>
        </div>
        <div className="pin">
          <strong>Area:</strong> <span>{user.address?.area || "N/A"}</span>
        </div>
        <div className="pin">
          <strong>District:</strong>
          <span>{user.address?.district || "N/A"}</span>
        </div>
        <div className="pin">
          <strong>State:</strong> <span>{user.address?.state || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
