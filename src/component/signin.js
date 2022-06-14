import React from "react";
import Nav from "./nav";

import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: "",
            password: "",
            errors: {
                email: "",
                password: "",
            }
        })
    }

    handleInput = ({ target }) => {
        let { name, value } = target

        let errors = this.state.errors
        this.setState({ errors, [name]: value })
        var letterNumber = "(?=.*[a-zA-Z])(?=.*[0-9])"


        switch (name) {
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
        event.preventDefault()


        const { email, password } = this.state;
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: { email, password } }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(({ errors }) => {
                        return Promise.reject(errors);
                    });
                }
                return res.json();
            })
            .then(({ user }) => {
                this.props.updateUser(user);
                this.setState({ email: '', password: '' });
                this.props.history.push('/');
            })
            .catch((errors) =>
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        error: {
                            ...prevState.errors,
                            email: 'Email or password is not correct',
                        },
                    };
                })
            );




    }



    render() {
        return (
            <>
                {/* <Nav /> */}
                <form className="signinform" onSubmit={(event) => { this.handlesubmit(event) }}>
                    <h2>Sign In</h2>
                    <NavLink style={{ textDecoration: "none", color: "#5CB85C", fontSize: "18px", display: "flex", justifyContent: "center", marginTop: "20px" }} to='/signup' exact>
                        Need an account?
                    </NavLink><br />
                    <input onChange={this.handleInput} type="email" value={this.state.email} placeholder="Email" name="email" id="email"></input>
                    <p className="errormsg">{this.state.errors.email}</p>
                    <input onChange={this.handleInput} type="password" value={this.state.password} placeholder="Password" name="password" id="password"></input>
                    <p className="errormsg">{this.state.errors.password}</p>
                    <div className="signinbtnblock">
                        <button className="signinbtn" type="submit">Sign In</button>
                    </div>

                </form>
            </>
        )
    }


}

export default withRouter(Signin)