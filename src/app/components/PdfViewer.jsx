import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer({ fileUrl }) {
const defaultLayoutPluginInstance = defaultLayoutPlugin({
  sidebarTabs: () => [], // removes bookmarks, thumbnails, attachments entirely
});
  return (
<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
  <div style={{ height: "750px", borderRadius: "10px", overflow: "hidden" }}>        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} defaultScale={0.9}/>
      </div>
    </Worker>
  );
}