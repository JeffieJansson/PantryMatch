import styled from "styled-components";
import { Share2 } from "lucide-react";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const CopyButton = ({ url, title }) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: title || "Check out this recipe!",
        url,
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      title="Share recipe"
      aria-label="Share recipe"
    >
      <Share2 size={14} color="#131313" />
    </Button>
  );
};

export default CopyButton;
