import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput, Row, Col, Input, Label } from 'reactstrap'
import labels from '/imports/both/i18n/en/new-event-modal.json'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import ErrorField from '/imports/client/utils/uniforms-custom/ErrorField'
import Recurring from './DateTimeModule/Recurring'
import WeekDays from './DateTimeModule/WeekDays'
import SameDateHours from './SameDateHours'


class SecondStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openEndDate: this.props.form.getModel().categories.some(e => {
        return e.name === 'Community Offer' || e.name === 'Meet me for Action!'
      })
    }
  }
  render () {
    const {
      form
    } = this.props

    const RadioButton = this.RadioButton

    let { openEndDate } = this.state

    const {
      days,
      multipleDays,
      repeat
    } = form.getModel().when

    return (
      <div id='second-step'>
        <AutoField name='findHints' />
        <div className='dates-hours inline-inputs hide-labels'>
          <div>
            <Row>
              <Col className='date-hours-coupled'>
                <AutoField name='when.startingDate' />
                {!multipleDays && <AutoField name='when.startingTime' />}
              </Col>
              <Col className='date-hours-coupled'>
                {(!repeat && !openEndDate) && <AutoField
                  name='when.endingDate'
                  specialCat={this.props.form.getModel().categories.some(e => {
                    return e.name === 'Community Offer' || e.name === 'Meet me for Action!'
                  })}
                />}
                {(!multipleDays && !openEndDate) && <AutoField name='when.endingTime' />}
                {(!repeat && openEndDate) && (
                  <AutoField
                    name='when.endingDate'
                    openEndDate={true}
                    handleCalendarClick={this.resetEndDate}
                  />
                )}
              </Col>
            </Row>
          </div>
          {/*
          <div>
            <Row>
              <Col>
                {!multipleDays && <AutoField name='when.startingTime' />}
              </Col>
              <Col>
                {!multipleDays && <AutoField name='when.endingTime' />}
              </Col>
            </Row>
          </div>
          */}
        </div>

        {/* Weekdays  */}
        <RadioButton
          id='multipleDays'
          label={labels.recurrence.thirdRadio}
          value={multipleDays}
          type='radio'
        />
        {multipleDays && (
          <div className='week-days'>
            <ErrorField name='when.days' errorMessage='Please select at least 1 day' />
            <SameDateHours
              form={form}
              schemaKey={'when.days'}
            />
            <WeekDays
              form={form}
              schemaKey={'when.days'}
              selectedDays={days || []}
            />
          </div>
        )}

        {/* Repetition */}
        <RadioButton
          id='repeat'
          label={labels.recurrence.fourthRadio}
          value={repeat}
          type='radio'
        />
        {repeat && <Recurring form={form} />}
        <AutoField className='pageDetails' name='description' />
        <AutoField name='engagement.limit' />
      </div>
    )
  }

resetEndDate = () => {
  // NOTE: for special category events, this resets their ending date to standard
  this.setState({ openEndDate: false })
}

RadioButton = ({ label, id, value, type }) => (
  <CustomInput
    id={id}
    type={type}
    label={label}
    checked={value === undefined ? false : value}
    onChange={() => {}}
    onClick={() => this.handleRadioButton(id, !value)}
  />
)

handleRadioButton = (type, value) => {
  const { when } = this.props.form.getModel()

  this.props.form.change('when', {
    ...when,
    multipleDays: type === 'multipleDays' ? value : false,
    repeat: type === 'repeat' ? value : false
  })

  // Scroll to bottom of modal
  setTimeout(() => {
    const modal = document.querySelector('.modal-body')
    modal.scrollTo(modal, 375)
  }, 1)
}
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
