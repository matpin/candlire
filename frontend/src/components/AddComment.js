import React, { useState } from 'react';

function AddComment({ addComment, commentId, setIsReplying }) {
    const [comment, setComment] = useState("");

    async function handleComment() {
        await addComment(comment, commentId);
        setComment("");
        if (commentId) {
          setIsReplying(false);
        }
    }

  return (
    <div>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleComment}>Comment</button>
    </div>
  )
}

export default AddComment;