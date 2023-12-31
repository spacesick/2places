import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "../../../../keelClient";
import { client } from "../../../client"

export async function POST(req: NextRequest) {
  console.log(req);
  const { email, password } = await req.json();
  const auth = await client.api.mutations.authenticate({
    emailPassword: {
      email,
      password,
    },
    createIfNotExists: true,
  });

  console.log(auth);

  if (auth.error) {
    // TODO: handle errors
    console.log(auth.error);
    return
  }

  if (auth.data.identityCreated) {
    client.client.setToken(auth.data.token);
    const user = await client.api.mutations.createUser({
      name: email.split("@")[0],
      role: UserRole.Vendor,
    });

    if (user.error) {
      console.log(user.error);
      return
    }

    return new NextResponse(JSON.stringify({
      success: true,
      message: "user successfully created",
    }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${auth.data.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000;`,
      },
    });
  }

  return
}
