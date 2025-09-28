import React from "react";
import EditorPage from "./editor";
import Toolbar from "./toolbar";
import { Navbar } from "./navbar";

interface DocumentsIdPageProps {
  params: Promise<{ documentsid: string }>;
}

async function DocumentsIdPage({ params }: DocumentsIdPageProps) {
  const awaitedParams = await params;
  const documentId = awaitedParams.documentsid;

  console.log("documentId", documentId);

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex  flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 z-10 bg-[#FAFBFD] print:hidden w-full">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <EditorPage />
      </div>
    </div>
  );
}

export default DocumentsIdPage;
