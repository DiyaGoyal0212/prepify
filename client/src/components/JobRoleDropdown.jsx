import React from 'react';

const JobRoleDropdown = ({ onSelectRole }) => {
  return (
    <select onChange={e => onSelectRole(e.target.value)}>
      <option value="">Select Job Role</option>
      <option value="C++">C++</option>
      <option value="Java">Java</option>
      <option value="React">React</option>
    </select>
  );
};

export default JobRoleDropdown;
