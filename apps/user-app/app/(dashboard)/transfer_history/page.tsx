import { TransferHistory } from "../../../components/TransferHistory";
import { Transfer } from "./types"
import { getIncomingTransfers, getOutgoingTransfers, mergeAndSortTransfers } from "./logic"

export default async function() {
    const incomingTransfers: Transfer[] = await getIncomingTransfers();
    const outgoingTransfers: Transfer[] = await getOutgoingTransfers();
    const sortedTransfers: Transfer[] = mergeAndSortTransfers(incomingTransfers, outgoingTransfers);
    
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer History
        </div>
        <div className="m-8 flex-1 flex flex-col justify-between">
            <TransferHistory transfers={sortedTransfers}/>
        </div>
    </div>
}
