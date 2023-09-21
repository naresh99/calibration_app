/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateScheduleInputValues = {
    schedule_name?: string;
    schedule_number?: string;
    instrument_type?: string;
    calibration_frequency?: string;
    effective_Date?: string;
    year?: number;
    reference_sop?: string;
    prepared_by?: string;
    prepared_date?: string;
    checked_by?: string;
    checked_date?: string;
    approved_by?: string;
    approved_date?: string;
};
export declare type CreateScheduleValidationValues = {
    schedule_name?: ValidationFunction<string>;
    schedule_number?: ValidationFunction<string>;
    instrument_type?: ValidationFunction<string>;
    calibration_frequency?: ValidationFunction<string>;
    effective_Date?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    reference_sop?: ValidationFunction<string>;
    prepared_by?: ValidationFunction<string>;
    prepared_date?: ValidationFunction<string>;
    checked_by?: ValidationFunction<string>;
    checked_date?: ValidationFunction<string>;
    approved_by?: ValidationFunction<string>;
    approved_date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateScheduleOverridesProps = {
    CreateScheduleGrid?: PrimitiveOverrideProps<GridProps>;
    schedule_name?: PrimitiveOverrideProps<TextFieldProps>;
    schedule_number?: PrimitiveOverrideProps<TextFieldProps>;
    instrument_type?: PrimitiveOverrideProps<TextFieldProps>;
    calibration_frequency?: PrimitiveOverrideProps<TextFieldProps>;
    effective_Date?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    reference_sop?: PrimitiveOverrideProps<TextFieldProps>;
    prepared_by?: PrimitiveOverrideProps<TextFieldProps>;
    prepared_date?: PrimitiveOverrideProps<TextFieldProps>;
    checked_by?: PrimitiveOverrideProps<TextFieldProps>;
    checked_date?: PrimitiveOverrideProps<TextFieldProps>;
    approved_by?: PrimitiveOverrideProps<TextFieldProps>;
    approved_date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreateScheduleProps = React.PropsWithChildren<{
    overrides?: CreateScheduleOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CreateScheduleInputValues) => CreateScheduleInputValues;
    onSuccess?: (fields: CreateScheduleInputValues) => void;
    onError?: (fields: CreateScheduleInputValues, errorMessage: string) => void;
    onChange?: (fields: CreateScheduleInputValues) => CreateScheduleInputValues;
    onValidate?: CreateScheduleValidationValues;
} & React.CSSProperties>;
export default function CreateSchedule(props: CreateScheduleProps): React.ReactElement;
