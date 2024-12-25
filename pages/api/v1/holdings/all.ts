import prisma from "@/helpers/global";
import { NextApiRequest, NextApiResponse } from "next";

// Get Latest Price Alternative, multiple database calls
// async function getLatestPrices() {
//   const latestTimestamps = await prisma.transactions.groupBy({
//     by: ["assetid"],
//     _max: {
//       createdat: true,
//     },
//     orderBy: {
//       assetid: "asc",
//     },
//   });
//   const latestTimestampDetails = await Promise.all(
//     latestTimestamps.map(async (group) => {
//       const {
//         assetid,
//         _max: { createdat },
//       } = group;
//       const transaction = await prisma.transactions.findFirst({
//         where: {
//           assetid,
//           createdat,
//         },
//         select: {
//           assetid: true,
//           price: true,
//           createdat: true,
//           action: true,
//         },
//       });
//       return transaction;
//     })
//   );

//   return latestTimestampDetails;
// }

// Get Latest Price Calculated
async function getLatestPrices() {
  // Get all the assets with their transactions
  const assetwise_transactions = await prisma.assets.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      transactions: true,
    },
  });

  // Calculate the current value of the assets by getting the latest transaction timestamp for each assetid and then getting the price of that transaction
  const currValue = assetwise_transactions.map((asset) => {
    const asset_transactions = asset.transactions;
    let maxD: Date = new Date(0);
    let max_transaction = asset_transactions[0];
    for (let i = 0; i < asset_transactions.length; i++) {
      let transaction = asset_transactions[i];
      const d: Date | null = transaction.createdat ?? new Date(0);
      if (d > maxD) {
        maxD = d;
        max_transaction = asset_transactions[i];
      }
    }
    const result = {
      assetid: asset.id,
      price: max_transaction.price,
    };
    return result;
  });
  return currValue;
}

// Shares bought prisma query alternative from visual function
async function sharesBougth() {
  const sharesBought = await prisma.transactions.groupBy({
    by: ["assetid"],
    where: {
      action: "Buy",
    },
    _sum: {
      shares: true,
    },
    orderBy: {
      assetid: "asc",
    },
  });
  return sharesBought;
}
// Shares sold prisma query alternative from visual function
async function sharesSold() {
  const sharesBought = await prisma.transactions.groupBy({
    by: ["assetid"],
    where: {
      action: "Sell",
    },
    _sum: {
      shares: true,
    },
    orderBy: {
      assetid: "asc",
    },
  });
  return sharesBought;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Calculations
  const priceData = await getLatestPrices();
  const shares_bought = await sharesBougth();
  const shares_sold = await sharesSold();

  const shares: [number, number][] = [];

  // Calculate the net shares, shares bought and shares sold
  shares_bought.forEach((bought) => {
    shares.push([bought.assetid, bought._sum.shares || 0]);
  });
  shares_sold.forEach((sold) => {
    const index = shares.findIndex(
      (share: [number, number]) => share[0] === sold.assetid
    );
    shares[index][1] = shares[index][1] - (sold._sum.shares || 0);
  });

  // Get all the asset tickers
  const assets = await prisma.assets.findMany({
    select: {
      id: true,
      ticker: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  // Calculate the value of the assets in object assetwise
  const result = shares.map((share: [number, number]) => {
    const asset = assets.find((a) => a.id === share[0]);
    const price =
      priceData.find((p: any) => p.assetid === share[0])?.price || 0;

    return {
      asset: asset?.ticker,
      value: share[1] * price,
    };
  });

  // Calculate the composition

  // -------------------------------------

  // If the value is negative, set it to 0, to see composition ignoring negative values
  // result.forEach((r: any) => {
  //   if (r.value < 0) {
  //     r.value = 0;
  //   }
  // });
  // -------------------------------------

  //  If the value is negative, make it positive as we have to calculate the composition
  result.forEach((r: any) => {
    if (r.value < 0) {
      r.value = r.value * -1;
    }
  });

  // -------------------------------------

  // Calculate the total value of the assets
  let totalSum = 0;
  result.forEach((r: any) => {
    totalSum += r.value;
  });

  // Calculate the composition of the assets
  result.forEach((r: any) => {
    r.composition = Math.round((r.value / totalSum) * 100);
  });
  return res.status(200).json(result);
}
