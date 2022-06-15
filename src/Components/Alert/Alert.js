import { useState } from "react";
import "./Alert.css";
export const Alert = (msg) => {
  const [display, setDisplay] = useState("none");
  if (msg) {
    setDisplay("block");
  } else {
    setDisplay("none");
  }
  return (
    <div className='alert-container' style={{ display: { display } }}>
      <div>alert</div>
    </div>
  );
};
