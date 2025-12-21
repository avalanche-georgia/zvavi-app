'use client'

import ReactDatePicker, { type DatePickerProps } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// eslint-disable-next-line react/jsx-props-no-spreading
const DatePicker = (props: DatePickerProps) => <ReactDatePicker {...props} />

export default DatePicker
