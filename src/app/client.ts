// Import necessary functions from thirdweb
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Create the client using your Client ID (you get this from Thirdweb Dashboard)
const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID"  // Replace with your actual client ID
});

// Connect to your contract on the Polygon chain (Chain ID 137)
const contract = getContract({
  client,
  chain: defineChain(137),  // Polygon Chain ID is 137
  address: "0x429b958f74810902d90Ad85c5Ff200fefFCFDB08"  // Replace with your contract address
});

export { client, contract };
