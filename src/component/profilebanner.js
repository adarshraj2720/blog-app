import React from 'react';

import { withRouter } from 'react-router';
// import Loader from './Loader';
import { Link } from 'react-router-dom';
class ProfileBanner extends React.Component {
    state = {
        profile: null,
        error: null,
        follow: false,
    };

    componentDidMount() {
        let { username } = this.props;

        fetch('https://mighty-oasis-08080.herokuapp.com/api/' + `profiles/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Token ${this.props.user.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject('Unable to fetch profile!');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data.profile);
                this.setState({
                    profile: data.profile,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        if (!this.state.profile) return <h2>Loading...</h2>
        let { username, image, bio } = this.state.profile;
        return (
            <>
                <section className="container">
                    <div className='bannerblock'>
                        <div className="banner">
                            <figure className='profileimageblock'>
                                <img className='profileimage' src={image || './images/Smiley.jpg'} alt={username} />
                            </figure>
                            <h4 className='profileusername'>{username}</h4>
                            <div className='profilesettingbtn'>
                            {this.props.user.username === username ? (
                                <button>
                                    <Link
                                        to="/setting"
                                        style={{textDecoration:"none",backgroundColor:"transparent",color:"grey",display:"inline-block",padding:"4px"}}

                                    >
                                        Edit profile setting
                                    </Link>
                                </button>
                            ) : (
                                <button className='follow'>
                                    {' '}
                                    + Follow <span>{username}</span>
                                </button>
                            )}
                        </div>
                        </div>
                       
                    </div>
                </section>
            </>
        );
    }
}

export default withRouter(ProfileBanner);