import React from "react";

const Dropdown = ({ title, category, options }) => {
  return (
    <div className="select">
      <select name="format" id="format" defaultValue={""} onChange={category}>
        <option value="" disabled>
          {title}
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
