import { SidebarItem } from "../../components/SidebarItem";
import { HomeIcon, HistoryIcon, TransferIcon, SendMoneyIcon } from "../../components/Icons";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
        <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
            <div>
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Dashboard" />
                <SidebarItem href={"/ramping_history"} icon={<HistoryIcon />} title="Ramping History" />
                <SidebarItem href={"/transfer_history"} icon={<TransferIcon />} title="Transfer History" />
                <SidebarItem href={"/p2p"} icon={<SendMoneyIcon />} title="P2P Transfer" />
            </div>
        </div>
            {children}
    </div>
  );
}
