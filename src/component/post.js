import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function Post(props) {
    const { author, createdAt, title, description, slug, favoritesCount, tagList } = props;

    return (
        <>
            {/* <article className="article">
                <header >
                    <div >
                        <Link to="/profile">
                            <img src={author.image} alt={author.username} />
                        </Link>
                    </div>
                    <div className="author">
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/profile/${author.username}`}
                        >
                            <p>{author.username}</p>
                        </Link>
                        <time dateTime="">
              {moment(createdAt).format('ddd MMM D YYYY')}
            </time>
                    </div>
                </header>
                <Link style={{ textDecoration: 'none' }} to={`/article/${slug}`}>
                    <div >
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </Link>
                <footer>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/article/${slug}`}
                        
                    >
                        Read More ...
                    </Link>
                </footer>
            </article> */}




            <article className='postsblock'>
                <div className="favcountblock">
                    <div className="userimageblock">
                        <figure>
                            <img className="userimage" src={author.image} alt=''></img>
                        </figure>
                        <div>
                            {/* <p>{article.author.username}</p> */}
                            <NavLink style={{ textDecoration: "none", color: "#5CB85C", fontSize: "18px", marginBottom: "6px", display: "inline-block" }} to={`/profile/${author.username}`}>
                                {author.username}
                            </NavLink>
                            <p>{moment(createdAt).format('ddd MMM  YYYY')}</p>

                        </div>

                    </div>
                    <div className="favcount" >{favoritesCount}</div>
                </div>
                <p className="articletitle">{title}</p>
                <p className="articledescription">{description}</p>
                <Link to={`/article/${slug}`} style={{ textDecoration: "none", color: "grey", fontSize: "12px", marginBottom: "30px", display: "inline-block" }}>
                    Read More . . .
                </Link>
                <div className="articletag">
                    {
                        tagList.map((tag) => {
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


    );
}

export default Post;