import React from 'react';

import Comments from './comments';
class Addcomment extends React.Component {
  state = {
    comment: '',
    body: '',
    error: '',
  };

  handelChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handelSubmit = (event) => {
    event.preventDefault();

    fetch('https://api.realworld.io/api/articles' + `/${this.props.slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: this.state.body,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('unble to comment');
        }
        return res.json();
      })
      .then((data) => {
        this.fetchComment();
        this.setState({
          body: '',
        });
      })
      .catch((error) => {
        this.setState({ errors: error });
      });
  };

  fetchComment = () => {
    fetch('https://api.realworld.io/api/articles' + `/${this.props.slug}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('unble comments');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.comments);
        this.setState({
          comment: data.comments,
        });
      })
      .catch((error) => {
        this.setState({
          error: 'unble to fetch comment',
        });
      });
  };

  render() {
    return (
      <>
        <section className="container">
          <div className="comment-section">
            <form action="" onSubmit={this.handelSubmit} className="commentform">
              <textarea className='comnttextarea'
                name="body"
                type="text"
                rows="1"
                placeholder="Add comment..."
                onChange={this.handelChange}
                value={this.state.body}
                required={true}
              >
                {' '}
              </textarea>

              <div className=" commentblock">
                <div >
                  <img className="commentimg"
                    src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI="
                    alt="img"
                  />
                </div>
            <div>
            <button className='comntbtn' type="submit">Post Comment</button>
            </div>
               
              </div>
            </form>
          </div>
          <Comments
            slug={this.props.slug}
            fetchComment={this.fetchComment}
            state={this.state}
            user={this.props.user}
          />
        </section>
      </>
    );
  }
}
export default Addcomment;