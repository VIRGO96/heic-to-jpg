import { useState } from "react";
import heic2any from "heic2any";

export default function HeicToJpgConverter() {
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    if (selectedFile && selectedFile.type === "image/heic" || selectedFile && selectedFile.type === "image/heif") {
      setFile(selectedFile);
      convertToJpg(selectedFile);
    } else {
      alert("Please select a valid HEIC file.");
    }
  };

  const convertToJpg = async (heicFile) => {
    try {
      const blob = await heic2any({
        blob: heicFile,
        toType: "image/jpeg",
        quality: 1,
      });
      const jpgUrl = URL.createObjectURL(blob);
      setConvertedUrl(jpgUrl);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert HEIC to JPG");
    }
  };

  const downloadJpg = () => {
    if (convertedUrl) {
      const link = document.createElement("a");
      link.href = convertedUrl;
      link.download = "converted.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <input type="file" accept=".heic" onChange={handleFileChange} />
      {convertedUrl && (
        <div className="flex flex-col items-center">
          <img src={convertedUrl} alt="Converted Preview" className="w-64 h-auto" />
          <button onClick={downloadJpg} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Download JPG</button>
        </div>
      )}
    </div>
  );
}
