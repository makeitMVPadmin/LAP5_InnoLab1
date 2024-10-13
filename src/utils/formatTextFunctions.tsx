export function formatTextSections(text: String) {
  const sections = text.split(/(?=\w+:)/);

  const formattedSections = sections.map((section, index) => {
    const lines = section.split("\n").filter((line) => line.trim() !== "");
    const title = lines[0].trim();
    const listItems = lines.slice(1).map((line, idx) => {
      const trimmedLine = line.trim();
      // If the line starts with a hyphen, keep it as is; otherwise, prepend a hyphen
      const listItem = trimmedLine.startsWith("-")
        ? trimmedLine
        : `- ${trimmedLine}`;
      return <li key={`item-${index}-${idx}`}>{listItem}</li>;
    });

    return (
      <div key={`section-${index}`}>
        <strong>{title}</strong>
        <ul>{listItems}</ul>
      </div>
    );
  });

  return formattedSections;
}
