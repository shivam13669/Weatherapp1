import { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import { createServer } from "../server";

const app = serverless(createServer());

export default async (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
