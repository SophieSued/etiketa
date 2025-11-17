import React, { useState } from "react";
import "../styles/Info.css"; // ajustá la ruta si tu carpeta se llama distinto

export default function PageInformativa() {
  const [stepAbierto, setStepAbierto] = useState(null);

  const toggleStep = (n) => {
    setStepAbierto(stepAbierto === n ? null : n);
  };

  const steps = [
    {
      titulo: "Escanea.",
      texto:
        "Escaneá el código de barras del producto para analizar automáticamente su composición.",
    },
    {
      titulo: "Consulta.",
      texto:
        "Revisá el detalle de ingredientes y advertencias sobre posibles disruptores endócrinos.",
    },
    {
      titulo: "Compara.",
      texto:
        "Compará productos similares y elegí la opción con menor riesgo según el puntaje.",
    },
    {
      titulo: "Elegí.",
      texto:
        "Tomá decisiones informadas y elegí los productos que mejor se adapten a tus criterios.",
    },
  ];

  return (
    <div className="info-page">
      {/* LOGO ARRIBA */}
      <div className="info-logo">
        <img src="/Logo_chico.png" alt="Etiketa" />
      </div>

      {/* CARD 1400 SUSTANCIAS */}
      <section className="info-card info-card--big">
        <p className="info-1400">1400</p>
        <p className="info-1400-sub">
          Sustancias <span className="resaltado">identificadas</span> con
          potencial <span className="resaltado">disruptor endócrino</span>
        </p>
        <p className="info-text-small">
          Más de <strong>85.000 químicos industriales</strong> en uso comercial.
        </p>
      </section>

      {/* CARD ¿SABÍAS QUE…? */}
      <section className="info-card">
        <p className="info-title-icon">💡 ¿Sabías que...?</p>
        <p className="info-text">
          La mayoría de los productos de comercialización masiva nunca fueron
          evaluados adecuadamente.
        </p>
      </section>

      {/* PASOS 1–4 */}
      <section className="info-steps">
        {steps.map((step, index) => (
          <div className="info-step" key={index}>
            <button
              type="button"
              className="info-step__header"
              onClick={() => toggleStep(index)}
            >
              <div className="info-step__left">
                <div className="info-step__number">{index + 1}</div>
                <span className="info-step__title">{step.titulo}</span>
              </div>
              <span className="info-step__plus">
                {stepAbierto === index ? "−" : "+"}
              </span>
            </button>

            {stepAbierto === index && (
              <div className="info-step__content">
                <p>{step.texto}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* BLOQUE ¿QUÉ ES UN DISRUPTOR…? */}
      <section className="info-card">
        <p className="info-title-icon">💡 ¿Qué es un disruptor endócrino?</p>
        <p className="info-text-strong">OMS (2002)</p>
        <p className="info-text">
          “Sustancia o mezcla exógena que altera la función del sistema
          endócrino y consecuentemente causa efectos adversos en un organismo
          intacto, su progenie o subpoblaciones”.
        </p>
      </section>

      {/* BLOQUE BARRITAS */}
      <section className="info-card">
        <p className="info-title-icon">
          📈 Presencia de disruptores endócrinos en cosméticos
        </p>

        {[
          { nombre: "Parabenos", rango: "75-90%", width: "85%" },
          { nombre: "Ftalatos", rango: "70-75%", width: "80%" },
          { nombre: "Triclosan", rango: "1-5%", width: "20%" },
        ].map((item, i) => (
          <div className="info-bar-row" key={i}>
            <div className="info-bar-row__top">
              <span>{item.nombre}</span>
              <span>{item.rango}</span>
            </div>
            <div className="info-bar-row__bar">
              <div
                className="info-bar-row__fill"
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* BLOQUE PARÁMETRO DE CLASIFICACIÓN */}
      <section className="info-card info-card--last">
        <p className="info-title-icon">📘 Parámetro de clasificación</p>
        <p className="info-text">
          La puntuación de la composición de los productos se basa en los
          parámetros EWG. En base a la integración de este sistema de
          certificación y la estructuración de escalas junto con endocrinólogos,
          se establecieron los productos de mayor riesgo como determinantes del
          puntaje.
        </p>
      </section>
    </div>
  );
}
