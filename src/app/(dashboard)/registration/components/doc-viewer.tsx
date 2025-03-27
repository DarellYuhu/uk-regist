import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export const DocViewerYuhu = ({ uri }: { uri: string }) => {
  return (
    <DocViewer
      prefetchMethod="GET"
      documents={[
        {
          uri,
          fileType: "pdf",
        },
      ]}
      pluginRenderers={DocViewerRenderers}
    />
  );
};
