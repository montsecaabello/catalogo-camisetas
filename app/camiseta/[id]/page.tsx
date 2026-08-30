"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { camisetas } from "../../data/camisetas";

export default function CamisetaPage() {
    const [tipoTalla, setTipoTalla] = useState<"ninos" | "adultos" | "">("");
    const [imagenActiva, setImagenActiva] = useState(0);
    const [imagenAmpliada, setImagenAmpliada] = useState(false);
const [tallaSeleccionada, setTallaSeleccionada] = useState("");
const [versionSeleccionada, setVersionSeleccionada] = useState<
  "normal" | "personalizada"
>("normal");
const [guiaAmpliada, setGuiaAmpliada] = useState(false);
const [nombrePersonalizado, setNombrePersonalizado] = useState("");
const [numeroPersonalizado, setNumeroPersonalizado] = useState("");
const [parchesSeleccionados, setParchesSeleccionados] = useState<string[]>([]);
  const params = useParams();
  const id = Number(params.id);

  const camiseta = camisetas
  .flatMap((competicion: any) => competicion.equipos || [])
  .flatMap((equipo: any) => equipo.camisetas || [])
  .find((c: any) => c.id === id);

  if (!camiseta) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Camiseta no encontrada</h1>
      </main>
    );
  }

  return (
    <main
  style={{
    minHeight: "100vh",
    background: "#fff",
    padding: "25px 12px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  }}
>
      <div
  style={{
    maxWidth: "1100px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box",
  }}
>
        <a
          href="/"
          style={{
            color: "#2d241b",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Volver al catálogo
        </a>

        <h1
          style={{
            fontSize: "32px",
            color: "#2d241b",
            marginTop: "30px",
          }}
        >
          {camiseta.nombre}
        </h1>

        <div
  className="camiseta-contenido"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    marginTop: "30px",
  }}
>
          <div>
<div
  style={{
    position: "relative",
  }}
></div>   

  <img
  src={camiseta.imagenes?.[imagenActiva]}
  alt={camiseta.nombre}
  onClick={() => setImagenAmpliada(true)}
  style={{
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "15px",
    display: "block",
    cursor: "zoom-in",
    objectFit: "contain",
  }}
/>

  {camiseta.imagenes && camiseta.imagenes.length > 1 && (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "12px",
      }}
    >
      {camiseta.imagenes.map(
        (imagen: string, index: number) => (
          <img
            key={index}
            src={imagen}
            alt={`${camiseta.nombre} ${index + 1}`}
            onClick={() => setImagenActiva(index)}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "10px",
              cursor: "pointer",
              border: "1px solid #e6d8c3",
            }}
          />
        )
      )}
    </div>
  )}
</div>

          <div>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#8a6b3f",
              }}
            >
              Desde {camiseta.nombre.includes("Retro") ? "21 €" : camiseta.precio}
            </p>

           <h2>Elige tu talla</h2>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  }}
