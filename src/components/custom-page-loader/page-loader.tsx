// Loader.jsx
import React from 'react';
/**
 * PageLoader Component
 *
 * A simple loader component that displays a loading indicator when the `loading` prop is `true`.
 *
 * @component
 * @param {boolean} loading - A boolean that determines whether the loader is visible or hidden.
 * @returns {JSX.Element} The rendered loader component.
 */
export const PageLoader = (props: { loading: boolean }) => {
    if (!props.loading) return null;

    return (
        <div className="fixed t-0 l-0 h-full w-full flex justify-center items-center z-[999]">
            <div className="animate-dot-spin w-[10px] h-[10px] rounded-full  border-r-slate-300 border-l-slate-300"></div>
        </div>
    );
};
