"use client";

import { useRouter } from "next/navigation";
import { useContext, useState, FormEvent } from "react";

export type SignupFormData = {
  email: string;
  password: string;
};

export const SignupForm = () => {
  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupFormData),
    });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <form className="flex flex-col gap-2" method="POST" onSubmit={onSubmit}>
      <label>
        Email
        <input
          required
          value={signupFormData.email}
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, email: e.target.value })
          }
          type="email"
          name="email"
        />
      </label>

      <label>
        Password
        <input
          required
          value={signupFormData.password}
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, password: e.target.value })
          }
          type="password"
          name="password"
        />
      </label>

      <button type="submit">Signup</button>
    </form>
  );
};
