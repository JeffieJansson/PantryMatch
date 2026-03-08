import styled from "styled-components";
import { IoShareOutline } from "react-icons/io5";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const ShareButton = ({ url, title }) => {
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
      <IoShareOutline size={20} color="#010333" />
    </Button>
  );
};

export default ShareButton;
