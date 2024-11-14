import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react'



const EditEmployeeForm = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    country: 'US',
    departments: [],
    checkBox: false,
    image: null
  });


  const [lastUploadedImage,setLastUploadedImage]=useState(null)
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      
      console.log(props)
      try {
       const response = await axios.get(`http://localhost:3000/api/v1/getEmployees/${props.id}`);
        
    
       console.log(response)
       
       setFormData({name:response.data.name,email:response.data.email,phone:response.data.phone,gender:response.data.gender,country:response.data.country,departments:response.data.departments,checkBox:response.data.checkBox,image:null})
       setLastUploadedImage(response.data.image)
        
      } catch (err) {
        
        console.error("Error fetching employees:", err);
      } 
    };

    fetchData();
  }, []);


 //Process changes
  const handleChangeName = (e) => {
    setFormData({
        ...formData,
        name:e.target.value
    })
  };

  const handleChangeEmail= (e)=>{
    setFormData({...formData,email:e.target.value})
  }

  const handleChangePhone = (e)=>{setFormData({...formData, phone: e.target.value})} 
  const handleChangeGender= (e)=>{setFormData({...formData, gender: e.target.value})}
  const handleChangeCountry= (e)=>{setFormData({...formData, country: e.target.value})}
  
      // Updated handler for departments multi-select
      const handleChangeDepartments = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData({
          ...formData,
          departments: [...new Set([...formData.departments, ...selectedOptions])] // Prevent duplicates
        });
      };
    
      // New handler to remove individual department
      const handleRemoveDepartment = (deptToRemove) => {
        setFormData({
          ...formData,
          departments: formData.departments.filter(dept => dept !== deptToRemove)
        });
      };
    
      // New handler to clear all departments
      const handleClearDepartments = () => {
        setFormData({
          ...formData,
          departments: []
        });
      };
    
      const handleChangeCheckbox = (e) => {
        setFormData({
          ...formData,
          checkBox: e.target.checked
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
        setPreviewImage(reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        image: null
      });
    }
  };
  
  

  // Submit the form
  const handleUpdate = async(e) => {
    e.preventDefault();
    const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      const response = await axios.patch(`http://localhost:3000/api/v1/editEmployee?id=${props.id}`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      props.setShowEditForm(false)
      props.setSyncWithDatabaseOnUpdate((prev)=>!prev)
      console.log('Form with image updated successfully:', response.data);

   
  };

  const handleClose=()=>{
   props.setShowEditForm(false)
    
  }

  

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-full overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-4">Update Employee Details</h2>

      <form onSubmit={handleUpdate} >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => { handleChangeName(e) }}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => { handleChangeEmail(e) }}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => { handleChangePhone(e) }}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender:</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={(e) => { handleChangeGender(e) }}
              className="mr-2"
            />
            <label htmlFor="male" className="mr-4">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={(e) => { handleChangeGender(e) }}
              className="mr-2"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={(e) => { handleChangeCountry(e) }}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="IN">India</option>
          </select>
        </div>

         
        <div className="mb-4">
          <label htmlFor="departments" className="block text-gray-700 font-semibold">Departments:</label>
          <select
            id="departments"
            name="departments"
            multiple
            onChange={handleChangeDepartments}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          >
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
          
          {/* Selected Departments Display */}
          {formData.departments.length > 0 && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Selected Departments:</label>
                <button
                  type="button"
                  onClick={handleClearDepartments}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.departments.map((dept, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    <span>{dept}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDepartment(dept)}
                      className="ml-1 focus:outline-none"
                    >
                      <X size={14} className="hover:text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => { handleChangeFile(e) }}
            className="w-full"
          />
          {previewImage? <img
              src={previewImage}
              alt={formData.name}
              className="w-12 h-12 mt-2 rounded-full"
            />: (
            <img
              src={`http://localhost:3000/${lastUploadedImage}`}
              alt={formData.name}
              className="w-12 h-12 mt-2 rounded-full"
            />
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.checkBox}
              onChange={handleChangeCheckbox}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              Creating New Entry as Admin?
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Update
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;