import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
class OutStandingDoctor extends Component {

	constructor(props) {
		super(props)
		this.state = {
			arrDoctors: []
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
			this.setState({
				arrDoctors: this.props.topDoctorsRedux
			})
		}
	}

	componentDidMount() {
		this.props.loadTopDoctors();
	}

	handleViewDetailDoctor = (doctor) => {
		if (this.props.history) {
			this.props.history.push(`/detail-doctor/${doctor.id}`)
		}
	}

	handleMoreDoctor = () => {
		if (this.props.history) {
			this.props.history.push(`/more-doctor`)
		}
	}

	render() {
		let arrDoctors = this.state.arrDoctors;

		return (
			<div className="section-share section-outstanding-doctor ">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">
							Bác sĩ nổi bật
						</span>
						<button
							onClick={() => this.handleMoreDoctor()}
							className="btn-section">
							xem thêm
						</button>
					</div>

					<div className="section-body">
						<Slider {...this.props.settings}>
							{arrDoctors && arrDoctors.length > 0 &&
								arrDoctors.map((item, index) => {
									let imageBase64 = '';
									if (item.image) {
										imageBase64 = new Buffer(item.image, 'base64').toString('binary');
									}
									let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
									return (
										<div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}  >
											<div className='customize-border'>
												<div className='outer-bg'>
													<div className='bg-image section-outstanding-doctor'
														style={{ backgroundImage: `url(${imageBase64})` }}
													/>

												</div>
												<div className='position text-center'>
													<div className='infor-doctor-p' >{nameVi}</div>
													{/* <div>Cơ Xương Khớp </div> */}
												</div>
											</div>
										</div>
									)
								})
							}
						</Slider>
					</div>
				</div>
			</div >
		)


	}

}

const mapStateToProps = state => {
	return {
		topDoctorsRedux: state.admin.topDoctors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
