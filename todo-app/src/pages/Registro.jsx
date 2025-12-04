import { useState } from "react";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const [mensaje, setMensaje] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.contraseña) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    console.log("Datos de registro:", form);
    setMensaje("Registro enviado correctamente ✅");

    // opcional: limpiar
    // setForm({ nombre: "", correo: "", contraseña: "" });
  }

  return (
    <div className="page">
      <h1>Página de Registro</h1>

      {mensaje && <p>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label><br />
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="correo">Correo:</label><br />
          <input
            id="correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            placeholder="tucorreo@example.com"
          />
        </div>

        <div>
          <label htmlFor="contraseña">Contraseña:</label><br />
          <input
            id="contraseña"
            name="contraseña"
            type="password"
            value={form.contraseña}
            onChange={handleChange}
            placeholder="********"
          />
        </div>

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}
