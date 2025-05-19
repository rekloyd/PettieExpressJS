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

    useEffect(() => {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
        method: 'DELETE',
      });
      fetchUsuarios();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        margin: 0,
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 800,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: 20,
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333', fontFamily:'Madimi One' }}>Admin Dashboard</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gap: 15,
            marginBottom: 30,
          }}
        >
          <input
            name="nombreUsuario"
            placeholder="Nombre"
            value={form.nombreUsuario || ''}
            onChange={handleInputChange}
            required
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
            }}
          />
          <input
            name="emailUsuario"
            placeholder="Email"
            type="email"
            value={form.emailUsuario || ''}
            onChange={handleInputChange}
            required
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
            }}
          />
          <input
            name="contrasenaUsuario"
            placeholder="Contraseña"
            type="password"
            value={form.contrasenaUsuario || ''}
            onChange={handleInputChange}
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
            }}
          />
          <input
            name="cantidadPettieCoins"
            placeholder="PettieCoins"
            type="number"
            value={form.cantidadPettieCoins || 0}
            onChange={handleInputChange}
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
            }}
          />
          <select
            name="role"
            value={form.role || ''}
            onChange={handleInputChange}
            required
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            <option value="">Selecciona rol</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="pettier">Pettier</option>
          </select>

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: 10,
              border: 'none',
              borderRadius: 6,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </form>

        <h2 style={{ textAlign: 'center', color: '#333', fontFamily:'Madimi One' }}>Lista de Usuarios</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {usuarios.map((usuario) => (
            <li
              key={usuario.idUsuario}
              style={{
                backgroundColor: '#fafafa',
                border: '1px solid #ddd',
                borderRadius: 6,
                padding: 15,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
                  {usuario.nombreUsuario} · {usuario.role}
                </p>
                <p style={{ margin: '4px 0' }}>{usuario.emailUsuario}</p>
                <p style={{ margin: '4px 0' }}>{usuario.cantidadPettieCoins} PettieCoins</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(usuario)}
                  style={{
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    marginRight: 10,
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e0a800')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#ffc107')}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario.idUsuario)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#c82333')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
