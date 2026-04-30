import { useState } from "react";

export default function CopyableId({ id }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(id).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            title="Click to copy full ID"
            className={`font-mono text-[11px] border rounded px-2 py-0.5 max-w-[180px] truncate cursor-pointer transition-all duration-150
                ${copied
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                }`}
        >
            {copied ? "✓ Copied!" : `${id.slice(-14)}…`}
        </button>
    );
}