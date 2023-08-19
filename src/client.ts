import { APIClient } from "../keelClient";

export const client = new APIClient({
  baseUrl: process.env.API_BASE_URL!,
});
