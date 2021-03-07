import React from "react";

//referans tip olan bir degisken. bu degisken bir fonksiyon tutuyor.
//proplarla datayı gonderiyoruk daha sonrasında fonk icinde this.props.... diye yazıyorduk.
//react hooksta this.props yerine obje parametra gecip
const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></input>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>{" "}
    </div>
  );
};

export default TextInput;
