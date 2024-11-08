import React, { useState } from 'react';
import axios from 'axios';


const CreateEmployeeForm = (props) => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    country: 'US',
    image: null
  });
  
  const [previewImage, setPreviewImage] = useState(null);
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
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result // This will store the base64 string
        });
        setPreviewImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  // Submit the form
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
        if(!formData[key]){alert('Some fields are missing'); return}
      }
      const response = await axios.post('http://localhost:3000/api2/v1/createEmployee', data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
       props.setShowCreateForm(false)
      console.log('Form with image submitted successfully:', response.data);

   
  };

  const handleClose=()=>{

     props.setShowCreateForm((prev)=>!prev)

  }

  return (
    <div>
      <h2>Create New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e)=>{handleChangeName(e)}}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e)=>{handleChangeEmail(e)}}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e)=>{handleChangePhone(e)}}
            required
          />
        </div>

        <div>
          <label>Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={(e)=>{handleChangeGender(e)}}
            required
            
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={(e)=>{handleChangeGender(e)}}
            required
          />
          <label htmlFor="female">Female</label>
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={(e)=>{handleChangeCountry(e)}}
            required
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="IN">INDIA</option>
          </select>
        </div>

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e)=>{handleChangeFile(e)}}
          />
          {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: '50px',height:'50px' }}
          />
        )}
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button onClick={handleClose} >Close</button>
      </form>

      
    </div>
  );
};

export default CreateEmployeeForm;

