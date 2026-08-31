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
const [tipoTalla, setTipoTalla] = useState<{
  [key: number]: "adultos" | "ninos";
}>({});
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
const [guiaTallasAbierta, setGuiaTallasAbierta] = useState(false);
const [orden, setOrden] = useState("nuevas");


  const categoriaActual =
  categoria === "Todas"
    ? null
    : camisetas.find((c: any) => c.nombre === categoria);

const equipos =
  categoriaActual?.equipos || [];

const camisetasFiltradas =
  equipo === "Todos"
    ? []
    : (equipos
        .find((e: any) => e.nombre === equipo)
        ?.camisetas.filter((camiseta: any) =>
          camiseta.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
        ) || []
      ).sort((a: any, b: any) => {
        if (orden === "nuevas") {
          const temporadaA = a.nombre.match(/(26-27|25-26)/)?.[1] || "";
          const temporadaB = b.nombre.match(/(26-27|25-26)/)?.[1] || "";

          const valorA =
            temporadaA === "26-27"
              ? 2
              : temporadaA === "25-26"
              ? 1
              : 0;

          const valorB =
            temporadaB === "26-27"
              ? 2
              : temporadaB === "25-26"
              ? 1
              : 0;

          return valorB - valorA;
        }

        if (orden === "antiguas") {
          const retroA = a.nombre.match(/(\d{2})-(\d{2})/)?.[1];
          const retroB = b.nombre.match(/(\d{2})-(\d{2})/)?.[1];

          if (!retroA) return 1;
          if (!retroB) return -1;

          return Number(retroA) - Number(retroB);
        }

        if (orden === "precioMenor") {
  const precioA = a.nombre.includes("Retro") ? 21 : 19;
  const precioB = b.nombre.includes("Retro") ? 21 : 19;

  return precioA - precioB;
}

if (orden === "precioMayor") {
  const precioA = a.nombre.includes("Retro") ? 21 : 19;
  const precioB = b.nombre.includes("Retro") ? 21 : 19;

  return precioB - precioA;
}

        return 0;
      });

  return (
    <section
  style={{
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111111",
    padding: "40px 20px 80px",
  }}
>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "35px",
  }}
>

  <div
  style={{
    marginBottom: "35px",
    textAlign: "center",
  }}
>
  {/* CABECERA ESTILO GOL SHIRT */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "18px",
      marginBottom: "8px",
    }}
  >
    <div
      style={{
        height: "2px",
        width: "90px",
        background: "#111",
      }}
    />

    <span
      style={{
        fontSize: "34px",
        lineHeight: 1,
      }}
    >
      ⚽
    </span>

    <div
      style={{
        height: "2px",
        width: "90px",
        background: "#111",
      }}
    />
  </div>

  <h1
    className={bebas.className}
    style={{
      margin: 0,
      fontSize: "clamp(72px, 11vw, 125px)",
      lineHeight: "0.85",
      letterSpacing: "5px",
      color: "#111",
    }}
  >
    GOL SHIRT
  </h1>

  <p
    style={{
      margin: "18px 0 0",
      fontSize: "clamp(14px, 2vw, 20px)",
      fontWeight: "700",
      letterSpacing: "8px",
      color: "#111",
    }}
  >
    YOUR SHIRT. YOUR GAME.
  </p>

  <div
    style={{
      width: "min(620px, 80%)",
      height: "2px",
      background: "#111",
      margin: "18px auto 10px",
    }}
  />

  <p
    style={{
      margin: 0,
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "6px",
      color: "#555",
    }}
  >
    EST. 2026
  </p>

