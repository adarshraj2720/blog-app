import React from 'react';

import Loader from './loader';

import Posts from './posts';
import { withRouter } from 'react-router';
import Profilebanner from './profilebanner';


class Profile extends React.Component {
  state = {
    activeTab: 'author',
    articles: null,
  };

  FetchData = () => {
    const slug = this.props.match.params.username;
    fetch(`https://api.realworld.io/api/articles` + `/?${this.state.activeTab}=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not fetch deta for specific user`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.articles);
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching article' });
      });
  };
  componentDidMount() {
    this.FetchData();
  }
  handelActive = (tab) => {
    this.setState(
      {
        activeTab: tab,
      },
      () => {
        this.FetchData();
      }
    );
  };

  render() {
    const { activeTab } = this.setState;
    const slug = this.props.match.params.username;
    if (!this.state.articles) {
   
    return     <Loader />
    }

    return (
      <>
        <section>
          <Profilebanner username={slug} user={this.props.user} />
          <div className="container">
            <div className="profile">
              <div className="buttons-div">
                <button
                  onClick={() => this.handelActive('author')}
                  className={activeTab === 'author' && 'active'}
                style={{ textDecoration: "none", color: "#5CB85C", fontSize: "16px", display: "inlne-block", paddingBottom: "20px", backgroundColor: "transparent", border: "0", cursor: "pointer", }} 
                >
                  My Article
                </button>
                <button
                  onClick={() => this.handelActive('favorited')}
                  style={{ textDecoration: "none", color: "#5CB85C", fontSize: "16px", display: "inlne-block", paddingBottom: "20px", backgroundColor: "transparent", border: "0", cursor: "pointer",marginLeft:"10px" }} 
                >
                  Favorited Article
                </button>
              </div>

              <Posts articles={this.state.articles} />
            
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(Profile);