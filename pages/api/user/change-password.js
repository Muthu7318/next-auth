import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "@/lib/db";
import { hashpassword, verifyPassword } from "@/lib/auth";

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

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqaul = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqaul) {
    res.status(403).json({
      status: "failure",
      message: "your old password is wrong",
    });
    client.close();
    return;
  }

  const hashedPassword = await hashpassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  client.close();
  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
}

export default handler;
