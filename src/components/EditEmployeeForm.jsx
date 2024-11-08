import React, { useEffect, useState } from 'react';
import axios from 'axios';


const EditEmployeeForm = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    country: 'US',
    image: null
  });
  const [lastUploadedImage,setLastUploadedImage]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
      
      console.log(props)
      try {
       const response = await axios.get(`http://localhost:3000/api/v1/getEmployees/${props.id}`);
        
    
       console.log(response)
       setFormData({name:response.data.name,email:response.data.email,phone:response.data.phone,gender:response.data.gender,country:response.data.country,image:null})
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
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
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
    <div>
      <h2>Update employee Details</h2>

      <form onSubmit={handleUpdate}>
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
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={(e)=>{handleChangeGender(e)}}
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
          <img 
                    src={`http://localhost:3000/${lastUploadedImage}`} 
                    alt={formData.name}
                    width="50" 
                     height="50"
                  />
        </div>

        <button type="submit" onClick={handleUpdate}>Update</button>
        <button onClick={handleClose}>Close</button>
      </form>

      
    </div>
  );
};

export default EditEmployeeForm;