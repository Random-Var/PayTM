import { UserDetails } from "../app/(dashboard)/dashboard/types";

export const UserDetailsCard = ({ userDetails }: {
    userDetails: UserDetails
}) => {
    return <div className="bg-[#d9e993] rounded-lg p-8 font-bold space-y-4">
        <div className="text-3xl">User Details</div>
        <div className="flex">
            <div className="text-[#2fd437] space-y-1 w-1/2">
                <div>Your Phone Number:</div>
                <div>Your Name:</div>
                <div>Your Email Address:</div>
            </div>
            <div className="text-[#d63131] space-y-1 flex-1">
                <div>{userDetails.number}</div>
                <div>{userDetails.name}</div>
                <div>{userDetails.email}</div>
            </div>
        </div>
    </div>
}
