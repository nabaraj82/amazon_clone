import React from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';

function Header() {
    const [state] = useStateValue();

    const handleSignOut = () =>{
        auth.signOut();
    }
    return (
        <div className="header">
            <Link to="/">
                <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </Link>

            <div className="header_search">
                <input type="text" className="header_searchInput" />
                <SearchIcon className="header_searchIcon" />
            </div>
            <div className="header_nav">
                <Link to={!state.user && '/login'}>
                    <div className="header_option">
                        <span className="header_optionLineOne">{state.user ? `Hello, ${state.user.email}` : 'Hello, Guest' }</span>
                        <span className="header_optionLineTwo" onClick={handleSignOut}>{state.user? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">Return</span>
                    <span className="header_optionLineTwo">& Orders</span>

                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon className="header_shoppingBasketIcon" />
                        <span className="header_optionLineTwo header_basketCount">{state.basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
