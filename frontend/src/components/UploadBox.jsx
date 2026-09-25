function UploadBox({ handleDrop, handleFile, fileInputRef }) {
  return (
    <div
      className="w-50 h-50 flex items-center justify-center border cursor-pointer"
      onClick={() => fileInputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h1>Upload a PDF file</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

export default UploadBox;
