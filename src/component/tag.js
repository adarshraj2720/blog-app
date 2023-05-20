import React from "react";
import Home from "./home";


import Loader from "./loader";
import Hero from "./hero";
import { NavLink } from "react-router-dom";

// import { Link } from 'react-router-dom'

class Tag extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            tags: [],
            articles: [],
            display: false,
            tag: ""
        })
    }

    componentDidMount() {
        fetch(`https://api.realworld.io/api/tags`)
            .then((res) => res.json())
            .then((data) => this.setState({ tags: data.tags }))

        // .then((res) => res.json())
        // .then((data)=>console.log(data))
    }

    handleclick = (event) => {
        let tags = event.target.innerText
        console.log(event.target.innerText)
        fetch(`https://api.realworld.io/api/articles/?tag=${tags}`)

            .then((res) => res.json())
            .then((data) => this.setState({ articles: data.articles, tag: tags, display: true }))

        // .then((res) => res.json())
        // .then((data) => console.log(data))

        console.log(this.state.articles)
    }

    handleglobal = () => {
        this.setState({
            display: false

        })
    }

    render() {
        // if(this.state.tags.length===0){
        //     return <Loader/>
        // }
        return (
            <>

                <Hero />

                <div className="homearticles">
                    <div className="homearticle">
                        <div className="globalbtn">
                            <NavLink   activeClassName="abc" to='/'  onClick={this.handleglobal} exact >Global feed</NavLink>
                        </div>
                        <Home info={this.state} />
                    </div>
                    <div className="taglist">
                        <small style={{ display: "block", fontWeight: "800", marginBottom: "10px" }}>Popular Tag</small>
                        {this.state.tags.length===0 ? <Loader/>:""}
                        {
                            this.state.tags.map((tag) => {
                                if(!this.state.tags){
                                    return(
                                        <>
                                        <Loader/>
                                        </>
                                    )
                                }
                                return (
                                    <>
                                        <button className="tagbtn" onClick={(event) => { this.handleclick(event) }}>{tag}</button>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Tag