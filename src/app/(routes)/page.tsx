
import { CardSumarry } from "./components/CardSummary";
import { BookOpenCheck, UserRound, Waypoints } from "lucide-react";
import { LastCustomer } from "./components/lastCustomers";
import { SalesDistribution } from "./components/salesdistributor";
import { TotalSuscribers } from "./components/totalSuscribers";
import { ListIntegrations } from "./components/ListIntegrations";

const cardData = [
  {
    icon: UserRound,
    total: "12.452",
    average: 15,
    title: "Companies Created",
    tooltipText: "See all of the companies created",
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total Revenue",
    tooltipText: "See all of the summary",
  },
  {
    icon: BookOpenCheck,
    total: "363,95dls",
    average: 30,
    title: "Bounce Rate",
    tooltipText: "See all of the Bounce rate",
  },
];

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid gap-x-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg-gap-x-20">
        {cardData.map((card, index) => (
          <CardSumarry
            key={index}
            icon={card.icon}
            total={card.total}
            average={card.average}
            title={card.title}
            tooltipText={card.tooltipText}
          />
        ))}
      </div>
      <div className="grid gap-x-2 grid-cols-1 xl:grid-cols-2 md:gap-x-41 mt-12">
        <LastCustomer/>
        <SalesDistribution/>
      </div>
      <div className="flex-col md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
          <TotalSuscribers/>
          <ListIntegrations/>
      </div>
    </div>
  );
}
