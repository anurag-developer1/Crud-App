import React, { useState } from 'react';
import axios from 'axios';

import Select from 'react-select';

const CreateEmployeeForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    country: 'US',
    departments: [],
    checkBox: [],
    image: null
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
  ];

  const departmentsOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' }
  ];

  // All handlers remain exactly the same
  const handleChangeName = (e) => {
    setFormData({...formData, name: e.target.value});
  };

  const handleChangeEmail = (e) => {
    setFormData({...formData, email: e.target.value});
  };

  const handleChangePhone = (e) => {
    setFormData({...formData, phone: e.target.value});
  };

  const handleChangeGender = (e) => {
    setFormData({...formData, gender: e.target.value});
  };

  const handleChangeCountry = (e) => {
    setFormData({...formData, country: e.target.value});
  };

  const handleChangeDepartments = (selectedOptions) => {
    setFormData({
      ...formData,
      departments: selectedOptions.map((option) => option.value)
    });
  };

  const handleRemoveDepartment = (deptToRemove) => {
    setFormData({
      ...formData,
      departments: formData.departments.filter(dept => dept !== deptToRemove)
    });
  };

  const handleClearDepartments = () => {
    setFormData({
      ...formData,
      departments: []
    });
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== option.id));
      setFormData({
        ...formData,
        checkBox: formData.checkBox.filter((id) => id !== option.id)
      });
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
      setFormData({
        ...formData,
        checkBox: [...formData.checkBox, option.id]
      });
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    const response = await axios.post('http://localhost:3000/api2/v1/createEmployee', data, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    props.setShowCreateForm(false);
    console.log('Form with image submitted successfully:', response.data);
  };

  const handleClose = () => {
    props.setShowCreateForm((prev) => !prev);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {/* Left Column */}
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChangeName}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChangeEmail}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChangePhone}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Gender:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChangeGender}
                  required
                  className="mr-2"
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChangeGender}
                  required
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-gray-700 font-semibold mb-1">Country:</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChangeCountry}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="IN">India</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
           

            <div>
              <label htmlFor="departments" className="block text-gray-700 font-medium mb-1">Departments:</label>
              <Select
                id="departments"
                name="departments"
                options={departmentsOptions}
                value={formData.departments.map((dept) => departmentsOptions.find((option) => option.value === dept))}
                onChange={handleChangeDepartments}
                isMulti
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChangeFile}
                className="w-full"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-10 h-10 mt-1 rounded-full"
                />
              )}
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold mb-1">Multiple-Checkbox Example:</h3>
              <div className="space-y-1">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.id}
                      name={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleCheckboxChange(option)}
                      className="mr-2"
                    />
                    <label htmlFor={option.id} className="text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">Selected options: {selectedOptions.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Full Width */}
        <div className="flex justify-end space-x-4 pt-3">
          <button
            onClick={handleClose}
            type="button"
            className="bg-gray-500 text-white px-6 py-1.5 rounded hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-1.5 rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;

