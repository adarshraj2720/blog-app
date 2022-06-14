import React from "react";
import { NavLink } from 'react-router-dom'

function Nav(props) {
    return (
        <header className="header">
            <strong>Conduit</strong>
            <nav>
                {props.isLoggedIn ? (
                    <AuthHeader user={props.user} />
                ) : (
                    <NonAuthHeader />
                )}
            </nav>
        </header>
    )
}





function NonAuthHeader() {
    return (
        <ul className="nonauth-header">
            <NavLink to="/" style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}} exact>
                <li>Home</li>
            </NavLink>
            <NavLink to="/signup" style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}}>
                <li>Signup</li>
            </NavLink>
            <NavLink to="/signin" style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}}>
                <li>Login</li>
            </NavLink>
        </ul>
    );
}
function AuthHeader(props) {
    let { username } = props.user;
    return (
        <ul className="auth-header">
            <NavLink to="/" style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}}  exact >
                <li>Home</li>
            </NavLink>
            <NavLink to="/new-post" style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}} >
                <li>NewArticle</li>
            </NavLink>
            <NavLink to="/setting" style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}} >
                <li>
                    <i className="fa-solid fa-gear"></i>Settings
                </li>
            </NavLink>
            <NavLink to={`/profile/${username}`} style={{textDecoration:"none",marginLeft:"20px",color:"#B7B6CB",fontSize:"18px",fontWeight:"700"}}>
                <li>Profile</li>
            </NavLink>
        </ul>
    );
}

export default Nav