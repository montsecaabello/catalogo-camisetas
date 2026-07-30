"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext<any>(null);

export function CarritoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carrito, setCarrito] = useState<any[]>([]);
  useEffect(() => {
  const carritoGuardado = localStorage.getItem("carrito");

  if (carritoGuardado) {
    setCarrito(JSON.parse(carritoGuardado));
  }
}, []);

useEffect(() => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}, [carrito]);

  // Servirá para lanzar animaciones del carrito
  const [animarCarrito, setAnimarCarrito] = useState(false);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
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