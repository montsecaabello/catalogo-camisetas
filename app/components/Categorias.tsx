type Props = {
  categorias: any[];
  onSeleccionar: (categoria: any) => void;
};

export default function Categorias({
  categorias,
  onSeleccionar,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      {categorias.map((categoria) => (
        <div
          key={categoria.nombre}
          onClick={() => onSeleccionar(categoria)}
          style={{
            background: "#fffaf4",
            border: "1px solid #e6d8c3",
            borderRadius: "18px",
            padding: "30px",
            cursor: "pointer",
            fontSize: "30px",
            fontWeight: "bold",
            transition: ".2s",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          {categoria.nombre}
        </div>
      ))}
    </div>
  );
}