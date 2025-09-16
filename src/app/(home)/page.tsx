import React from "react";
import Link from "next/link";

import { Navbar } from "./navbar";

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        Click{" "}
        <span className="text-blue-500 underline cursor-pointer ">
          {" "}
          <Link href={"/documents/123"}>here</Link>
        </span>{" "}
        to go to the specific link
      </div>
    </div>
  );
}

export default Home;
