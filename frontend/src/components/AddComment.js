import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function AddComment({ addComment, commentId, setIsReplying }) {
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  // Adds comments
  async function handleComment() {
    await addComment(comment, commentId);
    setComment("");
    if (commentId) {
      setIsReplying(false);
    }
  }

  // Sets emoji
  const addEmoji = (emoji) => {
    setComment(comment + emoji.native);
  };

  // Adds comment when enter clicked 
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleComment();
    }
  }

  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <EmojiEmotionsIcon
        style={{ color: "#CCCC00" }}
        onClick={() => setShowEmoji(!showEmoji)}
      >
        {showEmoji ? "Hide" : "Show"}
      </EmojiEmotionsIcon>
      {showEmoji && <Picker data={data} onEmojiSelect={addEmoji} />}
      <button onClick={handleComment}>Comment</button>
    </div>
  );
}

export default AddComment;
