import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      status: "failure",
      message: "Not Authenticated",
    });
    return;
  }
}

export default handler;
