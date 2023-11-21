import React, { useState } from "react";
import AddComment from "./AddComment";
import "./CommentItem.css";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";

function CommentItem({ comment, addComment }) {
  const [isReplying, setIsReplying] = useState(false);
  
  

  function formatDate(createdAtString) {
    const dateObject = new Date(createdAtString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  // Checks if the comment is replied or not
  function isReplied(reply) {
    if (!reply || reply.length === 0) {
      return null;
    }

    return (
      <div>
        <div>
          {reply.map((r, i) => (
            <div key={i}>
              <CommentItem comment={r} addComment={addComment} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="commentItemContainer">
      <div className="commentNameDate">
        <p className="commentAuthorName">@{comment.user.username}</p> 
      <p className="commentDate">on {formatDate(comment.createdAt)}</p>
      </div>
      <div className="commentReplyContainer">
        <p className="commentContent">{comment.text}</p>
        {isReplying ? (
          <CloseIcon onClick={() => setIsReplying(false)}>Cancel</CloseIcon>
        ) : (
          <ReplyIcon onClick={() => setIsReplying(true)}>Reply</ReplyIcon>
        )}
      </div>
      <div className="repliedCommentsContainer">
        {isReplying && (
          <AddComment
            addComment={addComment}
            commentId={comment._id}
            setIsReplying={setIsReplying}
          />
        )}
      </div>
      <div style={{ padding: "1em" }}>{isReplied(comment.replies)}</div>
    </div>
  );
}

export default CommentItem;
