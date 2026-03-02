import { useState } from "react";
import styled from "styled-components";
import { Copy, Check } from "lucide-react";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const CopyButton = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Button onClick={handleCopy} title={copied ? "Copied!" : "Copy link"}>
      {copied ? <Check size={14} color="#2e8b57" /> : <Copy size={14} color="#666" />}
    </Button>
  );
};

export default CopyButton;
