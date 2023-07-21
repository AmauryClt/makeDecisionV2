import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import styles from "./profil.module.scss";
import Button from "./Button";

export default function PageAdmin() {
  const { register, handleSubmit } = useForm();
  const [selectedValues, setSelectedValues] = useState([]);
  const onSubmit = (data) => {
    const mapServiceToValue = (service) => {
      switch (service) {
        case serviceValues.ADMINISTRATIF:
          return "5";
        case serviceValues.COMPTABILITE:
          return "2";
        case serviceValues.MARKETING:
          return "3";
        case serviceValues["RESSOURCES HUMAINES"]:
          return "4";
        case serviceValues.COMMERCIAL:
          return "1";
        default:
          return "0";
      }
    };

    const numericValues = selectedValues.map((service) =>
      mapServiceToValue(service)
    );
    data.ServiceImpact = numericValues.join(",");

    console.info(data);

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.info(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const serviceValues = {
    ADMINISTRATIF: "1",
    COMPTABILITE: "2",
    MARKETING: "3",
    "RESSOURCES HUMAINES": "4",
    COMMERCIAL: "5",
  };

  const addValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value]);
  }, []);

  const removeValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((v) => v !== value)
    );
  }, []);

  return (
    <main>
      <h1 className={styles.banniere}>Admin</h1>
      <div className={styles.mainHome}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            className={styles.title}
            type="text"
            name="username"
            placeholder="username"
            required
          />
          <input
            {...register("Firstname")}
            className={styles.title}
            type="text"
            name="Firstname"
            placeholder="Firstname"
            required
            onKeyPress={(event) => {
              const allowedCharacters = /^[^0-9]*$/;
              if (!allowedCharacters.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <input
            {...register("Lastname")}
            className={styles.title}
            type="text"
            name="Lastname"
            placeholder="Lastname"
            required
            onKeyPress={(event) => {
              const allowedCharacters = /^[^0-9]*$/;
              if (!allowedCharacters.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <input
            {...register("Email")}
            className={styles.title}
            type="text"
            name="Email"
            placeholder="Email"
            required
          />
          <input
            {...register("Numeromob")}
            className={styles.title}
            type="number"
            name="Numeromob"
            placeholder="Numeromob"
            required
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              let { value } = event.target;
              const sanitizedValue = value.replace(/[^0-9]/g, "");
              if (sanitizedValue.length > 10) {
                value = sanitizedValue.slice(0, 10);
              } else {
                value = sanitizedValue;
              }
              event.target.value = value;
            }}
          />
          <input
            {...register("hashedPassword")}
            className={styles.title}
            type="text"
            name="hashedPassword"
            placeholder="hashedPassword"
            required
          />
          <p className={styles.label}>Service(s) impactés</p>
          <div className={styles.buttonServ}>
            <Button
              addValue={addValue}
              removeValue={removeValue}
              value={serviceValues.COMMERCIAL}
            >
              ADMINISTRATIF
            </Button>
            <Button
              addValue={addValue}
              removeValue={removeValue}
              value={serviceValues.COMPTABILITE}
            >
              COMPTABILITE
            </Button>
            <Button
              addValue={addValue}
              removeValue={removeValue}
              value={serviceValues.MARKETING}
            >
              MARKETING
            </Button>
            <Button
              addValue={addValue}
              removeValue={removeValue}
              value={serviceValues["RESSOURCES HUMAINES"]}
            >
              RESSOURCES HUMAINES
            </Button>
            <Button
              addValue={addValue}
              removeValue={removeValue}
              value={serviceValues.ADMINISTRATIF}
            >
              COMMERCIAL
            </Button>
          </div>
          <div className={styles.super}>
            <button className={styles.btnsubmit} type="submit">
              Ajouter un utilisateur
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
