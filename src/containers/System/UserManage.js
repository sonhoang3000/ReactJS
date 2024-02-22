import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsersService, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter"

class UserManage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalUser: false,
			isOpenModalEditlUser: false,
			userEdit: {

			}
		}
	}

	async componentDidMount() {
		await this.getAllUsersFromReact();
	}

	getAllUsersFromReact = async () => {
		let response = await getAllUsersService("ALL");
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	}

	handleAddNewUser = () => {
		this.setState({
			isOpenModalUser: true,
		})
	}

	toggleUserModal = () => {
		this.setState({
			isOpenModalUser: !this.state.isOpenModalUser,
		})
	}

	toggleUserEditModal = () => {
		this.setState({
			isOpenModalEditlUser: !this.state.isOpenModalEditlUser,
		});
	}

	createNewUser = async (data) => {
		try {
			let response = await createNewUserService(data)
			if (response && response.errCode !== 0) {
				alert(response.errMessage)
			} else {
				await this.getAllUsersFromReact();
				this.setState({
					isOpenModalUser: false
				})
				emitter.emit("EVENT_CLEAR_MODAL_DARA",)
			}
		} catch (e) {
			console.log(e)
		}
	}

	handleDeleteUser = async (user) => {
		try {
			let res = await deleteUserService(user.id)
			console.log('check res delete', user)
			if (res && res.errCode === 0) {
				await this.getAllUsersFromReact();
			} else {
				alert(res.errMessage)
			}
		} catch (e) {
			console.log(e)
		}
	}

	handleEditUser = (user) => {
		console.log('check edit user:', user)
		this.setState({
			isOpenModalEditlUser: true,
			userEdit: user
		})
	}

	doEditUser = async (user) => {
		try {
			let res = await editUserService(user)
			if (res && res.errCode === 0) {
				this.setState({
					isOpenModalEditlUser: false
				})

				await this.getAllUsersFromReact()
			} else {
				alert(res.errCode)
			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="user-container">
				<ModalUser
					isOpenModal={this.state.isOpenModalUser}
					toggleFromParent={this.toggleUserModal}
					createNewUser={this.createNewUser}
					size="lg"
				/>
				{
					this.state.isOpenModalEditlUser &&
					<ModalEditUser
						isOpen={this.state.isOpenModalEditlUser}
						toggleFromParent={this.toggleUserEditModal}
						currentUser={this.state.userEdit}
						editUser={this.doEditUser}
					/>
				}
				<div className="title text-center">Manage users with hoidanIT</div>

				<div className="mx-1">
					<button
						className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}
					>
						<i className="fas fa-plus"></i> Add new user
					</button>
				</div>
				<div className="users-table mt-4 mx-2">
					<table id="customers">
						<tbody>
							<tr>
								<th>Email</th>
								<th>First name</th>
								<th>Last name</th>
								<th>Address</th>
								<th>Actions</th>
							</tr>

							{arrUsers &&
								arrUsers.map((item, index) => {
									return (
										<tr>
											<td>{item.email}</td>
											<td>{item.firstName}</td>
											<td>{item.lastName}</td>
											<td>{item.address}</td>
											<td>
												<button className="btn-edit" onClick={() => this.handleEditUser(item)} >
													<i className="fas fa-edit"></i>
												</button>
												<button className="btn-delete" onClick={() => this.handleDeleteUser(item)} >
													<i className="fas fa-trash"></i>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);