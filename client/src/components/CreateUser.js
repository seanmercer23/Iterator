import React, { Component } from 'react';
import {Redirect} from 'react-router-dom' 

const url = `https://iterator.herokuapp.com/users/register`

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            username: "",
            bio: "",
            photo: "",
            redirect: false
        }

        this.onUserCreate = this.onUserCreate.bind(this)
        this.onUserSubmit = this.onUserSubmit.bind(this)
    }

    onUserCreate = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onUserSubmit = async (event) => {
        event.preventDefault()
        let data = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            bio: this.state.bio,
            photo: this.state.photo
        }

        localStorage.setItem('userInfo', JSON.stringify(data))

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            localStorage.setItem('jwt', response.token);
            this.props.decodeToken(response.token)
        })
    }

    render() {
        if (this.props.userObject !== null) 
            {return <Redirect to={`/users/${this.state.username}`}/>}
        return (
            <div className="create-user">
                <h2>Register</h2>
                <form onSubmit={this.onUserSubmit} id="userProfile">
                    <div className="field">
                        <label htmlFor="name">Name: </label>
                        <input onChange={this.onUserCreate}
                            className="input"
                            type="text"
                            name="name"
                            placeholder="enter name"
                            value={this.state.name}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email: </label>
                        <input onChange={this.onUserCreate}
                            className="input"
                            type="text"
                            name="email"
                            placeholder="enter email"
                            value={this.state.email}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="username">Username: </label>
                        <input onChange={this.onUserCreate}
                            className="input"
                            type="text"
                            name="username"
                            placeholder="enter username"
                            value={this.state.username}
                        />                        
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.onUserCreate}
                            className="input"
                            type="password"
                            name="password"
                            placeholder="enter password"
                            value={this.state.password}
                        />                        
                    </div>
                    <div className="field">
                        <label htmlFor="bio">Bio: </label>
                        <input onChange={this.onUserCreate}
                            className="input"
                            type="text"
                            name="bio"
                            placeholder="A little bit about yourself"
                            value={this.state.bio}
                        />                        
                    </div>
                    <div className="field">
                        <label htmlFor="photo">photo: </label>
                        <input onChange={this.onUserCreate}
                            className="input"
                            type="text"
                            name="photo"
                            placeholder="link to profile picture"
                            value={this.state.photo}
                        />                        
                    </div>
                    <button input="field" type="submit">Create Your Profile</button>
                </form>
            </div>
        ) 
    }
}

export default CreateUser;