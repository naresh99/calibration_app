/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInstrumentSchedules = /* GraphQL */ `
  mutation CreateInstrumentSchedules(
    $input: CreateInstrumentSchedulesInput!
    $condition: ModelInstrumentSchedulesConditionInput
  ) {
    createInstrumentSchedules(input: $input, condition: $condition) {
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
export const updateInstrumentSchedules = /* GraphQL */ `
  mutation UpdateInstrumentSchedules(
    $input: UpdateInstrumentSchedulesInput!
    $condition: ModelInstrumentSchedulesConditionInput
  ) {
    updateInstrumentSchedules(input: $input, condition: $condition) {
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
export const deleteInstrumentSchedules = /* GraphQL */ `
  mutation DeleteInstrumentSchedules(
    $input: DeleteInstrumentSchedulesInput!
    $condition: ModelInstrumentSchedulesConditionInput
  ) {
    deleteInstrumentSchedules(input: $input, condition: $condition) {
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
export const createCalibrationSchedule = /* GraphQL */ `
  mutation CreateCalibrationSchedule(
    $input: CreateCalibrationScheduleInput!
    $condition: ModelCalibrationScheduleConditionInput
  ) {
    createCalibrationSchedule(input: $input, condition: $condition) {
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
export const updateCalibrationSchedule = /* GraphQL */ `
  mutation UpdateCalibrationSchedule(
    $input: UpdateCalibrationScheduleInput!
    $condition: ModelCalibrationScheduleConditionInput
  ) {
    updateCalibrationSchedule(input: $input, condition: $condition) {
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
export const deleteCalibrationSchedule = /* GraphQL */ `
  mutation DeleteCalibrationSchedule(
    $input: DeleteCalibrationScheduleInput!
    $condition: ModelCalibrationScheduleConditionInput
  ) {
    deleteCalibrationSchedule(input: $input, condition: $condition) {
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
