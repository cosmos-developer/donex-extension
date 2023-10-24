import { createClient } from "../client-ts";
const client = await createClient();

chrome.runtime.sendMessage({
  type: "createClient",
  payload: client,
});
