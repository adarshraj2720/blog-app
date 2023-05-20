import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'


class Setting extends React.Component {
    state = {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
        errors: {
            image: '',
            username: '',
            bio: '',
            email: '',
            password: '',
        },
    };

    handleChange = (event) => {
        let { name, value } = event.target;
        let errors = { ...this.state.errors };
        // validation(errors, name, value);
        this.setState({
            [name]: value,
            errors,
        });
    };

    componentDidMount() {
        let { username, email, image, bio } = this.props.user;
        this.setState({ username, email, image, bio });
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let { image, username, bio, email, password } = this.state;

        fetch('https://api.realworld.io/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Token ${this.props.user.token}`,
            },
            body: JSON.stringify({
                user: {
                    image,
                    username,
                    bio,
                    email,
                    password,
                },
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Can not create new Article');
                }
                return res.json();
            })
            .then(({ user }) => {
                console.log(user);
                this.props.updateUser(user);
                this.props.history.push(`/profile/${this.props.user.username}`);
            });
    };

    render() {
        let { image, username, bio, email, password, errors } = this.state;
        return (
            <>
                <section>
                    <form onSubmit={this.handleSubmit} className="settingform">
                        <h2>Your Setting</h2>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            value={image}
                            name="image"
                            placeholder="URL of Your Picture"
                        />
                        <input
                            onChange={this.handleChange}
                            type="text"
                            value={username}
                            name="username"
                        />
                        <span>{errors.username}</span>
                        <textarea
                            onChange={this.handleChange}
                            type="text"
                            value={bio}
                            name="bio"
                            placeholder="short bio about you"
                            rows="6"
                        ></textarea>
                        <input
                            onChange={this.handleChange}
                            type="email"
                            value={email}
                            name="email"
                        />
                        <span>{errors.username}</span>
                        <input
                            onChange={this.handleChange}
                            type="password"
                            value={password}
                            name="password"
                            placeholder="password"
                        />
                        <div className='updbtnblock'>
                        <button className="updbtn" type="submit">
                            Update Setting
                        </button>
                        </div>
                        <hr></hr>
                        
                        <Link className="logout" onClick={this.handleLogout} to='/' >
                            or Click here to logout
                        </Link>


                    </form>

                </section>
            </>
        );
    }
}

export default withRouter(Setting);

