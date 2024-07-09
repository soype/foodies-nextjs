"use client";

import { useFormStatus } from "react-dom";

import styles from "./SubmitButton.module.scss";

export default function SubmitButton({ text }) {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submit} type="submit" disabled={pending}>
      {pending ? "Submitting..." : text}
    </button>
  );
}
