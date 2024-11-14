import Dashboard from "../pages/Dashboard"
const Contents = () => {
    return (
        <div className="content">
           <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-0 ">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management System</h1>
          <p className="text-gray-600 mt-2">Manage your employee records with ease</p>
        </header>
        <main className='mx-auto relative'>
          <Dashboard />
        </main>
      </div>
    </div>
        </div>
    )
}
export default Contents