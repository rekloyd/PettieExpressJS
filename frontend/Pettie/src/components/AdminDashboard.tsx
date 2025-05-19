// src/components/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';

type Usuario = {
  idUsuario: number;
  nombreUsuario: string;
  emailUsuario: string;
  contrasenaUsuario?: string;
  cantidadPettieCoins: number;
  role: 'admin' | 'owner' | 'pettier';
  fechaAltaPlataforma?: string;
};

const AdminDashboard: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<Partial<Usuario>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEditing && selectedId !== null
        ? `http://localhost:4000/api/usuario/${selectedId}`
        : 'http://localhost:4000/api/usuario';

      const method = isEditing ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      setForm({});
      setIsEditing(false);
      setSelectedId(null);
      fetchUsuarios();
    } catch (err) {
      console.error('Error al guardar usuario:', err);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setForm(usuario);
    setSelectedId(usuario.idUsuario);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/api/usuario/${id}`, {
        method: 'DELETE'
      });
      fetchUsuarios();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nombreUsuario"
          placeholder="Nombre"
          value={form.nombreUsuario || ''}
          onChange={handleInputChange}
          required
        />
        <input
          name="emailUsuario"
          placeholder="Email"
          type="email"
          value={form.emailUsuario || ''}
          onChange={handleInputChange}
          required
        />
        <input
          name="contrasenaUsuario"
          placeholder="Contraseña"
          type="password"
          value={form.contrasenaUsuario || ''}
          onChange={handleInputChange}
        />
        <input
          name="cantidadPettieCoins"
          placeholder="PettieCoins"
          type="number"
          value={form.cantidadPettieCoins || 0}
          onChange={handleInputChange}
        />
        <select
          name="role"
          value={form.role || ''}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona rol</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="pettier">Pettier</option>
        </select>
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'} Usuario</button>
      </form>

      <hr />

      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.idUsuario}>
            <strong>{usuario.nombreUsuario}</strong> | {usuario.emailUsuario} | {usuario.role} | {usuario.cantidadPettieCoins} coins
            <button onClick={() => handleEdit(usuario)}>Editar</button>
            <button onClick={() => handleDelete(usuario.idUsuario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
