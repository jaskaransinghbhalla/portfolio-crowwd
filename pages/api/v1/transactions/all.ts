import prisma from "@/helpers/global";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all transactions
  const transactions = await prisma.transactions.findMany();
  return res.status(200).json(transactions);
}
