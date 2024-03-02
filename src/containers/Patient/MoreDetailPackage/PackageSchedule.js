import React, { Component } from 'react';
import { connect } from "react-redux";
import './PackageSchedule.scss';
import { getSchedulePackgeByDate } from '../../../services/userService'
import moment from 'moment';
import localization from 'moment/locale/vi';

class DoctorSchedule extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  allDays: [],
                  allAvalableTime: [],
                  isOpenModalBooking: false,
                  dataScheduleTimeModal: {}
            }
      }

      async componentDidMount() {
            let allDays = this.getArrDays();
            if (this.props.packageIdFromParent) {
                  let res = await getSchedulePackgeByDate(this.props.packageIdFromParent, allDays[0].value);
                  this.setState({
                        allAvalableTime: res.data ? res.data : []
                  })
                  console.log('check res', res)
            }

            this.setState({
                  allDays: allDays,
            })
      }

      async componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.packageIdFromParent !== prevProps.packageIdFromParent) {
                  let allDays = this.getArrDays();
                  let res = await getSchedulePackgeByDate(this.props.packageIdFromParent, allDays[0].value);
                  this.setState({
                        allAvalableTime: res.data ? res.data : []
                  })
            }
      }

      capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
      }

      getArrDays = () => {
            let allDays = [];
            for (let i = 0; i < 7; i++) {
                  let object = {};
                  if (i === 0) {
                        let ddMM = moment(new Date()).format('DD/MM');
                        let today = `Hôm nay - ${ddMM}`;
                        object.label = today;
                  } else {
                        let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                        object.label = this.capitalizeFirstLetter(labelVi)
                  }

                  object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                  allDays.push(object);
            }
            return allDays;
      }


      handleOnChangeSelect = async (event) => {
            if (this.props.packageIdFromParent && this.props.packageIdFromParent !== -1) {
                  let packageId = this.props.packageIdFromParent;
                  let date = event.target.value
                  let res = await getSchedulePackgeByDate(packageId, date);

                  if (res && res.errCode === 0) {
                        this.setState({
                              allAvalableTime: res.data ? res.data : []
                        })
                  }
                  console.log('schedule from react res:', res)
            }
      }

      handleClickScheduleTime = (time) => {
            this.setState({
                  isOpenModalBooking: true,
                  dataScheduleTimeModal: time
            })
      }

      closeBookingModal = () => {
            this.setState({
                  isOpenModalBooking: false
            })
      }

      render() {
            let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
            console.log('check allAvalableTime', this.state.allAvalableTime)
            return (
                  <>
                        <div className='package-schedule-container'>
                              <div className='all-schedule-package'>
                                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                          {allDays && allDays.length > 0 &&
                                                allDays.map((item, index) => {
                                                      return (
                                                            <option
                                                                  value={item.value}
                                                                  key={index} >
                                                                  {item.label}
                                                            </option>
                                                      )
                                                })
                                          }
                                    </select>
                              </div>
                              <div className='all-available-time'>
                                    <div className='text-calendar'>
                                          <i className='fas fa-calendar-alt'>
                                                <span>Lịch khám</span>
                                          </i>
                                    </div>
                                    <div className='time-content'>
                                          {allAvalableTime && allAvalableTime.length > 0 ?
                                                <>
                                                      <div className='time-content-btns'>
                                                            {allAvalableTime.map((item, index) => {
                                                                  let timeDisplay =
                                                                        item.timeTypeData.valueVi ? item.timeTypeData.valueVi : "";
                                                                  return (
                                                                        <button
                                                                              key={index}
                                                                              className='btn-vie'
                                                                              onClick={() => this.handleClickScheduleTime(item)}
                                                                        >
                                                                              {timeDisplay}

                                                                        </button>
                                                                  )
                                                            })}
                                                      </div>

                                                      <div className='book-free'>
                                                            <span>
                                                                  Chọn
                                                                  <i className='far fa-hand-point-up'></i>
                                                                  và đặt (miễn phí)
                                                            </span>
                                                      </div>
                                                </>
                                                :
                                                <div className='no-schedule'>
                                                      Bác sĩ không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác
                                                </div>
                                          }

                                    </div>
                              </div>
                        </div>


                  </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
