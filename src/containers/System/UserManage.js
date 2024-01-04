import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
		};
	}

	async componentDidMount() {
		let response = await getAllUsers("ALL");
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	}

	/* Life circle 
			Run component
			1. Run construct -> init state
			2. Did mount (set state)
			3. Render
	 
	 
		 
			*/

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="user-container">
				<div className="title text-center">Manage users with hoidanIT</div>
				<div className="users-table mt-4 mx-2">
					<table id="customers">
						<tr>
							<th>Email</th>
							<th>First name</th>
							<th>Last name</th>
							<th>Address</th>
							<th>Actions</th>
						</tr>

						{arrUsers &&
							arrUsers.map((item, index) => {
								console.log("eric check map ", item, index);
								return (
									<tr>
										<td>{item.email}</td>
										<td>{item.firstName}</td>
										<td>{item.lastName}</td>
										<td>{item.address}</td>
										<td>
											<button className="btn-edit">
												<i className="fas fa-edit"></i>
											</button>
											<button className="btn-delete">
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								);
							})}
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
