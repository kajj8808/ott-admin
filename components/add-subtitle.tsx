"use client";

import { uploadSubtitle } from "@/app/admin/upload/subtitle/action";
import { useFormState } from "react-dom";

export default function AddSubtitle() {
  const [state, action] = useFormState(uploadSubtitle, null);
  console.log(state);
  return (
    <form action={action}>
      <input type="file" name="file" />
      <button>Send</button>
    </form>
  );
}
