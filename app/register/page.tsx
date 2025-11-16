// src/app/register/page.tsx
"use client";

import React, { useState } from "react";
import userRegister from "@/libs/userRegister";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tel: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await userRegister(
        formData.email,
        formData.password,
        formData.tel,
        formData.name
      );

      const result = await signIn("credentials", {
        redirect: true,
        email: formData.email,
        password: formData.password,
        callbackUrl: "/",
      });

      if (result?.ok) router.push("/");
      else console.log("Failed to register.");

      console.log("is ok ? = " + result?.ok);

      setSuccess("Registration and Login successful!");
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="bg-white items-center justify-center pt-[7vh]">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6">
        <h1 className="text-[32px] font-bold mb-4 text-black font-robotoMono">
          REGISTER
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <table className="w-full border-collapse border-none text-black">
            <tbody>
              <tr>
                <td className="p-2 text-black"></td>
                <td className="p-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-black bg-white font-mono"
                  />
                </td>
              </tr>

              <tr>
                <td className="p-2 text-black"></td>
                <td className="p-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full  p-2 border border-black bg-white font-mono"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 text-black"></td>
                <td className="p-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full  p-2 border border-black bg-white font-mono"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 text-black"></td>
                <td className="p-2">
                  <input
                    type="tel"
                    name="tel"
                    placeholder="Telephone"
                    value={formData.tel}
                    onChange={handleChange}
                    required
                    className="w-full  p-2 border border-black bg-white font-mono"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="mt-4 w-[195px] font-robotoMono bg-black mx-auto text-white py-2 rounded-[48px] 
             flex justify-center items-center 
             transition-transform duration-200 transform hover:scale-105"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
