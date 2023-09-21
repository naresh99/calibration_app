/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInstrumentSchedules = /* GraphQL */ `
  query GetInstrumentSchedules($id: ID!) {
    getInstrumentSchedules(id: $id) {
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
export const listInstrumentSchedules = /* GraphQL */ `
  query ListInstrumentSchedules(
    $filter: ModelInstrumentSchedulesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstrumentSchedules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const instrumentSchedulesByCalibrationscheduleID = /* GraphQL */ `
  query InstrumentSchedulesByCalibrationscheduleID(
    $calibrationscheduleID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInstrumentSchedulesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    instrumentSchedulesByCalibrationscheduleID(
      calibrationscheduleID: $calibrationscheduleID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCalibrationSchedule = /* GraphQL */ `
  query GetCalibrationSchedule($id: ID!) {
    getCalibrationSchedule(id: $id) {
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
export const listCalibrationSchedules = /* GraphQL */ `
  query ListCalibrationSchedules(
    $filter: ModelCalibrationScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalibrationSchedules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
