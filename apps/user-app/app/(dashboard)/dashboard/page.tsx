import { MoneyStats, UserDetails } from "./types"
import { getMoneyStats, getUserDetails } from "./logic"
import { UserDetailsCard } from "../../../components/UserDetailsCard";
import { MoneyStatsCard } from "../../../components/MoneyStatsCard";

export default async function () {
    const details: UserDetails = await getUserDetails();
    const stats: MoneyStats = await getMoneyStats();

    return <div className="w-screen">
        <div className="m-8 space-y-8">
            <UserDetailsCard userDetails={details} />
            <MoneyStatsCard moneyStats={stats} />
        </div>
    </div>
}
