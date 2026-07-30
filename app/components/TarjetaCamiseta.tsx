"use client";

import { useState } from "react";

type Props = {
  camiseta: any;
  imagenActiva: any;
  setImagenActiva: any;
};

export default function TarjetaCamiseta({
  camiseta,
  imagenActiva,
  setImagenActiva,
}: Props) {

    const [abierta, setAbierta] = useState(false);
    const [version, setVersion] = useState<"normal" | "personalizada">("normal");
    const [talla, setTalla] = useState("");
    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState("");


  return (
    <div
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
        }}
      />

      <p
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: "#8b7355",
          textAlign: "center",
        }}
      >
        Toca la imagen para ver la parte trasera.
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
          fontSize: "22px",
          fontWeight: "700",
          color: "#8a6b3f",
        }}
      >
        Desde {camiseta.nombre.includes("Retro") ? "21 €" : "19 €"}
      </p>

      <button
  onClick={() => setAbierta(!abierta)}
  style={{
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2d241b",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {abierta ? "Ocultar opciones" : "Elegir opciones"}
</button>
{abierta && (
  <div
    style={{
      marginTop: "20px",
      padding: "15px",
      borderTop: "1px solid #e6d8c3",
    }}
  >
   <select
value={talla}
onChange={(e) => setTalla(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
  }}
>
  <option value="">
    Selecciona talla
  </option>

  {(camiseta.tallas || ["S", "M", "L", "XL", "XXL"]).map(
    (talla: string) => (
      <option key={talla} value={talla}>
        {talla}
      </option>
    )
  )}
</select>
<p
  style={{
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2d241b",
  }}
>
  Elige la versión:
</p>

<div
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  <button
  onClick={() => setVersion("normal")}
  style={{
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #2d241b",
    background: version === "normal" ? "#2d241b" : "#fff",
    color: version === "normal" ? "#fff" : "#2d241b",
    cursor: "pointer",
  }}
>
    Sin personalizar
    <br />
    <strong>
      {camiseta.nombre.includes("Retro") ? "21 €" : "19 €"}
    </strong>
  </button>

  <button
  onClick={() => setVersion("personalizada")}
  style={{
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #2d241b",
    background: version === "personalizada" ? "#2d241b" : "#fff",
    color: version === "personalizada" ? "#fff" : "#2d241b",
    cursor: "pointer",
  }}
>
    Personalizada
    <br />
    <strong>
      {camiseta.nombre.includes("Retro") ? "24 €" : "22 €"}
    </strong>
  </button>
</div>
{version === "personalizada" && (
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
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />

    <input
  type="text"
  placeholder="Número"
  value={numero}
  onChange={(e) => setNumero(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />
  </div>
)}
  </div>
)}
    </div>
  );
}