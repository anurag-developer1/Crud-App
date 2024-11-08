import { useEffect, useState } from "react";
import axios from 'axios';
import EditEmployeeForm from "./EditEmployeeForm";

const ListEmployees = (props) => {
  const [employeesList, setEmployeesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [syncWithDatabaseOnUpdate, setSyncWithDatabaseOnUpdate] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/getEmployees?page=${currentPage}&limit=5`);
        setEmployeesList(response.data.docs);
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

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/v1/deleteEmployee?id=${id}`);
    setEmployeesList([...employeesList.filter(item=>item.id===response.data.id)])
    console.log(response);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesList.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div>
                  <img
                    src={`http://localhost:3000/${employee.image}`}
                    alt={employee.name}
                    width="50"
                    height="50"
                  />
                </div>
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.country}</td>
              <td>
                <button onClick={() => handleEdit(employee.id)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

      {showEditForm ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
          }}
        >
          <EditEmployeeForm id={editId} showEditForm={showEditForm} setShowEditForm={setShowEditForm} syncWithDatabaseOnUpdate={syncWithDatabaseOnUpdate} setSyncWithDatabaseOnUpdate={setSyncWithDatabaseOnUpdate}/>
        </div>
      ):null}
    </div>
  );
};

export default ListEmployees;