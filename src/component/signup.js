import React from "react";

import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'



class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            username: "",
            email: "",
            password: "",
            user: "",
            errors: {
                username: "",
                email: "",
                password: "",
            }
        })
    }

    handleInput = ({ target }) => {
        let { name, value } = target
        let errors = this.state.errors
        this.setState({ errors, [name]: value, user: value })
        var letterNumber = "(?=.*[a-zA-Z])(?=.*[0-9])"


        switch (name) {
            case "username":
                errors.username = value.length > 6 ? "" : "Username should be at-least 6 characters long"
                break;
            case "email":
                errors.email = value.includes('@') ? "" : "Email should contain @"
                break;
            // case "password":
            //     errors.password = value.length > 6 ? "" : "Password should be at-least 6 characters"            
            //     break;
            case "password":
                errors.password = this.state.password.match(letterNumber) && value.length > 6 ? "" : "Password must contain a letter and a number and should be at-least 6 characters"
                break;

            default:
                break;
        }
    }

    handlesubmit = (event) => {
        const { username, email, password } = this.state;
        event.preventDefault()

        fetch('https://mighty-oasis-08080.herokuapp.com/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: { username, email, password } }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(({ errors }) => {
                        return Promise.reject(errors);
                    });
                    // throw new Error('Fatch is not successful');
                }
                return res.json();
            })
            .then(({ user }) => {
                this.props.updateUser(user);
                this.setState({ username: '', email: '', password: '' });
                this.props.history.push('/');
            })
            .catch((errors) => this.setState({ errors }));


    }


    render() {
        return (
            <>
                <form className="signupform" onSubmit={(event) => { this.handlesubmit(event) }}>
                    <h2>Sign Up</h2>
                    <NavLink style={{ textDecoration: "none", color: "#5CB85C", fontSize: "18px", display: "flex", justifyContent: "center", marginTop: "20px" }} to='/signin'>
                        Have an account?
                    </NavLink><br />
                    <input onChange={this.handleInput} type="text" value={this.state.username} placeholder="Username" name="username" id="username" required></input>
                    <p className="errormsg">{this.state.errors.username}</p>
                    <input onChange={this.handleInput} type="email" value={this.state.email} placeholder="Email" name="email" id="email" required></input>
                    <p className="errormsg">{this.state.errors.email}</p>
                    <input onChange={this.handleInput} type="password" value={this.state.password} placeholder="Password" name="password" id="password" required></input>
                    <p className="errormsg">{this.state.errors.password}</p>
                    <div className="signupbtnblock">
                        <button className="signupbtn" type="submit">Sign Up</button>
                    </div>

                </form>
            </>
        )
    }


}

export default withRouter(Signup)