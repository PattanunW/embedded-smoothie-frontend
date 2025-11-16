import { useState } from "react";

export default function ExpandableComment({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  let maxLength = 25;

  const shortText =
    text.length > maxLength
      ? text.slice(0, text.lastIndexOf(" ", maxLength))
      : text;

  const ff = isExpanded ? "flex-col items-start" : "";

  return (
    <div className={`flex gap-2 ${ff}`}>
      <p className="text-black">{isExpanded ? text : shortText}</p>
      {!isExpanded ? (
        <div>
          {text.length > maxLength && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-600 text-[12px] hover:underline"
            >
              show more...
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 text-[12px] hover:underline"
        >
          show less...
        </button>
      )}
    </div>
  );
}
