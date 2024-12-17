import React from "react";
import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store);
  // sadece pozisyon degerlerinden olusan dizi olusturma
  const arr = jobs.map((job) => job[name]);
  // dizide tekrar eden elemanlari kaldirma
  const filtredSet = new Set(arr);
  // set'in dondurdugu nesneyi diziye cevirme
  const options = Array.from(filtredSet);
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input list={name} name={name} id={label} type="text" required />

      <datalist id={name}>
        {options.map((i) => (
          <option value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