>
  <button
    type="button"
    onClick={() => {
      setTipoTalla("ninos");
      setTallaSeleccionada("");
    }}
    style={{
      flex: 1,
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #2d241b",
      background: tipoTalla === "ninos" ? "#2d241b" : "#fff",
      color: tipoTalla === "ninos" ? "#fff" : "#2d241b",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    👦 Niños
  </button>

  <button
    type="button"
    onClick={() => {
      setTipoTalla("adultos");
      setTallaSeleccionada("");
    }}
    style={{
      flex: 1,
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #2d241b",
      background: tipoTalla === "adultos" ? "#2d241b" : "#fff",
      color: tipoTalla === "adultos" ? "#fff" : "#2d241b",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    👨 Adultos
  </button>
</div>

{tipoTalla === "ninos" && (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    }}
  >
    {["3-4", "4-5", "5-6", "6-7", "8-9", "10-11", "12-13"].map(
      (talla) => (
        <button
          key={talla}
          type="button"
          onClick={() => setTallaSeleccionada(talla)}
          style={{
            padding: "11px 15px",
            borderRadius: "10px",
            border: "1px solid #2d241b",
            background:
              tallaSeleccionada === talla ? "#2d241b" : "#fff",
            color:
              tallaSeleccionada === talla ? "#fff" : "#2d241b",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {talla}
        </button>
      )
    )}
  </div>
)}

{tipoTalla === "adultos" && (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    }}
  >
    {["S", "M", "L", "XL", "2XL", "3XL", "4XL"].map(
      (talla) => (
        <button
          key={talla}
          type="button"
          onClick={() => setTallaSeleccionada(talla)}
          style={{
            padding: "11px 15px",
            borderRadius: "10px",
            border: "1px solid #2d241b",
            background:
              tallaSeleccionada === talla ? "#2d241b" : "#fff",
            color:
              tallaSeleccionada === talla ? "#fff" : "#2d241b",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {talla}
        </button>
      )
    )}
  </div>
)}

{tipoTalla && (
  <p
    style={{
      marginTop: "12px",
      fontSize: "14px",
      color: "#666",
    }}
  >
    Talla seleccionada:{" "}
    <strong>{tallaSeleccionada || "ninguna"}</strong>
  </p>
)}
  <h2 style={{ marginTop: "30px" }}>
  Personalización
</h2>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  }}
>
  <button
    type="button"
    onClick={() => setVersionSeleccionada("normal")}
    style={{
      flex: 1,
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #2d241b",
      background:
        versionSeleccionada === "normal" ? "#2d241b" : "#fff",
      color:
        versionSeleccionada === "normal" ? "#fff" : "#2d241b",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Sin personalizar
    <br />
    <span style={{ fontSize: "18px" }}>
      {camiseta.nombre.includes("Retro") ? "21 €" : camiseta.precio}
    </span>
  </button>

  <button
    type="button"
    onClick={() => setVersionSeleccionada("personalizada")}
    style={{
      flex: 1,
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #2d241b",
      background:
        versionSeleccionada === "personalizada"
          ? "#2d241b"
          : "#fff",
      color:
        versionSeleccionada === "personalizada"
          ? "#fff"
          : "#2d241b",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Personalizada
    <br />
    <span style={{ fontSize: "18px" }}>
      {camiseta.nombre.includes("Retro") ? "24 €" : "22 €"}
    </span>
  </button>
</div>

{versionSeleccionada === "personalizada" && (
  <div
    style={{
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <input
      type="text"
      placeholder="Nombre del dorsal"
      value={nombrePersonalizado}
      onChange={(e) => setNombrePersonalizado(e.target.value)}
      style={{
        padding: "13px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "16px",
      }}
    />

    <input
      type="text"
      placeholder="Número"
      value={numeroPersonalizado}
      onChange={(e) => setNumeroPersonalizado(e.target.value)}
      style={{
        padding: "13px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "16px",
      }}
    />
  </div>
)}        
              <div
  style={{
    marginTop: "40px",
    paddingTop: "30px",
    borderTop: "1px solid #e6d8c3",
  }}
>
  <h2
    style={{
      marginTop: 0,
      marginBottom: "20px",
      color: "#2d241b",
    }}
  >
    Guía de tallas
  </h2>

  <p
    style={{
      color: "#666",
      marginBottom: "15px",
      lineHeight: "1.6",
    }}
  >
    Consulta nuestra guía de tallas antes de realizar tu pedido.
  </p>

  <img
    src="/guia/guia-tallas.png"
    alt="Guía de tallas Gol Shirt"
    onClick={() => setGuiaAmpliada(true)}
    style={{
      width: "100%",
      maxWidth: "900px",
      display: "block",
      margin: "0 auto",
      borderRadius: "12px",
      cursor: "zoom-in",
    }}
  />
</div>
          </div>
        </div>
      </div>
      {imagenAmpliada && (
  <div
    onClick={() => setImagenAmpliada(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      cursor: "zoom-out",
    }}
  >
    <button
      type="button"
      onClick={() => setImagenAmpliada(false)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        border: "none",
        background: "#fff",
        color: "#2d241b",
        fontSize: "24px",
        cursor: "pointer",
        zIndex: 10000,
      }}
    >
      ✕
    </button>

    <img
      src={camiseta.imagenes?.[imagenActiva]}
      alt={camiseta.nombre}
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "95%",
        maxHeight: "90vh",
        objectFit: "contain",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      }}
    />
  </div>
)}
{guiaAmpliada && (
  <div
    onClick={() => setGuiaAmpliada(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 9999,
      cursor: "zoom-out",
    }}
  >
    <img
      src="/guia/guia-tallas.png"
      alt="Guía de tallas ampliada"
      style={{
        maxWidth: "95%",
        maxHeight: "95%",
        objectFit: "contain",
        borderRadius: "12px",
      }}
    />
  </div>
)}
<style jsx>{`
  @media (max-width: 768px) {
    .camiseta-contenido {
      grid-template-columns: 1fr !important;
      gap: 25px !important;
    }
  }

  @media (max-width: 480px) {
    .camiseta-contenido {
      gap: 20px !important;
    }
  }
`}</style>
    </main>
  );
}