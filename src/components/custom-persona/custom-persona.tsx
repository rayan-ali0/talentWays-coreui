import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';

// helper
import BackgroundProfileImage from "../../assets/images/profile-background.svg";
import UserProfile from "../../assets/images/user-profile-fallback.svg";
import { CustomSearch } from '../custom-search/custom-search';

interface IUser {
    value: string,
    name: string,
    registerNumber: string,
    image: any
}
export interface IUserSelectorProps {
    users: IUser[],
    getUsers(searchword: string | undefined): void,
    setUser?(selectedUserId: any): void;
}

export const UserSelector: FC<IUserSelectorProps> = function _UserSelector({ users, getUsers, setUser }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedUser, setSelectedUser] = useState<any | undefined>();

    useEffect(() => {
        getUsers(searchKeyword);
    }, [searchKeyword])

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const user = users.find((user) => user.value == event.target.value);
        setSelectedUser(user);
        if (setUser && user)
            setUser(user);
    };

    function loadFallbackImage(currentTarget: EventTarget & HTMLImageElement) {
        currentTarget.onerror = null;
        currentTarget.src = UserProfile;
    }

    return (
        <div className="flex flex-col gap-4 mt-6 max-md:mb-[330px]">
            <p className="text-sm font-bold">
                قم بإختيار الموظف الذي تريد تحويل المهمة اليه
            </p>
            <div className="flex max-md:flex-col gap-4">
                <div className="bg-whitely-100 shadow-md rounded-lg  p-4 md:w-1/2">
                    <CustomSearch onChange={(search: string) => setSearchKeyword(search)} label={"اختيار اسم الموظف"} placeholder={"البحث من خلال إسم الموظف"} />

                    <div className="custom-scrollbar border border-[#E1E3E5] rounded-lg p-2 mt-6  h-[340px] overflow-y-auto">
                        {users.map((user, index) => (
                            <Fragment key={user.value}>
                                <div className="flex items-center gap-4 p-3">
                                    <div className="aegov-check-item">
                                        <input id={`option_${user.value}`} type="radio" name="option" value={user.value}
                                            checked={selectedUser?.value === user.value} onChange={handleRadioChange} />
                                    </div>
                                    <div>
                                        <img src={user?.image || UserProfile} alt="" width={60} height={60} onError={({ currentTarget }) => loadFallbackImage(currentTarget)} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="font-bold text-lg">{user.name}</div>
                                        <div className="text-[#5C697E]">{user.registerNumber}</div>
                                    </div>
                                </div>
                                {index < users.length - 1 && <hr className="text-[#DCE3EC]" />}
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="bg-whitely-100 shadow-md rounded-lg md:w-1/2">
                    <div className="relative">
                        <img src={BackgroundProfileImage} alt="profile" className="w-full" />
                        {
                            selectedUser &&
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 mb-4">
                                <img src={selectedUser?.image || UserProfile} alt="" width={160} className="rounded-full" onError={({ currentTarget }) => loadFallbackImage(currentTarget)} />
                                <div className="flex flex-col gap-4 mt-4 items-center">
                                    <div className="bg-[#E6F7FD] text-[#015E81] flex items-center justify-center rounded-lg py-1 px-4">
                                        {selectedUser?.type}
                                    </div>
                                    <div className="font-semibold">{selectedUser?.name}</div>
                                    <div className="text-[#5C697E]">{selectedUser?.registerNumber}</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
