import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

export default function CommentFunction({ demand }) {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
          }/comments/${demand.Id}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [demand.Id]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/comments`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            DemandId: demand.Id,
            UserId: userId,
          }),
        }
      );

      reset();

      const data = await response.json();
      setComments([...comments, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("Comment")}
          type="text"
          name="Comment"
          placeholder="Donne ton avis sur cette décision à prendre"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.Id}>
          <h5>
            {comment.Lastname} {comment.Firstname}
          </h5>
          <p>{comment.Comment}</p>
        </div>
      ))}
    </>
  );
}

CommentFunction.propTypes = {
  demand: PropTypes.shape({
    Id: PropTypes.number.isRequired,
  }).isRequired,
};
