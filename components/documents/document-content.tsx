type DocumentContentProps = {
  html: string;
};

export function DocumentContent({
  html,
}: DocumentContentProps) {
  return (
    <div className="overflow-x-auto">
      <article
        className="document-content"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}