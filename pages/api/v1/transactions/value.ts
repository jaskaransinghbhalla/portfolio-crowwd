// Imports
import prisma from "@/helpers/global";
import { Transaction } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";
import { ValueTimeObject } from "@/types/types";

// A function to calculate the time in hours and minutes
function calculateTime(date: Date) {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  } else {
    return `${hours}:${minutes}`;
  }
}

// A function to calculate the total value of the current holdings at a given time or transaction
function totalValue(currHoldings: any, transactions: Transaction[]) {
  let value = 0;
  for (const key in currHoldings) {
    // if (Object.prototype.hasOwnProperty.call(currHoldings, key)) {
    const element = currHoldings[key];
    value += element.currShares * element.currValue;
    // }
  }
  return value;
}

function getValueTimeData(transactions: any[]) {
  // Initialize the current value, shares, and holdings
  let currValue: any = {};
  let currShares: any = {};
  let currHoldings: any = {};
  let ValueTimeArr: ValueTimeObject[] = [];
  // Calculations
  for (let i = 0; i < transactions.length; i++) {
    // CurrValue is the current value of the asset after the transaction
    currValue[transactions[i].assetid] = transactions[i].price;

    // CurrShares is the current number of shares of the asset after the transaction
    // Bought
    if (transactions[i].action === "Buy") {
      if (currShares[transactions[i].assetid] === undefined) {
        currShares[transactions[i].assetid] = transactions[i].shares;
      } else {
        currShares[transactions[i].assetid] =
          currShares[transactions[i].assetid] + transactions[i].shares;
      }
    }
    // Sold
    else if (transactions[i].action === "Sell") {
      if (currShares[transactions[i].assetid] === undefined) {
        currShares[transactions[i].assetid] = -transactions[i].shares;
      } else {
        currShares[transactions[i].assetid] =
          currShares[transactions[i].assetid] - transactions[i].shares;
      }
    }
    // Curr Holdings Object
    currHoldings[transactions[i].assetid] = {
      assetid: transactions[i].assetid,
      currShares: currShares[transactions[i].assetid],
      currValue: currValue[transactions[i].assetid],
    };

    // Calculate the total value of the current holdings
    let value = totalValue(currHoldings, transactions) || 0;

    // Add the current value and time to the ValueTimeArr
    ValueTimeArr.push({
      value: value,
      time: calculateTime(new Date(transactions[i].createdat)),
    });
  }
  return ValueTimeArr;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all transactions
  const transactions = await prisma.transactions.findMany();
  // Get the value-time data from transactions
  const data = getValueTimeData(transactions);
  return res.status(200).json(data);
}
