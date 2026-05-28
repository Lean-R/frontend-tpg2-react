import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./contact-form.module.css";

import {
  IconCoffee,
  IconShoppingCart,
  IconCircleCheck,
  IconAlertCircle,
  IconUser,
  IconMail,
  IconListDetails,
  IconMessage,
} from "@tabler/icons-react";

const ORDER_TYPES = [
  { value: "consulta", label: "American Black — Consulta general" },
  { value: "proyecto", label: "Flat White — Nuevo proyecto" },
  { value: "bug", label: "Espresso Shot — Reportar bug" },
  { value: "colab", label: "Cold Brew — Colaboración" },
  { value: "otro", label: "De la casa — Otro" },
];

const TICKET_NUMBER = `#${String(Math.floor(Math.random() * 9000) + 1000)}`;

/*  Simula envío asíncrono  */
const fakeSubmit = () => new Promise((resolve) => setTimeout(resolve, 1800));

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      orderType: "consulta",
      message: "",
    },
  });

  const onSubmit = async () => {
    await fakeSubmit();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    reset();
  };

  /*  Render del formulario  */
  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formGrid}>
        {/*  Item 1: Nombre  */}
        <div className={styles.menuItem}>
          <label className={styles.label} htmlFor="name">
            <IconUser size={20} stroke={1.5} className={styles.labelIcon} />
            Nombre del Cliente
          </label>
          <input
            id="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            placeholder="ej: Juan Pérez // jperez@cod3"
            {...register("name", {
              required: "Acá debería ir tu nombre",
              minLength: {
                value: 2,
                message: "Mínimo 2 caracteres",
              },
            })}
          />
          {errors.name && (
            <span className={styles.errorMsg}>
              <IconAlertCircle size={12} />
              {errors.name.message}
            </span>
          )}
        </div>

        {/*  Item 2: Email  */}
        <div className={styles.menuItem}>
          <label className={styles.label} htmlFor="email">
            <IconMail size={20} stroke={1.5} className={styles.labelIcon} />
            Canal de comunicación
          </label>
          <input
            id="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            placeholder="ej: grano@cafe.dev"
            {...register("email", {
              required: "Aća va tu correo electrónico",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "No parece un email válido",
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorMsg}>
              <IconAlertCircle size={12} />
              {errors.email.message}
            </span>
          )}
        </div>

        {/*  Item 3: Tipo de pedido  */}
        <div className={`${styles.menuItem} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="orderType">
            <IconListDetails
              size={20}
              stroke={1.5}
              className={styles.labelIcon}
            />
            Tipo de Encargo
          </label>
          <select
            id="orderType"
            className={styles.select}
            {...register("orderType", {
              required: "Seleccioná un tipo de encargo",
            })}
          >
            {ORDER_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.orderType && (
            <span className={styles.errorMsg}>
              <IconAlertCircle size={12} />
              {errors.orderType.message}
            </span>
          )}
        </div>

        {/*  Item 4: Mensaje  */}
        <div className={`${styles.menuItem} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="message">
            <IconMessage size={20} stroke={1.5} className={styles.labelIcon} />
            Notas del Pedido
          </label>
          <textarea
            id="message"
            className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            placeholder="Describí acá tu proyecto, bug o consulta... (nos quedamos sin leche de almendras)"
            {...register("message", {
              required: "Contanos brevemente tu encargo",
              minLength: {
                value: 10,
                message: "Contanos un poquito más (mín. 10 caracteres)",
              },
              maxLength: {
                value: 500,
                message:
                  "Max. 500 caracteres (no queremos que explote la taza)",
              },
            })}
          />
          {errors.message && (
            <span className={styles.errorMsg}>
              <IconAlertCircle size={12} />
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <hr className={styles.ticketDivider} />

      {/*  Total + Botón  */}
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>
          TOTAL:{" "}
          <strong style={{ color: "var(--color-acento-primario)" }}>1</strong>{" "}
          encargo
        </span>

        <button
          type="submit"
          className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} />
              PREPARANDO...
            </>
          ) : (
            <>
              <IconShoppingCart size={16} stroke={1.5} />
              ENCARGO / BREW
            </>
          )}
        </button>
      </div>
    </form>
  );

  /*  Mensaje de éxito  */
  const renderSuccess = () => (
    <div className={styles.successMsg}>
      <IconCircleCheck className={styles.successIcon} size={48} stroke={1.5} />
      <h3 className={styles.successTitle}>¡Pedido recibido!</h3>
      <p className={styles.successDesc}>
        Tu encargo ya está en nuestra bandeja de sprints.
        <br />
        En las próximas 24hs hábiles un Barista-Dev se pondrá en contacto para
        afinar los detalles de tu orden.
      </p>
      <button className={styles.successBtn} onClick={handleReset}>
        <IconShoppingCart size={14} stroke={1.5} style={{ marginRight: 6 }} />
        NUEVO ENCARGO
      </button>
    </div>
  );

  return (
    <section className={styles.section} id="contact">
      {/*  Encabezado  */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>&gt; Menú de Encargos</h2>
        <p className={styles.sectionSubtitle}>
          Pedinos tu café de especialidad y lo compilamos
        </p>
        <div className={styles.sectionDivider} />
      </div>

      {/*  Tarjeta — Order Ticket  */}
      <div className={styles.menuCard}>
        {/*  Fondo decorativo: taza de café gigante dentro del card  */}
        <IconCoffee className={styles.bgIconCard} stroke={1} />

        {/*  Header del ticket  */}
        <div className={styles.ticketHeader}>
          <span className={styles.ticketTitle}>
            <IconCoffee
              size={16}
              stroke={2}
              style={{ marginRight: 6, verticalAlign: "middle" }}
            />
            ORDER TICKET
          </span>
          <span className={styles.ticketBadge}>{TICKET_NUMBER}</span>
        </div>

        {/*  Cuerpo  */}
        <div className={styles.menuBody}>
          {submitted ? renderSuccess() : renderForm()}
        </div>

        {/*  Footer del ticket  */}
        <div className={styles.ticketFooter}>
          <p className={styles.ticketFooterText}>
            <span className={styles.ticketFooterCmd}>$</span> The Coffee-Code
            Engine — Desarrollo con aroma a código tostado
          </p>
        </div>
      </div>
    </section>
  );
}
