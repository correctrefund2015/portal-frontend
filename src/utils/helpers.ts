export function getCurrentFormattedDate() {
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

export const formattedTimestamp = (date: string) => {
  const dateObj = new Date(date);

  // Format the date using the desired format
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

export const formattedDateShort = (date: string) => {
  const dateObj = new Date(date);

  // Format the date using the desired format
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

export const formatUsdAmount = (amount: number) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(amount);
};
