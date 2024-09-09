import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import './NotFound.scss'

function NotFound() {
    const navigate = useNavigate();
    return (

            <header className="not-found">
                    <img className="not-found__arrow-icon" src={ArrowBackIcon} onClick={() => navigate('/warehouses')}/>
                    <h1 className="not-found__title-heading" >404 not found</h1>
            </header>

    )
}

export default NotFound
