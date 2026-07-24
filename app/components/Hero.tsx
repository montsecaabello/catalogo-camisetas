"use client";

import { useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { camisetas } from "../data/camisetas";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  const [imagenActiva, setImagenActiva] = useState<{
    [key: number]: number;
  }>({});

  const [busqueda, setBusqueda] = useState("");

  const camisetasFiltradas = camisetas.filter((camiseta) =>
    camiseta.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f4ec, #efe4d2)",
        color: "#2f2419",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          className={bebas.className}
          style={{
            fontSize: "clamp(70px, 10vw, 110px)",
            letterSpacing: "4px",
            marginBottom: "20px",
            color: "#2d241b",
          }}
        >
          GOL SHIRT
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#5d4d3d",
          }}
        >
          Camisetas de fútbol premium
        </p>

        <p
          style={{
            color: "#7b6b58",
            marginBottom: "20px",
            fontSize: "17px",
          }}
        >
          Desde 19 € · 1 o 2 parches incluidos · Personalización por WhatsApp
        </p>

        <input
          type="text"
          placeholder="🔍 Buscar equipo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "14px 18px",
            marginBottom: "25px",
            borderRadius: "12px",
            border: "1px solid #d8c7af",
            fontSize: "16px",
            outline: "none",
            background: "#fff",
          }}
        />

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto 50px",
            background: "#fffaf4",
            border: "1px solid #e6d8c3",
            borderRadius: "16px",
            padding: "22px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px",
              color: "#2d241b",
              fontSize: "22px",
            }}
          >
            ⚽ ¿No encuentras la camiseta que buscas?
          </h3>

          <p
            style={{
              margin: 0,
              color: "#5d4d3d",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            Disponemos de <strong>cientos de equipos, selecciones y temporadas</strong>,
            aunque todavía no estén publicados en la web.
            <br />
            Si no encuentras el modelo que buscas, <strong>escríbenos por WhatsApp</strong> y
            te ayudaremos a encontrarlo.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {camisetasFiltradas.map((camiseta) => (
            <div
              key={camiseta.id}
              style={{
                background: "#fffaf4",
                borderRadius: "18px",
                padding: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e6d8c3",
              }}
            >
              <img
                src={camiseta.imagenes[imagenActiva[camiseta.id] || 0]}
                alt={camiseta.nombre}
                onClick={() =>
                  setImagenActiva({
                    ...imagenActiva,
                    [camiseta.id]:
                      (imagenActiva[camiseta.id] || 0) === 0 ? 1 : 0,
                  })
                }
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              />

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#8b7355",
                }}
              >
                Pulsa la imagen para ver la parte trasera.
              </p>

              <h2
                style={{
                  marginTop: "18px",
                  color: "#2d241b",
                }}
              >
                {camiseta.nombre}
              </h2>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#8a6b3f",
                }}
              >
                Desde {camiseta.precio}
              </p>

              <p
                style={{
                  color: "#4f4336",
                }}
              >
                ⭐ Calidad Premium
              </p>

              <p
                style={{
                  color: "#7b6b58",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                Incluye 1 o 2 parches a elegir. Si quieres añadir nombre,
                dorsal, número o más detalles, escríbenos por WhatsApp.
              </p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="https://wa.me/34640814023?text=Hola,%20he%20visto%20la%20web%20de%20Gol%20Shirt%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20camiseta."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          backgroundColor: "#25D366",
          color: "#fff",
          padding: "15px 22px",
          borderRadius: "999px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          zIndex: 9999,
        }}
      >
        💬 Consultar por WhatsApp
      </a>
    </section>
  );
}