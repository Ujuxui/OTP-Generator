import React, { useState, useEffect } from "react";

function OTPGenerator() {
   
   const[otp, setOtp] = useState("");
   const [expiry, setExpiry] = useState(0);
   const [copied, setCopied] = useState(false);
 
   // Generate OTP
   const handleGenerate = () => {
     const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
     setOtp(newOtp);
     setExpiry(30); // 30-second countdown
     setCopied(false);
   };
 
   // Countdown Timer
   useEffect(() => {
     if (expiry <= 0) return;
 
     const timer = setInterval(() => {
       setExpiry((prev) => prev - 1);
     }, 1000);
 
     return () => clearInterval(timer);
   }, [expiry]);
 
   // Clear OTP on expiry
   useEffect(() => {
     if (expiry === 0) setOtp("");
   }, [expiry]);
 
   // Copy to clipboard
   const handleCopy = () => {
     navigator.clipboard.writeText(otp);
     setCopied(true);
   };

    return (
    <>
    <div className="mt-32 text-center">
        <h1 className="text-6xl font-semibold text-blue-800">Welcome to the DUD Bank</h1>
        <p className=" text-2xl mt-16">Please generate a new OTP here.</p>
        <button onClick={handleGenerate} className="mt-12 font-bold rounded bg-gradient-to-r from-amber-500 to-blue-700 text-white py-4 px-8 hover:scale-105 transition-transform">Generate OTP</button>
        {otp && (
             <p className=" text-2xl mt-16">OTP: <span className="text-blue-600">{otp}</span></p>
            )}
                <p className="text-sm text-gray-600 mt-4">
            Expires in: {expiry} seconds
          </p>
          <button
            onClick={handleCopy}
            className="mt-4 px-4 py-1 rounded border hover:bg-blue-700 hover:text-white"
          >
            {copied ? "Copied!" : "Copy OTP"}
          </button>
    </div>
    </>
    )
}

export default OTPGenerator;