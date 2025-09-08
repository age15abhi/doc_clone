import React from "react";
import EditorPage from "./editor";
import Toolbar from "./toolbar";

interface DocumentsIdPageProps {
  params: Promise<{ documentsid: string }>;
}

async function DocumentsIdPage({ params }: DocumentsIdPageProps) {
  const awaitedParams = await params;
  const documentId = awaitedParams.documentsid;

  console.log("documentId", documentId);

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      {/* ================ TOOLBAR AND EDITOR ================== */}

      <Toolbar />

      <EditorPage />
      {/* ====================================================== */}
    </div>
  );
}

export default DocumentsIdPage;
