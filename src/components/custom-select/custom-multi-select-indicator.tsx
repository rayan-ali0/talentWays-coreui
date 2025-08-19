import React from 'react';
import { components } from 'react-select';
import SelectDelete from "../../assets/images/select-delete.svg";
import SelectDownArrow from "../../assets/images/select-down-arrow.svg";


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