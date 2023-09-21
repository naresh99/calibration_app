/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createCalibrationSchedule } from "../graphql/mutations";
export default function CalibrationScheduleCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    schedule_name: "",
    schedule_number: "",
    instrument_type: "",
    calibration_frequency: "",
    effective_Date: "",
    year: "",
    reference_sop: "",
    prepared_by: "",
    prepared_date: "",
    checked_by: "",
    checked_date: "",
    approved_by: "",
    approved_date: "",
  };
  const [schedule_name, setSchedule_name] = React.useState(
    initialValues.schedule_name
  );
  const [schedule_number, setSchedule_number] = React.useState(
    initialValues.schedule_number
  );
  const [instrument_type, setInstrument_type] = React.useState(
    initialValues.instrument_type
  );
  const [calibration_frequency, setCalibration_frequency] = React.useState(
    initialValues.calibration_frequency
  );
  const [effective_Date, setEffective_Date] = React.useState(
    initialValues.effective_Date
  );
  const [year, setYear] = React.useState(initialValues.year);
  const [reference_sop, setReference_sop] = React.useState(
    initialValues.reference_sop
  );
  const [prepared_by, setPrepared_by] = React.useState(
    initialValues.prepared_by
  );
  const [prepared_date, setPrepared_date] = React.useState(
    initialValues.prepared_date
  );
  const [checked_by, setChecked_by] = React.useState(initialValues.checked_by);
  const [checked_date, setChecked_date] = React.useState(
    initialValues.checked_date
  );
  const [approved_by, setApproved_by] = React.useState(
    initialValues.approved_by
  );
  const [approved_date, setApproved_date] = React.useState(
    initialValues.approved_date
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSchedule_name(initialValues.schedule_name);
    setSchedule_number(initialValues.schedule_number);
    setInstrument_type(initialValues.instrument_type);
    setCalibration_frequency(initialValues.calibration_frequency);
    setEffective_Date(initialValues.effective_Date);
    setYear(initialValues.year);
    setReference_sop(initialValues.reference_sop);
    setPrepared_by(initialValues.prepared_by);
    setPrepared_date(initialValues.prepared_date);
    setChecked_by(initialValues.checked_by);
    setChecked_date(initialValues.checked_date);
    setApproved_by(initialValues.approved_by);
    setApproved_date(initialValues.approved_date);
    setErrors({});
  };
  const validations = {
    schedule_name: [],
    schedule_number: [],
    instrument_type: [],
    calibration_frequency: [],
    effective_Date: [],
    year: [],
    reference_sop: [],
    prepared_by: [],
    prepared_date: [],
    checked_by: [],
    checked_date: [],
    approved_by: [],
    approved_date: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          schedule_name,
          schedule_number,
          instrument_type,
          calibration_frequency,
          effective_Date,
          year,
          reference_sop,
          prepared_by,
          prepared_date,
          checked_by,
          checked_date,
          approved_by,
          approved_date,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createCalibrationSchedule,
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CalibrationScheduleCreateForm")}
      {...rest}
    >
      <TextField
        label="Schedule name"
        isRequired={false}
        isReadOnly={false}
        value={schedule_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name: value,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.schedule_name ?? value;
          }
          if (errors.schedule_name?.hasError) {
            runValidationTasks("schedule_name", value);
          }
          setSchedule_name(value);
        }}
        onBlur={() => runValidationTasks("schedule_name", schedule_name)}
        errorMessage={errors.schedule_name?.errorMessage}
        hasError={errors.schedule_name?.hasError}
        {...getOverrideProps(overrides, "schedule_name")}
      ></TextField>
      <TextField
        label="Schedule number"
        isRequired={false}
        isReadOnly={false}
        value={schedule_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number: value,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.schedule_number ?? value;
          }
          if (errors.schedule_number?.hasError) {
            runValidationTasks("schedule_number", value);
          }
          setSchedule_number(value);
        }}
        onBlur={() => runValidationTasks("schedule_number", schedule_number)}
        errorMessage={errors.schedule_number?.errorMessage}
        hasError={errors.schedule_number?.hasError}
        {...getOverrideProps(overrides, "schedule_number")}
      ></TextField>
      <TextField
        label="Instrument type"
        isRequired={false}
        isReadOnly={false}
        value={instrument_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type: value,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.instrument_type ?? value;
          }
          if (errors.instrument_type?.hasError) {
            runValidationTasks("instrument_type", value);
          }
          setInstrument_type(value);
        }}
        onBlur={() => runValidationTasks("instrument_type", instrument_type)}
        errorMessage={errors.instrument_type?.errorMessage}
        hasError={errors.instrument_type?.hasError}
        {...getOverrideProps(overrides, "instrument_type")}
      ></TextField>
      <TextField
        label="Calibration frequency"
        isRequired={false}
        isReadOnly={false}
        value={calibration_frequency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency: value,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.calibration_frequency ?? value;
          }
          if (errors.calibration_frequency?.hasError) {
            runValidationTasks("calibration_frequency", value);
          }
          setCalibration_frequency(value);
        }}
        onBlur={() =>
          runValidationTasks("calibration_frequency", calibration_frequency)
        }
        errorMessage={errors.calibration_frequency?.errorMessage}
        hasError={errors.calibration_frequency?.hasError}
        {...getOverrideProps(overrides, "calibration_frequency")}
      ></TextField>
      <TextField
        label="Effective date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={effective_Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date: value,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.effective_Date ?? value;
          }
          if (errors.effective_Date?.hasError) {
            runValidationTasks("effective_Date", value);
          }
          setEffective_Date(value);
        }}
        onBlur={() => runValidationTasks("effective_Date", effective_Date)}
        errorMessage={errors.effective_Date?.errorMessage}
        hasError={errors.effective_Date?.hasError}
        {...getOverrideProps(overrides, "effective_Date")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year: value,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Reference sop"
        isRequired={false}
        isReadOnly={false}
        value={reference_sop}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop: value,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.reference_sop ?? value;
          }
          if (errors.reference_sop?.hasError) {
            runValidationTasks("reference_sop", value);
          }
          setReference_sop(value);
        }}
        onBlur={() => runValidationTasks("reference_sop", reference_sop)}
        errorMessage={errors.reference_sop?.errorMessage}
        hasError={errors.reference_sop?.hasError}
        {...getOverrideProps(overrides, "reference_sop")}
      ></TextField>
      <TextField
        label="Prepared by"
        isRequired={false}
        isReadOnly={false}
        value={prepared_by}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by: value,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.prepared_by ?? value;
          }
          if (errors.prepared_by?.hasError) {
            runValidationTasks("prepared_by", value);
          }
          setPrepared_by(value);
        }}
        onBlur={() => runValidationTasks("prepared_by", prepared_by)}
        errorMessage={errors.prepared_by?.errorMessage}
        hasError={errors.prepared_by?.hasError}
        {...getOverrideProps(overrides, "prepared_by")}
      ></TextField>
      <TextField
        label="Prepared date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={prepared_date && convertToLocal(new Date(prepared_date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date: value,
              checked_by,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.prepared_date ?? value;
          }
          if (errors.prepared_date?.hasError) {
            runValidationTasks("prepared_date", value);
          }
          setPrepared_date(value);
        }}
        onBlur={() => runValidationTasks("prepared_date", prepared_date)}
        errorMessage={errors.prepared_date?.errorMessage}
        hasError={errors.prepared_date?.hasError}
        {...getOverrideProps(overrides, "prepared_date")}
      ></TextField>
      <TextField
        label="Checked by"
        isRequired={false}
        isReadOnly={false}
        value={checked_by}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by: value,
              checked_date,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.checked_by ?? value;
          }
          if (errors.checked_by?.hasError) {
            runValidationTasks("checked_by", value);
          }
          setChecked_by(value);
        }}
        onBlur={() => runValidationTasks("checked_by", checked_by)}
        errorMessage={errors.checked_by?.errorMessage}
        hasError={errors.checked_by?.hasError}
        {...getOverrideProps(overrides, "checked_by")}
      ></TextField>
      <TextField
        label="Checked date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={checked_date && convertToLocal(new Date(checked_date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date: value,
              approved_by,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.checked_date ?? value;
          }
          if (errors.checked_date?.hasError) {
            runValidationTasks("checked_date", value);
          }
          setChecked_date(value);
        }}
        onBlur={() => runValidationTasks("checked_date", checked_date)}
        errorMessage={errors.checked_date?.errorMessage}
        hasError={errors.checked_date?.hasError}
        {...getOverrideProps(overrides, "checked_date")}
      ></TextField>
      <TextField
        label="Approved by"
        isRequired={false}
        isReadOnly={false}
        value={approved_by}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by: value,
              approved_date,
            };
            const result = onChange(modelFields);
            value = result?.approved_by ?? value;
          }
          if (errors.approved_by?.hasError) {
            runValidationTasks("approved_by", value);
          }
          setApproved_by(value);
        }}
        onBlur={() => runValidationTasks("approved_by", approved_by)}
        errorMessage={errors.approved_by?.errorMessage}
        hasError={errors.approved_by?.hasError}
        {...getOverrideProps(overrides, "approved_by")}
      ></TextField>
      <TextField
        label="Approved date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={approved_date && convertToLocal(new Date(approved_date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              schedule_name,
              schedule_number,
              instrument_type,
              calibration_frequency,
              effective_Date,
              year,
              reference_sop,
              prepared_by,
              prepared_date,
              checked_by,
              checked_date,
              approved_by,
              approved_date: value,
            };
            const result = onChange(modelFields);
            value = result?.approved_date ?? value;
          }
          if (errors.approved_date?.hasError) {
            runValidationTasks("approved_date", value);
          }
          setApproved_date(value);
        }}
        onBlur={() => runValidationTasks("approved_date", approved_date)}
        errorMessage={errors.approved_date?.errorMessage}
        hasError={errors.approved_date?.hasError}
        {...getOverrideProps(overrides, "approved_date")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
