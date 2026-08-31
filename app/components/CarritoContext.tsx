"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext<any>(null);

export function CarritoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [animarCarrito, setAnimarCarrito] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto: any) {
    setCarrito((carritoActual) => [
      ...carritoActual,
      {
        ...producto,
        cantidad: producto.cantidad || 1,
      },
    ]);

    setAnimarCarrito(true);

    setTimeout(() => {
      setAnimarCarrito(false);
    }, 700);
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        animarCarrito,
        setAnimarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}