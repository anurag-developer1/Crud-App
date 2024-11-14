import MenuSvgIcon from "./MenuSVGIcon"
import NotificationsSvgIcon from "./NotificationsSVGIcon"
import SearchSvgIcon from "./SearchSVGIcon"
import SortSvgIcon from "./SortSVGIcon"
import SettingsSvgIcon from "./SettingsSVGIcon"
import MessageSVGIcon from "./MessageSVGIcon"
const Header=() =>{
    return (
        <div className="header" >
            <div className="menu"><MenuSvgIcon/></div> 
            <div className="searchbar">
                <button>All Candidates <SortSvgIcon/></button>
                <input type="text" placeholder="Search" />
                <SearchSvgIcon />
                
            </div>
            <div className="icons"><div className="notification"><NotificationsSvgIcon/>
            <div className="notification-count"><span>42</span></div>
            </div>
            <div className="settings"><SettingsSvgIcon/></div>
            <div className="message"><MessageSVGIcon/>
            <div className="message-count"><span>42</span></div>
            </div></div>
            
        </div>
    )
}
export default Header
