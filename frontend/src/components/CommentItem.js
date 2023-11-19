import React, { useState } from "react";
import AddComment from "./AddComment";

function CommentItem({ comment, addComment }) {
  const [isReplying, setIsReplying] = useState(false);

  // Checks if the comment is replied or not
  function isReplied(reply) {
    if (!reply || reply.length === 0) {
      return null;
    }

    return (
      <div>
        {reply.map((r, i) => (
          <div key={i}>
            <CommentItem comment={r} addComment={addComment} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>{comment.text}</p>
      {isReplying ? (
        <button onClick={() => setIsReplying(false)}>Cancel</button>
      ) : (
        <button onClick={() => setIsReplying(true)}>Reply</button>
      )}
      <div>
      {isReplying && <AddComment addComment={addComment} commentId={comment._id} setIsReplying={setIsReplying} />}
      </div>
      <div style={{padding: "1em"}}>
      {isReplied(comment.replies)}
      </div>
      
    </div>
  );
}

export default CommentItem;
