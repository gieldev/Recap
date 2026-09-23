import { Document, Page } from "react-pdf";

function ContentBox({ file, setNumPages }) {
  return (
    <div className="border">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />

        <Page
          pageNumber={2}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}

export default ContentBox;
