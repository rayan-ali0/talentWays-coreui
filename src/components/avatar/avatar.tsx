import React from 'react'

interface AvatarProps {
    text: string;
    textColor: string;
    backgroundColor: string;
    isArabic: boolean;
    imgUrl?:string;
}
export const Avatar: React.FC<AvatarProps> = ({ text, backgroundColor, textColor, isArabic,imgUrl}) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join(isArabic ? " " : "");
    };
    return (
        <div className='flex items-center gap-2'>
            <div className={`flex flex-col justify-center  items-center h-8 w-8 rounded-full ${backgroundColor} ${textColor}`}>
                {imgUrl ? <img src={imgUrl} className='h-full rounded-full'/> : getInitials(text)}
            </div>
            {text}
        </div>
    )
}
