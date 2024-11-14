import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Contents from "../components/Contents"
const Layout = () => {
    return (
        <div className="layout">
            <Sidebar/>
            <Header/>
            <Contents/>
        </div>
    )
}
export default Layout