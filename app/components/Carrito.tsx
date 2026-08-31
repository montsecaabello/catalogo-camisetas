"use client";

import { useState } from "react";
import { useCarrito } from "./CarritoContext";

export default function Carrito() {
  console.log("🚨 CARRITO.TSX ESTÁ CARGADO");
const {
  carrito,
  setCarrito,
  animarCarrito,
} = useCarrito();

console.log("CARRITO:", carrito);
console.log("ANIMAR:", animarCarrito);
  const [abierto, setAbierto] = useState(false);


const total = carrito.reduce((acc: number, producto: any) => {
  const precio =
    typeof producto.precio === "number"
      ? producto.precio
      : Number(String(producto.precio).replace("€", "").trim());

  return acc + precio * (producto.cantidad || 1);
}, 0);
  return (
    <>
      <div
        onClick={() => setAbierto(!abierto)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#2d241b",
          color: "#fff",
          padding: "12px 18px",
          borderRadius: "999px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 8px 20px rgba(0,0,0,0.20)",
          transition: "transform 0.35s ease",
          animation: animarCarrito ? "reboteCarrito 0.5s ease" : "none",
          transform: animarCarrito
          ? "scale(1.15) rotate(-3deg)"
          : "scale(1) rotate(0deg)",
        }}
      >
        <>
  🛒 Mi carrito

  <span
    style={{
      marginLeft: "8px",
      background: "#d32f2f",
      color: "#fff",
      borderRadius: "999px",
      padding: "2px 8px",
      fontSize: "13px",
      fontWeight: "bold",
    }}
  >
    {carrito.length}
  </span>
  <style jsx>{`
  @keyframes reboteCarrito {
    0% {
      transform: scale(1) rotate(0deg);
    }
    30% {
      transform: scale(1.2) rotate(-5deg);
    }
    60% {
      transform: scale(1.1) rotate(5deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
`}</style>
</>
      </div>

      {abierto && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            width: "320px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "#fffaf4",
            border: "1px solid #e6d8c3",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            zIndex: 9998,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#2d241b",
            }}
          >
            Tu carrito
          </h3>

          {carrito.length === 0 ? (
            <p>No hay productos todavía.</p>
          ) : (
            carrito.map((producto: any, index: number) => (
              <div
                key={index}
                style={{
                  marginBottom: "15px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{
                    width: "70px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />

                <strong
                  style={{
                    display: "block",
                    fontSize: "17px",
                    color: "#2d241b",
                  }}
                >
                  {producto.nombre}
                </strong>
<div
  style={{
    margin: "5px 0",
    color: "#5d4d3d",
    fontSize: "14px",
  }}
>
  <p>Talla: {producto.talla}</p>

  <p>
  Versión:{" "}
  {producto.version === "personalizada"
    ? "Personalizada"
    : "Sin personalizar"}
</p>

{producto.version === "personalizada" && producto.nombrePersonalizado && (
  <p>🏷️ Nombre: {producto.nombrePersonalizado}</p>
)}

{producto.version === "personalizada" && producto.numeroPersonalizado && (
  <p>🔢 Número: {producto.numeroPersonalizado}</p>
)}
  {producto.parches?.length > 0 && (
  <p>
    <strong>Parches:</strong> {producto.parches.join(", ")}
  </p>
)}
</div>
                <p
                  style={{
                    margin: "8px 0",
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#8a6b3f",
                  }}
                >
                 {(typeof producto.precio === "number"
  ? producto.precio
  : Number(String(producto.precio).replace("€", "").trim())) *
  (producto.cantidad || 1)} €
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      color: "#5d4d3d",
                      fontSize: "15px",
                    }}
                  >
                    Cantidad:
                  </span>

                  <button
                    onClick={() =>
                      setCarrito(
                        carrito.map((item: any, i: number) =>
                          i === index
                            ? {
                                ...item,
                                cantidad: Math.max(
                                  1,
                                  (item.cantidad || 1) - 1
                                ),
                              }
                            : item
                        )
                      )
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {producto.cantidad || 1}
                  </span>

                  <button
                    onClick={() =>
                      setCarrito(
                        carrito.map((item: any, i: number) =>
                          i === index
                            ? {
                                ...item,
                                cantidad: (item.cantidad || 1) + 1,
                              }
                            : item
                        )
                      )
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    setCarrito(
                      carrito.filter(
                        (_: any, i: number) => i !== index
                      )
                    )
                  }
                  style={{
                    marginTop: "4px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#b23b3b",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  ❌ Quitar
                </button>
              </div>
            ))
          )}
<div
  style={{
    marginTop: "20px",
    padding: "15px",
    background: "#f7f1e8",
    borderRadius: "12px",
    border: "1px solid #e6d8c3",
    textAlign: "center",
  }}
>
  <p
    style={{
      margin: 0,
      fontSize: "14px",
      color: "#7b6b58",
    }}
  >
    Total del pedido
  </p>

  <h2
    style={{
      margin: "6px 0 0",
      color: "#2d241b",
      fontSize: "28px",
    }}
  >
    {total} €
  </h2>
</div>
          <button
            onClick={() => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "🟨 GOL SHIRT\n\n";
  mensaje += "Hola, quiero realizar el siguiente pedido:\n\n";

  let total = 0;

  carrito.forEach((producto: any, index: number) => {
    const cantidad = producto.cantidad || 1;
     const precio =
  typeof producto.precio === "number"
    ? producto.precio
    : Number(String(producto.precio).replace("€", "").trim());

    total += precio * cantidad;

    mensaje += `━━━━━━━━━━━━━━\n\n`;

    mensaje += `${index + 1}. ${producto.nombre}\n\n`;

    mensaje += `👕 Talla: ${producto.talla}\n`;

   mensaje += `🎨 Versión: ${
  producto.version === "personalizada"
    ? "Personalizada"
    : "Sin personalizar"
}\n`;

if (producto.version === "personalizada") {
  if (producto.nombrePersonalizado) {
    mensaje += `🏷️ Nombre: ${producto.nombrePersonalizado}\n`;
  }

  if (producto.numeroPersonalizado) {
    mensaje += `🔢 Número: ${producto.numeroPersonalizado}\n`;
  }
}
    if (producto.parches?.length > 0) {
  mensaje += `Parches: ${producto.parches.join(", ")}\n`;
}

    mensaje += `📦 Cantidad: ${cantidad}\n\n`;
  });

  mensaje += "━━━━━━━━━━━━━━\n\n";
  mensaje += `💰 TOTAL: ${total} €`;

  window.open(
    `https://wa.me/34640814023?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
}}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            💬 Pedir por WhatsApp
          </button>
          <button
  onClick={() => {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
      setCarrito([]);
    }
  }}
  style={{
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #b23b3b",
    background: "#fff",
    color: "#b23b3b",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  🗑️ Vaciar carrito
</button>
        </div>
      )}
    </>
  );
}