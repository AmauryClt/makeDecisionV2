import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { add, formatISO } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import styles from "./CreatePage.module.scss";
import Button from "./Button";

export default function CreatePage({ toastOptions }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [demand, setDemand] = useState({});
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultDate = formatISO(add(new Date(), { months: 1 }), {
    representation: "date",
  });
  const maxDate = formatISO(add(new Date(), { years: 1 }), {
    representation: "date",
  });
  const minDate = formatISO(add(new Date(), { days: 7 }), {
    representation: "date",
  });

  const serviceValues = {
    ADMINISTRATIF: "1",
    COMPTABILITE: "2",
    MARKETING: "3",
    "RESSOURCES HUMAINES": "4",
    COMMERCIAL: "5",
  };

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const dateStr = data.Deadline;
          const formattedDate = formatISO(new Date(dateStr), {
            representation: "date",
          });
          data.Deadline = formattedDate;
          setDemand(data);
          setSelectedValues((data.ServicesImpacts || "").split(", "));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const onSubmit = (data) => {
    const serviceImpactValues = selectedValues.map(
      (value) => serviceValues[value]
    );
    data.ServicesImpacts = serviceImpactValues;
    data.UserId = user.Id;

    if (id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          console.info("Update done");
          navigate(-1);
          toast.success(
            "👍 La demande a bien été mise à jour 👍",
            toastOptions
          );
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "😓 Un problème à eu lieu lors de la mise à jour 😓",
            toastOptions
          );
        });
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/demands/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          console.info("Created demand");
          navigate("../demands/vote");
          toast.success("👍 Votre demande a bien été créée 👍", toastOptions);
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "😓 Un problème a eu lieu lors de la création 😓",
            toastOptions
          );
        });
    }
  };

  const addValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) => {
      if (!prevSelectedValues.includes(value)) {
        return [...prevSelectedValues, value];
      }
      return prevSelectedValues;
    });
  }, []);

  const removeValue = useCallback((value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((v) => v !== value)
    );
  }, []);

  const editorConfig = {
    plugins: "lists",
    height: 300,
    toolbar: [
      { name: "history", items: ["undo", "redo"] },
      {
        name: "formatting",
        items: ["bold", "italic", "underline"],
      },
      {
        name: "alignment",
        items: ["alignleft", "aligncenter", "alignright", "alignjustify"],
      },
      {
        name: "indentation",
        items: ["bullist", "numlist", "outdent", "indent"],
      },
    ],
    menubar: false,
    placeholder: "Expliquez ici en détail votre idée.",
  };

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      Title: "",
      Benefice: "",
      Inconvenience: "",
      Deadline: defaultDate,
      ServicesImpacts: [],
    },
  });

  useEffect(() => {
    if (demand.Title) setValue("Title", demand.Title);
    if (demand.Content) setValue("Content", demand.Content);
    if (demand.Benefice) setValue("Benefice", demand.Benefice);
    if (demand.Inconvenience) setValue("Inconvenience", demand.Inconvenience);
    if (demand.Deadline) setValue("Deadline", demand.Deadline);
    if (demand.ServicesImpacts) {
      setValue("ServicesImpacts", demand.ServicesImpacts);
    }
  }, [demand, setValue]);

  return (
    <main>
      <h1 className={styles.banniere}>
        Interface de {id ? "modification" : "création"} d'une demande de
        décision
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            className={styles.title}
            type="text"
            name="Title"
            placeholder="Titre de ta décision"
            {...register("Title")}
            required
          />
        </label>
        <div className={styles.editor}>
          <Controller
            control={control}
            name="Content"
            render={({ field: { onChange, onBlur, ref } }) => (
              <Editor
                onBlur={onBlur}
                onEditorChange={onChange}
                initialValue={id ? demand.Content : undefined}
                init={editorConfig}
                onInit={(evt, editor) => (ref.current = editor)}
              />
            )}
          />
        </div>
        <div className={styles.benefInc}>
          <textarea
            {...register("Benefice")}
            type="text"
            name="Benefice"
            placeholder="Quel en seront les bénéfices ?"
            required
          />
          <textarea
            {...register("Inconvenience")}
            type="text"
            name="Inconvenience"
            placeholder="Et les risques ?"
            required
          />
        </div>
        <p className={styles.label}>Service(s) impactés</p>
        <div className={styles.buttonServ}>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.ADMINISTRATIF}
            isSelected={selectedValues.includes(serviceValues.ADMINISTRATIF)}
          >
            ADMINISTRATIF
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.COMPTABILITE}
            isSelected={selectedValues.includes(serviceValues.COMPTABILITE)}
          >
            COMPTABILITE
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.MARKETING}
            isSelected={selectedValues.includes(serviceValues.MARKETING)}
          >
            MARKETING
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues["RESSOURCES HUMAINES"]}
            isSelected={selectedValues.includes(
              serviceValues["RESSOURCES HUMAINES"]
            )}
          >
            RESSOURCES HUMAINES
          </Button>
          <Button
            addValue={addValue}
            removeValue={removeValue}
            value={serviceValues.COMMERCIAL}
            isSelected={selectedValues.includes(serviceValues.COMMERCIAL)}
          >
            COMMERCIAL
          </Button>
        </div>
        <table>
          <thead>
            <td>
              <th className={`${styles.label} ${styles.tableHead}`}>Choix :</th>
            </td>
          </thead>
          <tbody id="selectedValue">
            {selectedValues.map((value) => (
              <tr key={value}>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <label className={styles.date}>
          Date de fin souhaitée :
          <input
            {...register("Deadline")}
            type="date"
            name="Deadline"
            placeholder={defaultDate}
            min={minDate}
            max={maxDate}
            className={styles.inputDate}
            required
          />
        </label>
        <button className={styles.btnSubmit} type="submit">
          Je propose mon idée !
        </button>
      </form>
    </main>
  );
}

CreatePage.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
};
