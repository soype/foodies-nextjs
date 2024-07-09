"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./imagePicker.module.scss";

const ImagePicker = ({ label, name }) => {
  const [pickedimage, setPickedImage] = useState();

  const imageInput = useRef();

  const imageUploadHandler = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedimage && <p>No image picked</p>}
          {pickedimage && (
            <Image src={pickedimage} alt="Image selected by the user" fill />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png image/jpg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={imageUploadHandler}
        >
          Upload an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
