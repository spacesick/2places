import { NextRequest, NextResponse } from "next/server";
import { APIClient, UserRole } from "../../../../keelClient";
import { CreatePlaceFormData } from "@/app/create/CreatePlaceForm";
// import { client } from "../../../client"


export async function POST(req: NextRequest) {
  const client = new APIClient({
    baseUrl: process.env.API_BASE_URL!,
    headers: {
      Authorization: `Bearer ${req.cookies.get("token")}`,
    },
  });

  console.log(`cookie ${req.cookies.get("token")}`)

  client.client.setToken(req.cookies.get("token")!.value);

  console.log(req);
  const body: CreatePlaceFormData = await req.json();
  const self = await client.api.queries.getSelf();
  if (self.error) {
    // TODO: handle errors
    console.log("SELF ERR")
    console.log(self.error);
    return
  }
  console.log(self.data!)
  if (self.data!.role !== UserRole.Vendor) {
    return new NextResponse(JSON.stringify({
      success: false,
      message: "user is not a vendor",
    }), {
      status: 403,
    });
  }
  const place = await client.api.mutations.createPlace({
    owner: {
      id: self.data!.id,
    },
    name: body.name,
    description: body.description,
    latitude: 10.0,
    longitude: 10.0,
  });

  if (place.error) {
    console.log("PLACE ERR")
    console.log(place.error);
    return
  }

  return new NextResponse(JSON.stringify({
    success: true,
    message: "place successfully created",
  }), {
    status: 200,
  });
}
