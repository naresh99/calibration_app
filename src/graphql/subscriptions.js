/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInstrumentSchedules = /* GraphQL */ `
  subscription OnCreateInstrumentSchedules(
    $filter: ModelSubscriptionInstrumentSchedulesFilterInput
  ) {
    onCreateInstrumentSchedules(filter: $filter) {
      id
      instrument_id
      location
      capacity
      category
      scheduled_date
      performed_date
      entered_by
      entered_date
      calibrationscheduleID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateInstrumentSchedules = /* GraphQL */ `
  subscription OnUpdateInstrumentSchedules(
    $filter: ModelSubscriptionInstrumentSchedulesFilterInput
  ) {
    onUpdateInstrumentSchedules(filter: $filter) {
      id
      instrument_id
      location
      capacity
      category
      scheduled_date
      performed_date
      entered_by
      entered_date
      calibrationscheduleID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteInstrumentSchedules = /* GraphQL */ `
  subscription OnDeleteInstrumentSchedules(
    $filter: ModelSubscriptionInstrumentSchedulesFilterInput
  ) {
    onDeleteInstrumentSchedules(filter: $filter) {
      id
      instrument_id
      location
      capacity
      category
      scheduled_date
      performed_date
      entered_by
      entered_date
      calibrationscheduleID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCalibrationSchedule = /* GraphQL */ `
  subscription OnCreateCalibrationSchedule(
    $filter: ModelSubscriptionCalibrationScheduleFilterInput
  ) {
    onCreateCalibrationSchedule(filter: $filter) {
      id
      schedule_name
      schedule_number
      instrument_type
      calibration_frequency
      effective_Date
      year
      reference_sop
      prepared_by
      prepared_date
      checked_by
      checked_date
      approved_by
      approved_date
      CalScheduleToInsSchedule {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCalibrationSchedule = /* GraphQL */ `
  subscription OnUpdateCalibrationSchedule(
    $filter: ModelSubscriptionCalibrationScheduleFilterInput
  ) {
    onUpdateCalibrationSchedule(filter: $filter) {
      id
      schedule_name
      schedule_number
      instrument_type
      calibration_frequency
      effective_Date
      year
      reference_sop
      prepared_by
      prepared_date
      checked_by
      checked_date
      approved_by
      approved_date
      CalScheduleToInsSchedule {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCalibrationSchedule = /* GraphQL */ `
  subscription OnDeleteCalibrationSchedule(
    $filter: ModelSubscriptionCalibrationScheduleFilterInput
  ) {
    onDeleteCalibrationSchedule(filter: $filter) {
      id
      schedule_name
      schedule_number
      instrument_type
      calibration_frequency
      effective_Date
      year
      reference_sop
      prepared_by
      prepared_date
      checked_by
      checked_date
      approved_by
      approved_date
      CalScheduleToInsSchedule {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
