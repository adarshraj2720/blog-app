import React from "react";
import moment from 'moment'

import Loader from "./loader";

import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'







class Home extends React.Component {
    constructor(props) {
        super()
        this.state = ({
            articles: [],
            articlecount: "",

        })
    }

    componentDidMount() {
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10`)
            .then((res) => res.json())
            .then((data) => this.setState({ articles: data.articles, articlecount: Math.round((data.articlesCount) / 10) }))

        // .then((res) => res.json())
        // .then((data)=>console.log(data))
    }
    handlenext = (event) => {
        let page = event.target.innerText
        console.log(event.target.innerText)
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&&offset=${page * 10}`)
            .then((res) => res.json())
            .then((data) => this.setState({ articles: data.articles, articlecount: Math.round((data.articlesCount) / 10) }))

    }

    render() {
        // console.log(this.state.articlecount)
        let nextpage = [];
        for (let i = 1; i <= this.state.articlecount; i++) {
            nextpage.push(i);
        }
        // console.log(nextpage)

        if (this.state.articles.length===0) {
            return (
                <>
                    <Loader />
                    {/* <h2>Loading....</h2> */}
                </>
            )





        }
        return (

            <>
                {/* <Nav /> */}



                {this.props.info.display === false ?
                    <div>
                        {

                            this.state.articles.map((article) => {
                                return (
                                    <>
                                        <article>
                                            <div className="favcountblock">
                                                <div className="userimageblock">
                                                    <figure>
                                                        <img className="userimage" src={article.author.image} alt=''></img>
                                                    </figure>
                                                    <div>
                                                        {/* <p>{article.author.username}</p> */}
                                                        <NavLink style={{ textDecoration: "none", color: "#5CB85C", fontSize: "18px", marginBottom: "6px", display: "inline-block" }} to={`/profile/${article.author.username}`}>
                                                            {article.author.username}
                                                        </NavLink>
                                                        <p>{moment(article.createdAt).format('ddd MMM  YYYY')}</p>

                                                    </div>

                                                </div>
                                                <div className="favcount" >{article.favoritesCount}</div>
                                            </div>
                                            <p className="articletitle">{article.title}</p>
                                            <p className="articledescription">{article.description}</p>
                                            <Link to={`/article/${article.slug}`} style={{ textDecoration: "none", color: "grey", fontSize: "12px", marginBottom: "30px", display: "inline-block" }}>
                                                Read More . . .
                                            </Link>
                                            <div className="articletag">
                                                {
                                                    article.tagList.map((tag) => {
                                                        return (
                                                            <>
                                                                <button className="tagbtn articletagbtn">{tag}</button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </article>

                                    </>
                                )
                            })
                        }
                    </div>
                    :
                    <div>
                        <div className="hastagbtn">
                            <NavLink to="/" activeClassName="abc" exact >#{this.props.info.tag}</NavLink>
                        </div>

                        {
                            this.props.info.articles.map((article) => {
                                return (
                                    <>
                                        <article>
                                            <div className="favcountblock">
                                                <div className="userimageblock">
                                                    <figure>
                                                        <img className="userimage" src={article.author.image} alt=''></img>
                                                    </figure>
                                                    <div>
                                                        {/* <p>{article.author.username}</p> */}
                                                        <NavLink style={{ textDecoration: "none", color: "#5CB85C", fontSize: "18px", marginBottom: "6px", display: "inline-block" }} to={`/profile/${article.author.username}`}>
                                                            {article.author.username}
                                                        </NavLink>
                                                        <p>{moment(article.createdAt).format('ddd MMM  YYYY')}</p>

                                                    </div>

                                                </div>
                                                <div className="favcount" >{article.favoritesCount}</div>
                                            </div>
                                            <p className="articletitle">{article.title}</p>
                                            <p className="articledescription">{article.description}</p>
                                            <Link to={`/article/${article.slug}`} style={{ textDecoration: "none", color: "grey", fontSize: "12px", marginBottom: "30px", display: "inline-block" }}>
                                                Read More . . .
                                            </Link>
                                            <div className="articletag">
                                                {
                                                    article.tagList.map((tag) => {
                                                        return (
                                                            <>
                                                                <button className="tagbtn articletagbtn">{tag}</button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </article>


                                    </>
                                )
                            })
                        }
                    </div>

                }


                {
                    nextpage.map((btn) => {
                        return (
                            <>
                                <button className="pagebtn" onClick={(event) => { this.handlenext(event) }}>{btn}</button>
                            </>
                        )
                    })
                }
            </>
        )
    }
}

export default Home