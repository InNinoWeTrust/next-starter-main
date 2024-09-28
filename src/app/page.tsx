"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/brownwatersproductions Complete.svg";
import { client } from "./client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useContract } from "@thirdweb-dev/react";

export default function Home() {
  const [contract, setContract] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract on component mount
  useEffect(() => {
    const initializeContract = async () => {
      try {
        const newContract = await getContract({
          client,
          chain: defineChain(137), // Polygon chain ID
          address: "0x429b958f74810902d90Ad85c5Ff200fefFCFDB08", // Replace with your contract address
        });
        setContract(newContract);
      } catch (err) {
        console.error("Failed to load contract:", err);
        setError("Failed to load contract.");
      }
    };

    initializeContract();
  }, []);

  // Fetch data from contract function
  const fetchData = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      // Replace with actual function you need to call
      const result = await contract.call(getContract);
      setData(result);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data from contract.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchData(); // Automatically fetch data when contract is loaded
    }
  }, [contract]);

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Brown Waters Productions App",
              url: "https://linktr.ee/brownwatersdao",
            }}
          />
        </div>

        {loading && <p className="text-zinc-300">Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {data && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Fetched Data:</h2>
            <pre className="bg-zinc-800 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
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
        alt="Brown Waters Productions Logo"
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Brown Waters Productions{" "}
        <span className="text-zinc-300 inline-block mx-1">Is</span>{" "}
        <span className="inline-block -skew-x-6 text-blue-500">
          BrownWatersDAO
        </span>
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

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="Brown Waters Productions Discord"
        href="https://discord.gg/qETmz5MpQ3"
        description="Join our Discord community!"
      />

      <ArticleCard
        title="Terms of Service"
        href="https://ipfs.io/ipfs/Qmah6dCA4RCg29ZMUQf2MqCtc7f7hnwitqseLUmju99xgQ?filename=TOS.pdf"
        description="Read our Terms of Service"
      />

      <ArticleCard
        title="Privacy Policy"
        href="https://ipfs.io/ipfs/QmP6y8HJsozmXmwkDqAKVyGWvPjb3y7Mb9YPRUM45h3mvX?filename=Privacy%20Policy.pdf"
        description="Review our Privacy Policy"
      />
    </div>
  );
}

function ArticleCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </a>
  );
}
