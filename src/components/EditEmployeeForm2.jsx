import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const EditEmployeeForm2 = (props) => {
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

  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
  ];

  const [lastUploadedImage, setLastUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const departmentsOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Operations', label: 'Operations' }
  ];

  // All existing handlers and useEffect remain the same
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/getEmployees/${props.id}`);
        const checkBoxIds = response.data.checkBox.map(id => parseInt(id));
        const checkBoxOptions = options.filter(option => checkBoxIds.includes(option.id));
        setSelectedOptions(checkBoxOptions.map(option => option.id));
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          gender: response.data.gender,
          country: response.data.country,
          departments: response.data.departments,
          checkBox: checkBoxIds,
          image: null
        });
        setLastUploadedImage(response.data.image);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchData();
  }, [props.id]);

  // All other handlers remain exactly the same
  const handleChangeName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleChangePhone = (e) => {
    setFormData({ ...formData, phone: e.target.value });
  };

  const handleChangeGender = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleChangeCountry = (e) => {
    setFormData({ ...formData, country: e.target.value });
  };

  const handleChangeDepartments = (selectedOptions) => {
    setFormData({
      ...formData,
      departments: selectedOptions.map((option) => option.value)
    });
  };

  const handleCheckboxChange = (option) => {
    const newSelectedOptions = selectedOptions.includes(option.id)
      ? selectedOptions.filter((id) => id !== option.id)
      : [...selectedOptions, option.id];

    setSelectedOptions(newSelectedOptions);
    setFormData({
      ...formData,
      checkBox: newSelectedOptions
    });
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
    } else {
      setFormData({
        ...formData,
        image: null
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    const response = await axios.patch(`http://localhost:3000/api/v1/editEmployee?id=${props.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    props.setShowEditForm(false);
    props.setSyncWithDatabaseOnUpdate((prev) => !prev);
    console.log('Form with image updated successfully:', response.data);
  };

  const handleClose = () => {
    props.setShowEditForm(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl max-h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Update Employee Details</h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChangeName}
                required
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChangeEmail}
                required
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChangePhone}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Gender:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChangeGender}
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
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country:</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChangeCountry}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="IN">India</option>
              </select>
            </div>

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
              <label htmlFor="image" className="block text-gray-700 font-medium mb-1">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChangeFile}
                className="w-full"
              />
              <div className="mt-2">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={formData.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : lastUploadedImage && (
                  <img
                    src={`http://localhost:3000/${lastUploadedImage}`}
                    alt={formData.name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Checkbox Section */}
        <div className="col-span-2 mt-6">
          <h3 className="text-lg font-medium mb-3">Multi-Checkbox Example:</h3>
          <div className="grid grid-cols-2 gap-4">
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
          <p className="mt-2 text-sm text-gray-600">Selected options: {selectedOptions.join(', ')}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            type="button"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm2;