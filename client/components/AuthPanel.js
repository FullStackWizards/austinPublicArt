import React from 'react'


export default class AuthModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showModal: false
		}
	}

	render() {

		return (
			<div>
				{this.props.loggedIn ? 
					<div className="loggedInPanel">
						<p>Welcome "username"!</p>
						<button onClick={(e) => {
							this.props.logoutFunction()
							
						}}> Logout </button>
					</div> :
					<button onClick={(e) => {
						this.setState({showModal: true})
						this.props.loginFunction()
					}}> Login </button>
				}

				<p show={this.props.loggedIn}> ~~~~~~~xD~~~~~~~~ </p>

			</div>


			)
	}
}