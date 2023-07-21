import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import styles from "./commentFunction.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import PopupPage from "./PopupPage";

export default function CommentFunction({ demand }) {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
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
          import.meta.env.VITE_BACKEND_URL
        }/comments`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            DemandId: demand.Id,
            UserId: user.Id,
          }),
        }
      );
      reset();
      
      const data = await response.json();
      console.log(data);
      setComments([...comments, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className={styles.commentPost} onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("Comment")}
          type="text"
          name="Comment"
          placeholder="Donne ton avis sur cette décision à prendre"
          required
        />
        <button className={styles.commentButton} type="submit">
          Submit
        </button>
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
