import { RampingHistory } from "../../../components/RampingHistory";
import { Ramping } from "./types";
import { getHDFCBankRampings, getAxisBankRampings, mergeAndSortRampings } from "./logic";

export default async function () {
    const hdfcRampings: Ramping[] = await getHDFCBankRampings();
    const axisRampings: Ramping[] = await getAxisBankRampings();
    const sortedRampings: Ramping[] = mergeAndSortRampings(hdfcRampings, axisRampings);

    return <div className="w-screen flex flex-col">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Ramping History
        </div>
        <div className="m-8 flex-1 flex flex-col justify-between">
            <RampingHistory rampings={sortedRampings} />
        </div>
    </div>
}
