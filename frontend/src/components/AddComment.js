import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./AddComment.css";
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddComment({ addComment, commentId, setIsReplying }) {
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  let token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Adds comments
  async function handleComment() {
    if (comment.trim() === "") {
      return;
    }
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
    <div className="addCommentContainer">
      <div className="addCommentInputEmoji">
        <div className="inputContainer">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            className="addCommentInput"
            placeholder="write a comment..."
          />
          <div className="emojiButtonContainer">
            <EmojiEmotionsIcon
              style={{ color: "rgb(218, 218, 218)", fontSize: "30" }}
              onClick={() => {
                console.log("Before setShowEmoji");
                setShowEmoji(!showEmoji);
                console.log("after setShowEmoji");
              }}
            >
              {showEmoji ? "Hide" : "Show"}
            </EmojiEmotionsIcon>
          </div>
        </div>
        {showEmoji && (
          <div className="emojiPickerContainer">
            <Picker data={data} onEmojiSelect={addEmoji} />
          </div>
        )}
      </div>
      {!token ? (
        <div>
          <Button
            style={{
              backgroundColor: "rgb(218, 218, 218)",
              color: "#333",
              borderRadius: "10px",
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              height: "5vh",
              fontSize: "0.9em",
              textTransform: "capitalize",
              fontFamily: "Lora"
            }}
            onClick={() => {
              handleClick();
            }}
          >
            Comment
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              You have to sign in first.
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <Button
          style={{
            backgroundColor: "rgb(218, 218, 218)",
            color: "#333",
            borderRadius: "10px",
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            height: "5vh",
            fontSize: "0.9em",
            textTransform: "capitalize",
            fontFamily: "Lora"
          }}
          onClick={() => {
            handleComment();
          }}
        >
          Comment
        </Button>
      )}
    </div>
  );
}

export default AddComment;
