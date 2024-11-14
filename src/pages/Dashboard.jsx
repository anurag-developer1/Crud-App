
import CreateEmployeeForm from "../components/CreateEmployeeForm";
import ListEmployees from "../components/ListEmployees";
import { useState } from "react";
import { Home, LayoutDashboard, Settings,LogOut } from 'lucide-react';
const Dashboard = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreateEmployee = () => {
    setShowCreateForm((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      
        {showCreateForm ? null : (
          <div className="d-flex justify-content-center mb-4">
            <button
              className="btn btn-primary"
              onClick={handleCreateEmployee}
            >
              Create Employee
            </button>
          </div>
        )}

        {/* Conditional Forms */}
        {showCreateForm ? (
          <CreateEmployeeForm
            showCreateForm={showCreateForm}
            setShowCreateForm={setShowCreateForm}
          />
        ) : null}
         
        {!showCreateForm && !showEditForm ? (
          <ListEmployees
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
          />
        ) : null}
      </div>
  
  );
};

export default Dashboard;
