import { useEffect, useState } from "react";
import axios from 'axios';
//import EditEmployeeForm from "./EditEmployeeForm";
import EditEmployeeForm2 from "./EditEmployeeForm2";
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this employee? This action cannot be undone.</p>
        
        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



const ListEmployees = (props) => {
  const [employeesList, setEmployeesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const  [totalPages, setTotalPages] = useState(1);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [syncWithDatabaseOnUpdate, setSyncWithDatabaseOnUpdate] = useState(false);
  const [disableNextButton,setDisableNextButton]=useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/getEmployees?page=${currentPage}&limit=5`);
        setTotalPages(response.data.pages)
        if(response.data.docs.length===0){setCurrentPage(prev=>prev-1);setDisableNextButton(true)}
        if(response.data.docs.length>0){setEmployeesList(response.data.docs);}
        if(response.data.docs.length<5||response.data.docs.length===0){setDisableNextButton(true)}

      } catch (err) {
        setError("Failed to fetch employees");
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage,syncWithDatabaseOnUpdate]);

  const handleEdit = (id) => {
    setShowEditForm((prev) => !prev);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteModal(true);
  };

  const handleClickNext=()=>{

    setCurrentPage(prev=>prev+1)


  }
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setConfirmDelete(false);
    setEmployeeToDelete(null); // Clear the stored ID when modal is closed
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete the employee using stored ID
      const response = await axios.delete(`http://localhost:3000/api/v1/deleteEmployee?id=${employeeToDelete}`);
      
      // Remove the deleted employee from current list
      setEmployeesList(prevList => prevList.filter(item => item.id !== response.data.id));
  
      // Fetch the current page again to get the new set of 5 documents
      const updatedResponse = await axios.get(`http://localhost:3000/api/v1/getEmployees?page=${currentPage}&limit=5`);
      setTotalPages(updatedResponse.data.pages)
      if (updatedResponse.data.docs.length > 0) {
        setEmployeesList(updatedResponse.data.docs);
        
        // Update next button state based on the number of items
        if (updatedResponse.data.docs.length < 5) {
          setDisableNextButton(true);
        } else {
          setDisableNextButton(false);
        }
      } else {
        // If no documents on current page and we're not on page 1
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
          setDisableNextButton(false);
        } else {
          // If we're on page 1 and no documents, just show empty list
          setEmployeesList([]);
          setDisableNextButton(true);
        }
      }
    } catch (err) {
      setError("Failed to delete employee");
      console.error("Error deleting employee:", err);
    } finally {
      setShowDeleteModal(false);
      setEmployeeToDelete(null); // Clear the stored ID
    }
  };

 


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Country</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {employeesList.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">
                <img
                  src={`http://localhost:3000/${employee.image}`}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-3 px-6 text-left">{employee.name}</td>
              <td className="py-3 px-6 text-left">{employee.email}</td>
              <td className="py-3 px-6 text-left">{employee.country}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition mr-2"
                  onClick={() => handleEdit(employee.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center">
        <button
          className={`px-4 py-2 rounded transition ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); setDisableNextButton(false) }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage}/{totalPages}</span>
        <button
          className={`px-4 py-2 rounded transition ${
            disableNextButton
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          onClick={handleClickNext}
          disabled={disableNextButton}
        >
          Next
        </button>
      </div>

      {showEditForm ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <EditEmployeeForm2 id={editId} showEditForm={showEditForm} setShowEditForm={setShowEditForm} syncWithDatabaseOnUpdate={syncWithDatabaseOnUpdate} setSyncWithDatabaseOnUpdate={setSyncWithDatabaseOnUpdate} />
        </div>
      ) : null}

      {showDeleteModal && <ConfirmationModal isOpen={showDeleteModal} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />}
    </div>
  );
};

export default ListEmployees;