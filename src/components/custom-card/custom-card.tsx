import React, { FC } from 'react'

interface ICustomCardProps {
    children: any
    className?: string
}
/**
 * CustomCard Component
 *
 * A wrapper card component that provides a styled container for its children.
 * Accepts optional custom CSS classes for additional styling.
 *
 * 
 * @param {React.ReactNode} children - The content to be rendered within the card.
 * @param {string} [className] - Optional CSS class for styling the card container.
 * @returns {JSX.Element} The rendered custom card component.
 */
export const CustomCard: FC<ICustomCardProps> = ({ children, className }) => {
    return (
        <div className={`p-4 rounded-[10px] shadow-lg border border-aegold-200 ${className ? className : ''} `}>
            {children}
        </div>
    )
}

