import Nav from "./nav"

import React from "react"
import Addcomment from "./addcomment"

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import moment from "moment"
import Loader from "./loader"

class Singlearticle extends React.Component{
    constructor(props) {
        super(props)
        this.state = ({
            slug: '',
        })
    }

    componentDidMount() {
        let slug = this.props.match.params.slug
        console.log(slug)

        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
            .then((res) => res.json())
            .then((data) => this.setState({ slug: data.article }))
    }




    handelDelete = (slug) => {
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles` + '/' + slug, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Token ${this.props.user.token}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              return Promise.reject('Unable to delete!');
            }
          })
          .then((data) => {
            this.props.history.push('/');
          })
          .catch((error) => {
            this.setState({ error });
          });
      };

    render() {
        let slug = this.props.match.params.slug
        if (!this.state.slug) {
            return <Loader/>
        }

      
        return (
            <>
                {/* <Nav /> */}
                <div className="arthead">
                    <div className="singlearticleheading">
                        <p className="singlearttitle">{this.state.slug.title}</p>
                        <div className="userimageblock">
                            <figure>
                                <img className="userimage" src={this.state.slug.author.image} alt=''></img>
                            </figure>
                            <div>
                                <NavLink style={{ textDecoration: "none", color: "white", fontSize: "18px", marginBottom: "6px", display: "inline-block" }} to={`/profile/${this.state.slug.author.username}`}>
                                    {this.state.slug.author.username}
                                </NavLink>
                                <p className="date">{moment(this.state.slug.createdAt).format('ddd MMM  YYYY')}</p>
                                {this.props.user &&
                                    this.props.user.username === this.state.slug.author.username ? (
                                    <div className="edit-delete-btns">
                                        <button className=" edit-btn">
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                    backgroundColor:"transparent",
                                                 
                                                }}
                                            to={`/editArticle/${slug}`}
                                            >
                                                Edit Article
                                            </Link>
                                        </button>
                                        <button
                                            className=" delete-btn"
                                        onClick={() => this.handelDelete(slug)}
                                        >
                                            Detele Article
                                        </button>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="commentadd">
                    <p className="artdescription">{this.state.slug.body}</p>
                    {
                        this.state.slug.tagList.map((tag) => {
                            return (
                                <>
                                    <button className="tagbtn articletagbtn">{tag}</button>
                                </>
                            )
                        })
                    }
                    <hr></hr>
                    <div>
                        {this.props.user === null ? (
                            <footer>
                                <div>
                                    <p>
                                        <Link to="/signup">Sign up</Link> or{' '}
                                        <Link to="/signin"> Sign in</Link>
                                        or add to comments on this article
                                    </p>
                                </div>
                            </footer>
                        ) : (
                            <Addcomment slug={this.props.match.params.slug} user={this.props.user} />
                            // ""
                        )}
                    </div>
                </div>





            </>
        )
    }

}
export default withRouter(Singlearticle)