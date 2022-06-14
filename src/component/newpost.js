import React from 'react';
import { withRouter } from 'react-router-dom'


class Newpost extends React.Component {
    state = {
        title: '',
        description: '',
        body: '',
        tagList: '',
        errors: {
            title: '',
            description: '',
            body: '',
            tagList: '',
        },
    };

    handleChange = (event) => {
        let { name, value } = event.target;
        let errors = { ...this.state.error };
        this.setState({ [name]: value, errors });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, description, body, tagList } = this.state;
        fetch('https://mighty-oasis-08080.herokuapp.com/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Token ${this.props.user.token}`,
            },
            body: JSON.stringify({
                article: {
                    title,
                    description,
                    body,
                    tagList: tagList.split(',').map((tag) => tag.trim()),
                },
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Can not create new Article');
                }
                return res.json();
            })
            .then(({ article }) => {
                console.log(article);
                this.setState({
                    title: '',
                    description: '',
                    body: '',
                    tagList: '',
                });
                this.props.history.push('/');
            })
            .catch((errors) => this.setState({ errors }));
    };

    render() {
        let { title, description, body, tagList } = this.state;
        return (
            <>
                <div>
                    <h3>Add Articles</h3>
                    <form action="" className="newpost">
                        <input
                            type="text"
                            name="title"
                            placeholder="Article Title"
                            onChange={this.handleChange}
                            value={title}
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="What's  this article is all about "
                            onChange={this.handleChange}
                            value={description}
                        />

                        <textarea
                            type="text"
                            name="body"


                            placeholder="write your article"
                            onChange={this.handleChange}
                            value={body}
                        />

                        <input
                            type="text"
                            name="tagList"
                            placeholder="Enter Tags"
                            onChange={this.handleChange}
                            value={tagList}
                        />
                        <div>
                            <div className='publishbtnblock'>
                                <button
                                    className="publishbtn"
                                    type="submit"
                                    onClick={this.handleSubmit}
                                >
                                    Publish Article
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Newpost);