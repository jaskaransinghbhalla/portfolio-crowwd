import prisma from "@/helpers/global";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the Category as a query parameter or take default value as "sector"
  const category: string =
    req.query.category?.toString().toLowerCase() || "sector";

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

  // Calculate the net shares, shares bought and shares sold
  const asset_details = assetwise_transactions.map((asset) => {
    const asset_transactions = asset.transactions;
    let bought: number = 0;
    let sold: number = 0;
    for (let i = 0; i < asset_transactions.length; i++) {
      let transaction = asset_transactions[i];
      if (transaction.action === "Buy") {
        bought += transaction.shares;
      } else if (transaction.action === "Sell") {
        sold += transaction.shares;
      }
    }
    let net_shares = bought - sold;

    // Calculate the value of the asset
    // Get the price from the currValue array
    let price: number | null = currValue.filter(
      (item) => item.assetid === asset.id
    )[0].price;
    // Calculate the value of the asset
    let value = net_shares * (price ?? 0);
    // Return the result
    const asset_props = {
      assetid: asset.id,
      assetclass: asset.assetclass,
      country: asset.country,
      sector: asset.sector,
      shares: net_shares,
      value: value,
    };
    return asset_props;
  });

  // Calculate the composition of the assets which is the problem statement
  const output: any = [];
  for (let i = 0; i < asset_details.length; i++) {
    let asset = asset_details[i];
    let categoryValue: any = "";
    if (category === "sector") {
      categoryValue = asset["sector"];
    } else if (category === "country") {
      categoryValue = asset["country"];
    } else if (category === "assetclass") {
      categoryValue = asset["assetclass"];
    }

    // Calculation the value of each category
    let index = output.findIndex((x: any) => x.category === categoryValue);
    if (index === -1) {
      output.push({
        category: categoryValue,
        value: asset.value,
      });
    } else {
      output[index].value += asset.value;
    }
  }

    // Calculate the composition

  // -------------------------------------

  // If the value is negative, set it to 0, to see composition ignoring negative values
  // output.forEach((r: any) => {
  //   if (r.value < 0) {
  //     r.value = 0;
  //   }
  // });

  // -------------------------------------

  //  If the value is negative, make it positive, to see composition considering negative values as positive
  output.forEach((r: any) => {
    if (r.value < 0) {
      r.value = r.value * -1;
    }
  });

  // -------------------------------------

  // Calculate the total value of the assets
  let totalValue = 0;
  for (let i = 0; i < output.length; i++) {
    let item = output[i];
    totalValue = item.value + totalValue;
  }
  // Calculating the Composition and returning the final output object
  let finaloutput = output.map((element: any) => {
    let composition = Math.round((element.value / totalValue) * 100);
    return {
      category: element.category,
      value: element.value,
      composition: composition,
    };
  });
  return res.status(200).json(finaloutput);
}
