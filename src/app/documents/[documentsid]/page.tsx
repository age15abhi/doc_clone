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

 {/* ================ NAVBAR ================== */}
 <div className="fixed top-0 left-0 right-0 z-50">
  Navbar come here
 </div>

  {/* ================ TOOLBAR AND EDITOR ================== */}

  <div className="fixed top-[48px] h-[48px] left-0 right-0 z-40 flex items-center px-4 shadow-sm">
    <Toolbar />
  </div>

  <div className="pt-[96px]">
    <EditorPage />
  </div>

  {/* ====================================================== */}
</div>

  );
}

export default DocumentsIdPage;
