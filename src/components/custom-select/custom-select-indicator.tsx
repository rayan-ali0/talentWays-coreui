import React from 'react';
import { components } from 'react-select';
import SelectDelete from "../../assets/images/select-delete.svg";
import SelectDownArrow from "../../assets/images/select-down-arrow.svg";
import viewIcon from "../../assets/images/select-view.svg";

// const { Option } = components;

export interface ICustomSelectItem {
    value: number | string;
    label: string;
}

export const FormatLabelWithView = function _FormatGroupLabel(props: any) {
    return (
        <div style={{ width: "100%", display: "flex", "justifyContent": "space-between", gap: "4px" }}>
            <div>{props.label}</div>
            <img style={{ paddingTop: "2px", cursor: "pointer" }} src={viewIcon} onClick={() => props.view()} />
        </div>
    )
};

export const DropdownIndicator = (props: any) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <components.DropdownIndicator {...props}>
                    <img className='cursor-pointer' src={SelectDownArrow} />
                </components.DropdownIndicator>
            </components.DropdownIndicator>
        )
    );
};

export const ClearIndicator = (props: any) => {
    return (
        components.ClearIndicator && (
            <components.ClearIndicator {...props}>
                <components.ClearIndicator {...props}>
                  <img className='cursor-pointer' src={SelectDelete} />
                </components.ClearIndicator>
            </components.ClearIndicator>
        )
    );
};

export const MultiValueRemove = (props: any) => {
    return (
        components.MultiValueRemove && (
            <components.MultiValueRemove {...props}>
                <components.MultiValueRemove {...props}>
                    <img className='cursor-pointer' src={SelectDelete} />
                </components.MultiValueRemove>
            </components.MultiValueRemove>
        )
    );
};