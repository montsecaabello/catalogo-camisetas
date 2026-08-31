"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Pedido = {
  id: number;
  created_at: string;
  cliente_nombre: string;
  nombre_cliente?: string;
  telefono: string;
  productos: any;
  total: number;
  estado: string;
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sesion, setSesion] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(false);

  const [nombreCliente, setNombreCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [productos, setProductos] = useState("");
  const [totalPedido, setTotalPedido] = useState("");
  const [estadoPedido, setEstadoPedido] = useState("pendiente");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    comprobarSesion();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
      setCargando(false);

      if (session) {
        cargarPedidos();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function comprobarSesion() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSesion(session);
    setCargando(false);

    if (session) {
      cargarPedidos();
    }
  }

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    setSesion(data.session);
    cargarPedidos();
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    setSesion(null);
    setPedidos([]);
  }

  async function cargarPedidos() {
  setCargandoPedidos(true);

  const resultado = await supabase
  .from("pedidos")
  .select("*");

  console.log("PEDIDOS SUPABASE:", resultado.data);
  console.log("ERROR SUPABASE:", resultado.error);

  if (resultado.error) {
    setError("Error al cargar pedidos: " + resultado.error.message);
    setCargandoPedidos(false);
    return;
  }

  setPedidos(resultado.data as Pedido[]);
  setCargandoPedidos(false);
}

  async function crearPedido(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const total = Number(totalPedido);

    if (!nombreCliente.trim()) {
      setError("Escribe el nombre del cliente.");
      return;
    }

    if (!telefono.trim()) {
      setError("Escribe el teléfono del cliente.");
      return;
    }

    if (!productos.trim()) {
      setError("Escribe qué productos ha comprado.");
      return;
    }

    if (isNaN(total)) {
      setError("El total debe ser un número.");
      return;
    }

    const resultado = await supabase.from("pedidos").insert({
  cliente_nombre: nombreCliente.trim(),
  nombre_cliente: nombreCliente.trim(),
  telefono: telefono.trim(),
  productos: {
    descripcion: productos.trim(),
  },
  total,
  estado: estadoPedido,
});

if (resultado.error) {
  alert("ERROR SUPABASE: " + resultado.error.message);
  return;
}

    setNombreCliente("");
    setTelefono("");
    setProductos("");
    setTotalPedido("");
    setEstadoPedido("pendiente");
    setMostrarFormulario(false);

    await cargarPedidos();
  }

  async function cambiarEstado(id: number, nuevoEstado: string) {
    const { error } = await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      console.error(error);
      setError("No se ha podido cambiar el estado.");
      return;
    }

    await cargarPedidos();
  }

  async function eliminarPedido(id: number) {
    const confirmar = confirm(
      "¿Seguro que quieres eliminar este pedido?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("pedidos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setError("No se ha podido eliminar el pedido.");
      return;
    }

    await cargarPedidos();
  }

  if (cargando) {
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
        Cargando...
      </main>
    );
  }

  if (!sesion) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f7f3ed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#fff",
            border: "1px solid #2d241b",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              color: "#2d241b",
              textAlign: "center",
            }}
          >
            Panel de administración
          </h1>

          <p
            style={{
              color: "#666",
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            Acceso privado de Gol Shirt
          </p>

          <form onSubmit={iniciarSesion}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "bold",
                color: "#2d241b",
              }}
            >
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                marginBottom: "18px",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "bold",
                color: "#2d241b",
              }}
            >
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                marginBottom: "18px",
              }}
            />

            {error && (
              <p
                style={{
                  color: "#b23b3b",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #2d241b",
                background: "#2d241b",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f3ed",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "18px",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#2d241b",
              }}
            >
              Panel de Gol Shirt
            </h1>

            <p style={{ color: "#666" }}>
              Gestión de pedidos
            </p>
          </div>

          <button
            onClick={cerrarSesion}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid #2d241b",
              background: "#fff",
              color: "#2d241b",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            margin: "25px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: "#2d241b",
              margin: 0,
            }}
          >
            Pedidos
          </h2>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#2d241b",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {mostrarFormulario
              ? "✕ Cerrar"
              : "＋ Añadir pedido"}
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              background: "#fff1f1",
              border: "1px solid #e0aaaa",
              borderRadius: "10px",
              color: "#a22",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        {mostrarFormulario && (
          <form
            onSubmit={crearPedido}
            style={{
              background: "#f7f3ed",
              border: "1px solid #e6d8c3",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#2d241b",
              }}
            >
              Nuevo pedido
            </h3>

            <input
              type="text"
              placeholder="Nombre del cliente"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "9px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />

            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "9px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />

            <textarea
              placeholder="Productos comprados"
              value={productos}
              onChange={(e) => setProductos(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "9px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                fontSize: "16px",
                resize: "vertical",
              }}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Total (€)"
              value={totalPedido}
              onChange={(e) => setTotalPedido(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "9px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />

            <select
              value={estadoPedido}
              onChange={(e) => setEstadoPedido(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "9px",
                border: "1px solid #ccc",
                marginBottom: "15px",
                fontSize: "16px",
                background: "#fff",
              }}
            >
              <option value="pendiente">🟡 Pendiente</option>
              <option value="pagado">🟢 Pagado</option>
              <option value="entregado">🔵 Entregado</option>
            </select>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "10px",
                border: "none",
                background: "#2d241b",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Guardar pedido
            </button>
          </form>
        )}

        {cargandoPedidos ? (
          <p>Cargando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              border: "1px dashed #ccc",
              borderRadius: "15px",
              color: "#666",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Todavía no hay pedidos
            </p>

            <p>
              Pulsa “Añadir pedido” para introducir tu primer
              cliente.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "15px",
                  padding: "20px",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#2d241b",
                      }}
                    >
                      #{pedido.id} — {pedido.nombre_cliente}
                    </h3>

                    <p
                      style={{
                        margin: "6px 0",
                        color: "#666",
                      }}
                    >
                      📱 {pedido.telefono}
                    </p>
                  </div>

                  <strong
                    style={{
                      fontSize: "24px",
                      color: "#2d241b",
                    }}
                  >
                    {pedido.total} €
                  </strong>
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    padding: "12px",
                    background: "#f7f3ed",
                    borderRadius: "10px",
                    whiteSpace: "pre-wrap",
                    color: "#444",
                  }}
                >
                  {typeof pedido.productos === "object"
                    ? pedido.productos.descripcion
                    : pedido.productos}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "15px",
                  }}
                >
                  <strong>Estado:</strong>

                  <select
                    value={pedido.estado}
                    onChange={(e) =>
                      cambiarEstado(
                        pedido.id,
                        e.target.value
                      )
                    }
                    style={{
                      padding: "9px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    <option value="pendiente">
                      🟡 Pendiente
                    </option>
                    <option value="pagado">
                      🟢 Pagado
                    </option>
                    <option value="entregado">
                      🔵 Entregado
                    </option>
                  </select>

                  <button
                    onClick={() =>
                      eliminarPedido(pedido.id)
                    }
                    style={{
                      marginLeft: "auto",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #b23b3b",
                      background: "#fff",
                      color: "#b23b3b",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}