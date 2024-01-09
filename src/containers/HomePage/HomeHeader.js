import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo-1.svg";
import { FormattedMessage } from "react-intl";

class HomeHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<i class="fas fa-bars"></i>
							<img className="header-logo" src={logo} />
						</div>
						<div className="center-content">
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.speciality" /></b>
								</div>
								<div className="sub-title"><FormattedMessage id="home-header.searchdoctor" /></div>
							</div>
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.health-facility" /></b>
								</div>
								<div className="sub-title"><FormattedMessage id="home-header.select-room" /></div>
							</div>
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.doctor" /></b>
								</div>
								<div className="sub-title"><FormattedMessage id="home-header.select-doctor" /></div>
							</div>
							<div className="child-content">
								<div>
									<b><FormattedMessage id="home-header.fee" /></b>
								</div>
								<div className="sub-title"><FormattedMessage id="home-header.check-health" /></div>
							</div>
						</div>
						<div className="right-content">
							<div className="support"><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support" /> </div>
							<div className="language-vi">VN</div>
							<div className="language-en">EN</div>
						</div>
					</div>
				</div>
				<div className="home-header-banner">
					<div className="content-up">
						<div className="title1"><FormattedMessage id="banner.title1" /></div>
						<div className="title2"><FormattedMessage id="banner.title2" /></div>
						<div className="search">
							<i className="fas fa-search"></i>
							<input text="text" placeholder="Tìm chuyên khoa khám bệnh" />
						</div>
					</div>
					<div className="content-down">
						<div className="options">
							<div className="option-child">
								<div className="icon-child">
									<i className="far fa-hospital"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child1" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-mobile-alt"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child2" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-procedures"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child3" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<img src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161340-iconxet-nghiem-y-hoc.png" />
								</div>
								<div className="text-child"><FormattedMessage id="banner.child4" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<i className="fas fa-user-md"></i>
								</div>
								<div className="text-child"><FormattedMessage id="banner.child5" /></div>
							</div>
							<div className="option-child">
								<div className="icon-child">
									<img src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161410-iconkham-nha-khoa.png" />
								</div>
								<div className="text-child"><FormattedMessage id="banner.child6" /> </div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
