import {
  cardItemList,
  chatList as chatListItems,
  homeCards,
  serviceList,
} from "@/constants";
import DashboardCard from "./DashboardCard";
import StatusCard from "./StatusCard";
import ChatCard from "./ChatCard";
import { getUser } from "@/lib/session";
import { getCurrentFormattedDate } from "@/utils/helpers";

export async function HomeCards() {
  const user = await getUser();
  const currentDate = getCurrentFormattedDate();
  return (
    <>
      <div className="card-row mt-10 mx-2 sm:mx-8 flex gap-6 flex-wrap lg:flex-nowrap">
        {homeCards.map((item, index) => {
          if (index === 0) {
            return (
              <DashboardCard
                key={index}
                type={"welcome"}
                className="pt-4"
                imgURL={"/images/welcome.png"}
                heading={`Hey ${user?.firstName}`}
                description={currentDate}
                buttonText={"Make appointment"}
                buttonLink="/"
              />
            );
          }
          return (
            <DashboardCard
              key={index}
              type={item.type}
              className="pt-4"
              imgURL={item.imgURL}
              heading={item.heading}
              description={item.description}
              buttonText={item.buttonText}
              buttonLink="/"
            />
          );
        })}
      </div>
      <div className="card-row mt-6 mx-2 sm:mx-8 flex gap-6 flex-wrap lg:flex-nowrap">
        <StatusCard />
        <DashboardCard
          type="cardwithlist"
          heading="Recent Files"
          buttonText="View all"
          buttonLink="/"
          itemList={cardItemList}
        />
      </div>
      <div className="card-row mt-6 mx-2 sm:mx-8 flex gap-6 flex-wrap lg:flex-nowrap">
        <ChatCard
          heading="Chats"
          buttonText="View all chats"
          buttonLink="/"
          chatList={chatListItems}
        />
        <DashboardCard
          type="cardwithlist"
          heading="Service List"
          buttonText="View all services"
          buttonLink="/"
          itemList={serviceList}
        />
      </div>
    </>
  );
}
