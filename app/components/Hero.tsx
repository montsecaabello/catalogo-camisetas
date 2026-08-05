"use client";

import { useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { camisetas } from "../data/camisetas";
import { useCarrito } from "./CarritoContext";
import Carrito from "./Carrito";
import TarjetaCamiseta from "./TarjetaCamiseta";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  const [imagenActiva, setImagenActiva] = useState<{
    [key: number]: number;
  }>({});

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
const [equipo, setEquipo] = useState("Todos");
const [pantalla, setPantalla] = useState("categorias");
const { setCarrito, setAnimarCarrito } = useCarrito();
const [tallasSeleccionadas, setTallasSeleccionadas] = useState<{[key: number]: string;}>({});
const [versionSeleccionada, setVersionSeleccionada] = useState<{ [key: number]: "normal" | "personalizada" }>({});
const [agregado, setAgregado] = useState<number | null>(null);
const [nombrePersonalizado, setNombrePersonalizado] = useState<{ [key: number]: string }>({});
const [numeroPersonalizado, setNumeroPersonalizado] = useState<{ [key: number]: string }>({});
const [parchesSeleccionados, setParchesSeleccionados] = useState<{[key: number]: string[];}>({});
const listaParches = [
  "LaLiga",
  "Champions League",
  "Mundial de Clubes FIFA",
  "UEFA Respect",
  "Premier League",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
];
const [parchesAbiertos, setParchesAbiertos] = useState<{[key: number]: boolean;}>({});
const [camisetaAbierta, setCamisetaAbierta] = useState<number | null>(null);


  const categoriaActual =
  categoria === "Todas"
    ? null
    : camisetas.find((c: any) => c.nombre === categoria);

const equipos =
  categoriaActual?.equipos || [];

const camisetasFiltradas =
  equipo === "Todos"
    ? []
    : equipos
        .find((e: any) => e.nombre === equipo)
        ?.camisetas.filter((camiseta: any) =>
          camiseta.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
        ) || [];

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

        <input
          type="text"
          placeholder="🔍 Buscar temporada ejemplo= 26-27"
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
{pantalla === "categorias" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    }}
  >
    {camisetas.map((cat: any) => (
      <div
        key={cat.nombre}
        onClick={() => {
          setCategoria(cat.nombre);
          setEquipo("Todos");
          setPantalla("equipos");
        }}
        style={{
          background: "#fffaf4",
          border: "1px solid #e6d8c3",
          borderRadius: "16px",
          padding: "35px",
          cursor: "pointer",
          fontSize: "26px",
          fontWeight: "bold",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {cat.nombre}
      </div>
    ))}
  </div>
)}
<div
  style={{
    maxWidth: "760px",
    margin: "0 auto 40px",
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
    Si no encuentras el modelo que buscas, <strong>escríbenos por WhatsApp</strong> y te ayudaremos a encontrarlo.
  </p>
</div>
     {pantalla === "equipos" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    }}
  >
    <button
      onClick={() => setPantalla("categorias")}
      style={{
        gridColumn: "1 / -1",
        padding: "12px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        background: "#2d241b",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      ← Volver a categorías
    </button>

    {equipos.map((e: any) => (
      <div
        key={e.nombre}
        onClick={() => {
          setEquipo(e.nombre);
          setPantalla("camisetas");
        }}
        style={{
          background: "#fffaf4",
          border: "1px solid #e6d8c3",
          borderRadius: "16px",
          padding: "30px",
          cursor: "pointer",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {e.nombre}
      </div>
    ))}
  </div>
)}
       {pantalla === "camisetas" && (
  <>
    <button
      onClick={() => {
        setPantalla("equipos");
        setEquipo("Todos");
      }}
      style={{
        marginBottom: "30px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#2d241b",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      ← Volver a equipos
    </button>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px",
      }}
    >
      {camisetasFiltradas.map((camiseta: any) => (
       
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
    margin: "10px 0",
  }}
>
  Desde {camiseta.nombre.includes("Retro") ? "21 €" : camiseta.precio}
</p>
          <button
  onClick={() =>
    setCamisetaAbierta(
      camisetaAbierta === camiseta.id ? null : camiseta.id
    )
  }

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
  {camisetaAbierta === camiseta.id
    ? "Ocultar opciones"
    : "Elegir opciones"}
</button>

{camisetaAbierta === camiseta.id && (

  <>

<select
  value={tallasSeleccionadas[camiseta.id] || ""}
  onChange={(e) =>
    setTallasSeleccionadas({
      ...tallasSeleccionadas,
      [camiseta.id]: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "15px",
    marginBottom: "10px",
    fontSize: "16px",
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
    marginTop: "10px",
    fontWeight: "bold",
    color: "#2d241b",
  }}
>
  Elige la versión:
</p>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  }}
>

  <button
    onClick={() =>
      setVersionSeleccionada({
        ...versionSeleccionada,
        [camiseta.id]: "normal",
      })
    }
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #2d241b",
      background:
        versionSeleccionada[camiseta.id] === "normal"
          ? "#2d241b"
          : "#fff",
      color:
        versionSeleccionada[camiseta.id] === "normal"
          ? "#fff"
          : "#2d241b",
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
    onClick={() =>
      setVersionSeleccionada({
        ...versionSeleccionada,
        [camiseta.id]: "personalizada",
      })
    }
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #2d241b",
      background:
        versionSeleccionada[camiseta.id] === "personalizada"
          ? "#2d241b"
          : "#fff",
      color:
        versionSeleccionada[camiseta.id] === "personalizada"
          ? "#fff"
          : "#2d241b",
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
{versionSeleccionada[camiseta.id] === "personalizada" && (
  
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
      value={nombrePersonalizado[camiseta.id] || ""}
      onChange={(e) =>
        setNombrePersonalizado({
          ...nombrePersonalizado,
          [camiseta.id]: e.target.value,
        })
      }
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />

    <input
      type="text"
      placeholder="Número"
      value={numeroPersonalizado[camiseta.id] || ""}
      onChange={(e) =>
        setNumeroPersonalizado({
          ...numeroPersonalizado,
          [camiseta.id]: e.target.value,
        })
      }
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />
  </div>
)}
<div
  style={{
    marginTop: "18px",
  }}
>
  <button
  onClick={() =>
    setParchesAbiertos({
      ...parchesAbiertos,
      [camiseta.id]: !parchesAbiertos[camiseta.id],
    })
  }
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d8c7af",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "bold",
    color: "#2d241b",
    marginBottom: "12px",
  }}
>
  {parchesAbiertos[camiseta.id] ? "▲" : "▼"} Parches incluidos
  {parchesSeleccionados[camiseta.id]?.length > 0 &&
    ` (${parchesSeleccionados[camiseta.id].join(", ")})`}
</button>

  {parchesAbiertos[camiseta.id] && (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    }}
  >
    {listaParches.map((parche) => {
      const seleccionados =
        parchesSeleccionados[camiseta.id] || [];

      const activo = seleccionados.includes(parche);

      return (
        <button
          key={parche}
          onClick={() => {
            if (activo) {
              setParchesSeleccionados({
                ...parchesSeleccionados,
                [camiseta.id]: seleccionados.filter(
                  (p) => p !== parche
                ),
              });
              return;
            }

            if (seleccionados.length >= 2) {
              alert("Solo puedes elegir hasta 2 parches.");
              return;
            }

            const nuevosParches = [...seleccionados, parche];

setParchesSeleccionados({
  ...parchesSeleccionados,
  [camiseta.id]: nuevosParches,
});

if (nuevosParches.length === 2) {
  setParchesAbiertos({
    ...parchesAbiertos,
    [camiseta.id]: false,
  });
}
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            border: "1px solid #2d241b",
            background: activo ? "#2d241b" : "#fff",
            color: activo ? "#fff" : "#2d241b",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          {parche}
        </button>
      );
    })}
  </div>
)}
</div>
<button
  onClick={() => {
    if (!tallasSeleccionadas[camiseta.id]) {
  alert("Por favor, selecciona una talla.");
  return;
}

if (
  versionSeleccionada[camiseta.id] === "personalizada" &&
  (
    !nombrePersonalizado[camiseta.id]?.trim() ||
    !numeroPersonalizado[camiseta.id]?.trim()
  )
) {
  alert("Para una camiseta personalizada debes indicar el nombre y el número.");
  return;
}
setCarrito((actual: any[]) => {
  const nuevoProducto = {
    id: camiseta.id,
    nombre: camiseta.nombre,
    precio:
     camiseta.nombre.includes("Retro")
  ? versionSeleccionada[camiseta.id] === "personalizada"
    ? "24 €"
    : "21 €"
  : versionSeleccionada[camiseta.id] === "personalizada"
    ? "22 €"
    : "19 €"
    ,imagen: camiseta.imagenes[0],
    talla: tallasSeleccionadas[camiseta.id],
    personalizada:
      versionSeleccionada[camiseta.id] === "personalizada",
    nombreDorsal: nombrePersonalizado[camiseta.id] || "",
    numeroDorsal: numeroPersonalizado[camiseta.id] || "",
    parches: parchesSeleccionados[camiseta.id] || [],
    cantidad: 1,
  };

  const indiceExistente = actual.findIndex((item: any) => {
    return (
      item.id === nuevoProducto.id &&
      item.talla === nuevoProducto.talla &&
      item.personalizada === nuevoProducto.personalizada &&
      item.nombreDorsal === nuevoProducto.nombreDorsal &&
      item.numeroDorsal === nuevoProducto.numeroDorsal &&
      JSON.stringify(item.parches) === JSON.stringify(nuevoProducto.parches)
    );
  });

  if (indiceExistente !== -1) {
    return actual.map((item: any, index: number) =>
      index === indiceExistente
        ? {
            ...item,
            cantidad: (item.cantidad || 1) + 1,
          }
        : item
    );
  }

  return [...actual, nuevoProducto];
});
setAgregado(camiseta.id);
setAnimarCarrito(true);

setTimeout(() => {
  setAnimarCarrito(false);
}, 350);

setTimeout(() => {
  setAgregado(null);
}, 1800);
  }}
  style={{
    marginTop: "15px",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#2d241b",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {agregado === camiseta.id
  ? "✅ Añadido"
  : "🛒 Añadir al carrito"}
</button>
</>
)}
        </div>
      ))}
    </div>
  </>
)}
    </div>
<div
  style={{
    maxWidth: "900px",
    margin: "60px auto 20px",
    background: "#fffaf4",
    border: "1px solid #e6d8c3",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "left",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  }}
>
  <h3
    style={{
      marginTop: 0,
      color: "#2d241b",
    }}
  >
    Cambios y devoluciones
  </h3>

  <p
    style={{
      color: "#5d4d3d",
      lineHeight: "1.8",
      marginBottom: "12px",
    }}
  >
    Las camisetas personalizadas no admiten cambios ni devoluciones, salvo en caso de defecto de fabricación o error en el pedido.
  </p>

  <p
    style={{
      color: "#5d4d3d",
      lineHeight: "1.8",
      marginBottom: "12px",
    }}
  >
    Si recibes un artículo incorrecto o con algún defecto, ponte en contacto con nosotros y buscaremos una solución lo antes posible.
  </p>

  <p
    style={{
      color: "#5d4d3d",
      lineHeight: "1.8",
      margin: 0,
    }}
  >
    Te recomendamos revisar cuidadosamente la talla y la personalización antes de confirmar tu pedido.
  </p>
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
      <Carrito />
    </section>
  );
}