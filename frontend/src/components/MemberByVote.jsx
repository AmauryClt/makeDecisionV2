import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./popupPage.module.scss";

export default function MemberByVote({ demandId }) {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/notesDemands/${demandId}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [demandId]);

  return (
    <div className={styles.pBorderexeption}>
      {userDetails.length === 0 ? (
        <h1 className={styles.h1title}>Soit le premier à voter !</h1>
      ) : (
        userDetails.map((user) => (
          <div key={user.Id}>
            <p>
              {user.Lastname} {user.Firstname}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

MemberByVote.propTypes = {
  demandId: PropTypes.shape({
    Id: PropTypes.number.isRequired,
  }).isRequired,
};
