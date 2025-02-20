import { MoneyStats } from "../app/(dashboard)/dashboard/types"

export const MoneyStatsCard = ({ moneyStats }: {
    moneyStats: MoneyStats
}) => {
    return <div className="bg-[#16469e] rounded-lg p-8 font-bold space-y-4">
        <div className="text-3xl text-white">Account Statistics</div>
        <div className="flex">
            <div className="text-[#a4eba7] space-y-1 w-1/2">
                <div>Current Balance:</div>
                <div>Total Money On-Ramped:</div>
                <div>Total Money Off-Ramped:</div>
                <div>Total Money Received From Other Users:</div>
                <div>Total Money Sent To Other Users:</div>
            </div>
            <div className="text-[#e08282] space-y-1 flex-1">
                <div>₹{(moneyStats.currentBalance/100).toFixed(2)}</div>
                <div>₹{(moneyStats.totalOnramped/100).toFixed(2)}</div>
                <div>₹{(moneyStats.totalOfframped/100).toFixed(2)}</div>
                <div>₹{(moneyStats.totalReceived/100).toFixed(2)}</div>
                <div>₹{(moneyStats.totalSent/100).toFixed(2)}</div>
            </div>
        </div>
    </div>
}
