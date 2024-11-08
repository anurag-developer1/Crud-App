import React from 'react';

import Dashboard from './pages/Dashboard.jsx'



// Import Tailwind CSS - add this to index.css or App.css


function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management System</h1>
          <p className="text-gray-600 mt-2">Manage your employee records with ease</p>
        </header>
        <main>
          <Dashboard/>
        </main>
      </div>
    </div>
  );
}

export default App;

