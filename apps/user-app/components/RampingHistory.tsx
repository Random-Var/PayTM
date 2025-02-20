import { Ramping } from "../app/(dashboard)/ramping_history/types"
import { IncomingIcon, OutgoingIcon } from "./Icons";
import { SuccessIcon, FailureIcon, ProcessingIcon } from "./Icons";
import { NullDiv } from "./NullDiv";

export const RampingHistory = ({ rampings }: {
    rampings: Ramping[]
}) => {
    if (!rampings.length) {
        return <>
            <NullDiv />
            <div className="flex justify-center"><p className="text-md text-[#6a51a6]">You have not performed any rampings.</p></div>
        </>
    }

    return (
        <>
            <div className="text-center pb-8 pt-8 max-h-[80vh] overflow-y-scroll">
                {rampings.map(t =>
                    <div className="bg-[#baa8db] hover:bg-[#9c94e6] p-8 rounded-lg text-[#423a0e] hover:text-[#ecebdd]">
                        <div className="flex justify-between text-lg font-bold">
                            <p>{t.provider}</p>
                            <p>₹{(t.amount/100).toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            {t.direction == "In" ? <IncomingIcon /> : <OutgoingIcon />}
                            <p>{new Date(t.startTime).toLocaleString()}</p>
                            {t.status == "Success" ? <SuccessIcon /> : (t.status == "Failure" ? <FailureIcon /> : <ProcessingIcon />)}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center"><p className="text-md text-[#6a51a6]">Please note this is the initiation time of ramping.</p></div>
        </>
    );
}
