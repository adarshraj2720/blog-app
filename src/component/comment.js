import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';


function Comment(props) {
    let { id, author, body, createdAt } = props.comment;

    return (
        <>
            <section className='commentlist'>
                <div className="comment-section">
                    <p className='commentname'>{body}</p>
                    <div className="justcenter ">
                        <div className='aligncenter' >
                            <img className="commentlistimg " src={author.image} alt={author.username} />
                            <NavLink style={{ textDecoration: "none", color: "#5CB85C", fontSize: "14px", marginBottom: "6px", display: "inline-block" }} to={`/profile/${author.username}`}>
                                {author.username}
                            </NavLink>
                            <span style={{ display: "inline-block" }} className='date'> {moment(createdAt).format('ddd MMM D YYYY')}</span>
                        </div>
                        {author.username === props.user.username ? (
                            <button
                                onClick={() => {
                                    props.handelDelete(id);
                                }}
                            >
                                delete
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Comment;