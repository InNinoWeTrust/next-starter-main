"use client"; // This directive tells Next.js that this file should be rendered only on the client side.

import { ConnectButton } from "@thirdweb-dev/react";
import { useState } from "react";

// A simple page component to display the ConnectButton and a demo
const Page = () => {
  // Example state to demonstrate interaction with ConnectButton
  const [connected, setConnected] = useState(false);

  // A function to handle connection status change (this is just an example)
  const handleConnection = () => {
    setConnected(!connected);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Brown Waters Productions DAO DApp</h1>

      {/* ConnectButton from thirdweb */}
      <ConnectButton />

      {/* Example content that reacts to connection */}
      <div style={{ marginTop: "20px" }}>
        {connected ? (
          <p>You are connected! Welcome to the DAO.</p>
        ) : (
          <p>Please connect your wallet to get started.</p>
        )}

        {/* A button to simulate connection status change */}
        <button onClick={handleConnection} style={{ marginTop: "10px" }}>
          {connected ? "Disconnect" : "Simulate Connect"}
        </button>
      </div>
    </div>
  );
};

export default Page;





"use client";

import Image from "next/image";
import { useAddress, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";
import thirdwebIcon from "@public/brownwatersproductions Complete.svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const address = useAddress();
  const { contract: nftContract } = useContract("0xD81324D8a826F85eB73A2810bf54eBD80802604f", "nft-drop");
  const { contract: tokenContract } = useContract("0x429b958f74810902d90Ad85c5Ff200fefFCFDB08", "token");
  const { contract: voteContract } = useContract("0x19733aC20CEd46593E29Ac27230069A2F8df6A3b", "vote");

  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user owns the NFT
  useEffect(() => {
    const checkNFT = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const balance = await nftContract?.balanceOf(address);
        setHasNFT(balance?.gt(0) || false);
      } catch (error) {
        console.error("Error checking NFT ownership:", error);
        setError("Failed to check NFT ownership.");
      } finally {
        setLoading(false);
      }
    };
    checkNFT();
  }, [address, nftContract]);

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectWallet />
        </div>

        {address && (
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : hasNFT ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">Welcome, DAO Member!</h3>
                <VotingSection voteContract={voteContract} />
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  You do not own the Membership NFT. Purchase it with $BWP.
                </h3>
                <BuyNFTSection tokenContract={tokenContract} nftContract={nftContract} />
              </div>
            )}
          </div>
        )}

        <ThirdwebResources />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Brown Waters Productions{" "}
        <span className="text-zinc-300 inline-block mx-1"> Is </span>
        <span className="inline-block -skew-x-6 text-blue-500"> BrownWatersDAO </span>
      </h1>

      <p className="text-zinc-300 text-base">
        $BWP{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          Powers The Brown Waters Productions DAO
        </code>{" "}
        Ecosystem.
      </p>
    </header>
  );
}

// Buy NFT Section
function BuyNFTSection({ tokenContract, nftContract }) {
  const address = useAddress();

  return (
    <Web3Button
      contractAddress={nftContract.getAddress()}
      action={async () => {
        const price = ethers.utils.parseUnits("1", 18); // 1 BWP
        const quantity = 1;

        try {
          // Approve token spending
          await tokenContract.approve(nftContract.getAddress(), price);

          // Mint the NFT
          await nftContract.claimTo(address, quantity);
        } catch (error) {
          console.error("Error purchasing NFT:", error);
        }
      }}
    >
      Purchase Membership NFT with $BWP
    </Web3Button>
  );
}

// Voting Section
function VotingSection({ voteContract }) {
  const createProposal = async (description) => {
    try {
      await voteContract.createProposal(description);
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  const voteOnProposal = async (proposalId, voteType) => {
    try {
      await voteContract.vote(proposalId, voteType);
    } catch (error) {
      console.error("Error voting on proposal:", error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Participate in Voting</h3>

      <Web3Button
        contractAddress={voteContract.getAddress()}
        action={() => createProposal("Proposal Description")}
      >
        Create Proposal
      </Web3Button>

      <Web3Button
        contractAddress={voteContract.getAddress()}
        action={() => voteOnProposal("proposalId", 1)} // 1 for Yes, 0 for No
      >
        Vote Yes
      </Web3Button>
    </div>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="Brown Waters Productions Discord"
        href="https://discord.gg/qETmz5MpQ3"
        description="Brown Waters Productions Discord Server"
      />

      <ArticleCard
        title="Terms of Service"
        href="https://ipfs.io/ipfs/Qmah6dCA4RCg29ZMUQf2MqCtc7f7hnwitqseLUmju99xgQ?filename=TOS.pdf"
        description="Terms of Service for Brown Waters Productions App"
      />

      <ArticleCard
        title="Brown Waters Productions Privacy Policy"
        href="https://ipfs.io/ipfs/QmP6y8HJsozmXmwkDqAKVyGWvPjb3y7Mb9YPRUM45h3mvX?filename=Privacy%20Policy.pdf"
        description="Brown Waters Productions Privacy Policy"
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
