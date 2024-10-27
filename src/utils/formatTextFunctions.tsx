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


export const formatStringToNumberedList = (text: string): JSX.Element => {
  const items = text
    .split(/(?:\r?\n|\s*-\s*|\d+[.)-]\s*)/)
    .filter(item => item.trim().length > 0);

  return (
    <ol className="list-decimal space-y-2 pl-4 mt-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="font-poppins leading-relaxed pl-2" // Added pl-2 for better alignment
        >
          {item.trim()}
        </li>
      ))}
    </ol>
  );
};


interface NumberedListOptions {
  spacing?: string;
  padding?: string;
  fontSize?: string;
  fontFamily?: string;
  textColor?: string;
  counterStyle?: 'decimal' | 'decimal-leading-zero' | 'roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha';
}

export const formatStringToNumberedListWithOptions = (
  text: string,
  options: NumberedListOptions = {}
): JSX.Element => {
  console.log(text);
  const {
    spacing = 'space-y-4',
    padding = 'pl-4',
    fontSize = 'text-base',
    fontFamily = 'font-poppins',
    textColor = 'text-gray-900',
    counterStyle = 'decimal'
  } = options;

  // Split by newlines, hyphens, or number patterns
  const cleanedText = text.replace(/^[\s\n]*-\s*/, '');

  // Then split on standalone hyphens that start with a newline or space
  const items = cleanedText
    .split(/(?:\r?\n\s*|\s+)-\s+/)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return (
    <ol
      className={`${spacing} ${padding} ${fontSize} ${textColor} list-${counterStyle}`}
      style={{ counterReset: 'item' }} // Ensures counting starts at 1
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`${fontFamily} leading-relaxed pl-2`}
          style={{ counterIncrement: 'item' }}
        >
          {item.trim()}
        </li>
      ))}
    </ol>
  );
};
