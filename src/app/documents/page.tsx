import Link from "next/link";
import React from "react";

function DocumentsPage() {
  return (
    <div>
      Click{" "}
      <span className="text-blue-500 underline cursor-pointer">
        {" "}
        <Link href={"/documents/123"}>here</Link>
      </span>{" "}
      to go to the specific link
    </div>
  );
}

export default DocumentsPage;