</div>
</div>

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
      width: "100%",
      marginBottom: "40px",
    }}
  >
    {camisetas.map((cat: any) => (
      <div
        key={cat.nombre}
        style={{
          marginBottom: "35px",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            margin: "0 0 15px",
            color: "#2d241b",
            fontSize: "28px",
            fontWeight: "800",
          }}
        >
          {cat.nombre}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "18px",
            overflowX: "auto",
            overflowY: "hidden",
            padding: "5px 5px 15px",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
          }}
        >
          {cat.equipos?.map((e: any) => (
            <div
              key={e.nombre}
              onClick={() => {
                setCategoria(cat.nombre);
                setEquipo(e.nombre);
                setPantalla("camisetas");
              }}
              style={{
                minWidth: "105px",
                width: "105px",
                flexShrink: 0,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  margin: "0 auto 10px",
                  background: "#fff",
                  border: "2px solid #111",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                  boxSizing: "border-box",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                }}
              >
                <img
  src={`/escudos/Escudo ${e.nombre}.png`}
  alt={`Escudo ${e.nombre}`}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }}
/>
              </div>

              <div
                style={{
                  color: "#2d241b",
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                {e.nombre}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}
<div
  style={{
    maxWidth: "760px",
    margin: "0 auto 40px",
    background: "#fff",
    border: "2px solid #111",
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
  setPantalla("categorias");
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
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  }}
>
  <label
    style={{
      fontWeight: "bold",
      color: "#2d241b",
    }}
  >
    Ordenar por:
  </label>

  <select
    value={orden}
    onChange={(e) => setOrden(e.target.value)}
    style={{
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #d8c7af",
      background: "#fff",
      color: "#2d241b",
      fontSize: "15px",
      cursor: "pointer",
    }}
  >
    <option value="nuevas">🆕 Más nuevas</option>
    <option value="antiguas">👕 Más antiguas</option>
    <option value="precioMenor">💰 Precio: menor a mayor</option>
    <option value="precioMayor">💰 Precio: mayor a menor</option>
  </select>
</div>

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
    background: "#ffffff",
    borderRadius: "20px",
    padding: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
>
       <div
  style={{
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 5",
    background: "#f7f7f7",
    borderRadius: "16px",
    overflow: "hidden",
  }}
>
  <a
  href={`/camiseta/${camiseta.id}`}
  style={{
    display: "block",
    width: "100%",
    height: "100%",
    textDecoration: "none",
  }}
>
  <img
  src={camiseta.imagenes[imagenActiva[camiseta.id] || 0]}
  alt={camiseta.nombre}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
    cursor: "pointer",
    display: "block",
  }}
/>
</a>

</div>

         <h2
  style={{
    marginTop: "16px",
    marginBottom: "6px",
    color: "#1f1f1f",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "1.3",
  }}
>
  {camiseta.nombre}
</h2>
          <button
  onClick={async () => {
    const url = `${window.location.origin}/camiseta/${camiseta.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: camiseta.nombre,
          text: `Mira esta camiseta en Gol Shirt: ${camiseta.nombre}`,
          url,
        });
      } catch {
        // El usuario ha cancelado el menú de compartir
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Enlace de la camiseta copiado.");
      } catch {
        alert("No se ha podido copiar el enlace.");
      }
    }
  }}
  style={{
    marginTop: "8px",
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid #d8c7af",
    background: "#fff",
    color: "#2d241b",
    cursor: "pointer",
    fontSize: "13px",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  }}
>
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16V4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 9L12 4L17 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>

  Compartir
</button>
          <div
  style={{
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginTop: "12px",
  }}
>
<a
  href={`/camiseta/${camiseta.id}`}
  style={{
    display: "block",
    marginTop: "12px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#8a6b3f",
    textDecoration: "none",
    cursor: "pointer",
  }}
>
  Ver camiseta y opciones →
</a>
</div>
          
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
    background: "#fff",
    border: "2px solid #111",
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
      {guiaTallasAbierta && (
  <div
    onClick={() => setGuiaTallasAbierta(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 10000,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#fff",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        borderRadius: "20px",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#111",
          }}
        >
          📏 Guía de tallas
        </h2>

        <button
          type="button"
          onClick={() => setGuiaTallasAbierta(false)}
          style={{
            border: "none",
            background: "#f2f2f2",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <h3
        style={{
          color: "#111",
          marginBottom: "10px",
        }}
      >
        Adultos
      </h3>

      <div
        style={{
          overflowX: "auto",
          marginBottom: "25px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Talla
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                S
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                M
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                L
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                XL
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                2XL
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                3XL
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                4XL
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  fontWeight: "bold",
                }}
              >
                Disponible
              </td>

              {["S", "M", "L", "XL", "2XL", "3XL", "4XL"].map((talla) => (
                <td
                  key={talla}
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  ✓
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <h3
        style={{
          color: "#111",
          marginBottom: "10px",
        }}
      >
        Niños
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {["3-4", "4-5", "5-6", "6-7", "8-9", "10-11", "12-13"].map(
          (talla) => (
            <span
              key={talla}
              style={{
                padding: "9px 14px",
                background: "#f5f5f5",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {talla}
            </span>
          )
        )}
      </div>

      <p
        style={{
          marginTop: "22px",
          marginBottom: 0,
          color: "#666",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
      >
        Si estás entre dos tallas, recomendamos elegir la talla superior.
      </p>
    </div>
  </div>
)}
      <Carrito />
    </section>
  );
}