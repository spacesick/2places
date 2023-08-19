"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export type CreatePlaceFormData = {
  name: string,
  description: string,
};

export const CreatePlaceForm = () => {
  const [createPlaceFormData, setCreatePlaceFormData] = useState<CreatePlaceFormData>({
    name: "",
    description: "",
  });

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createPlaceFormData),
    });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <form className="flex flex-col gap-2" method="POST" onSubmit={onSubmit}>
      <label>
        Name
        <input
          required
          value={createPlaceFormData.name}
          onChange={(e) =>
            setCreatePlaceFormData({ ...createPlaceFormData, name: e.target.value })
          }
          type="text"
          name="name"
        />
      </label>

      <label>
        Description
        <input
          required
          value={createPlaceFormData.description}
          onChange={(e) =>
            setCreatePlaceFormData({ ...createPlaceFormData, description: e.target.value })
          }
          type="text"
          name="description"
        />
      </label>

      <button type="submit">Create</button>
    </form>
  );
};
