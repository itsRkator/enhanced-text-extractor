// app/page.tsx
"use client"
import FileUpload from "./components/FileUpload";

const Page: React.FC = () => {
  return (
    <div>
      <h1>Enhanced Text Extractor</h1>
      <FileUpload />
    </div>
  );
};

export default Page;
