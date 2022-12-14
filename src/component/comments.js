import React from 'react';

import Comment from './comment';
// import Loader from './loader';

class Comments extends React.Component {
  componentDidMount() {
    this.props.fetchComment();
  }

  handelDelete = (id) => {
    fetch('https://mighty-oasis-08080.herokuapp.com/api/articles' + `/${this.props.slug}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    }).then(this.props.fetchComment);
  };

  render() {
    if (!this.props.state.comment) {
      return ""
    }
    return (
      <>
        <section>
          <ul>
            {this.props.state.comment.map((singleComment) => {
              console.log(singleComment);
              return (
                <Comment
                  key={singleComment.id}
                  comment={singleComment}
                  handelDelete={this.handelDelete}
                  user={this.props.user}
                />
              );
            })}
          </ul>
        </section>
      </>
    );
  }
}

export default Comments;