/**
 * AdminDashboard Component
 *
 * @author Pau
 * @author Didac Morillas
 * @version 0.5.1
 * @date 2025-05-19
 *
 * @remarks
 * Este componente proporciona una interfaz de usuario para que los administradores
 * gestionen usuarios en la plataforma Pettie. Permite comprobar el rol de acceso,
 * listar usuarios, crear, editar y eliminar usuarios.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Representa un usuario dentro de la plataforma.
 *
 * @public
 */
export type Usuario = {
  /** Identificador único del usuario */
  idUsuario: number;

  /** Nombre de usuario */
  nombreUsuario: string;

  /** Correo electrónico del usuario */
  emailUsuario: string;

  /** Contraseña del usuario (opcional) */
  contrasenaUsuario?: string;

  /** Cantidad de PettieCoins disponibles */
  cantidadPettieCoins: number;

  /** Rol del usuario dentro de la plataforma */
  role: 'admin' | 'owner' | 'pettier';

  /** Fecha de alta del usuario en la plataforma (opcional) */
  fechaAltaPlataforma?: string;
};

/**
 * Componente de panel de administración que permite gestionar usuarios.
 * Solo los usuarios con rol `admin` tienen acceso.
 *
 * @returns Elemento React del dashboard de administración
 */
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  /** Indica si se está validando la autorización */
  const [authLoading, setAuthLoading] = useState(true);

  /** Indica si el usuario actual es administrador */
  const [isAdmin, setIsAdmin] = useState(false);

  /** Lista de usuarios obtenida desde la API */
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  /** Datos del formulario para crear o editar usuario */
  const [form, setForm] = useState<Partial<Usuario>>({});

  /** Indica si el formulario está en modo edición */
  const [isEditing, setIsEditing] = useState(false);

  /** ID del usuario seleccionado para editar */
  const [selectedId, setSelectedId] = useState<number | null>(null);

  /**
   * Verifica el rol del usuario actual al montar el componente.
   * Si no es `admin`, redirige al inicio.
   */
  useEffect(() => {
    const idUsuario = sessionStorage.getItem('idUsuario');
    if (!idUsuario) {
      console.warn('No hay idUsuario en sessionStorage');
      navigate('/');
      return;
    }

    const url = `http://localhost:4000/api/usuarios/rol/${idUsuario}`;

    fetch(url)
      .then(res => {
        if (res.status !== 200) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.role === 'admin') {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        console.error('Error comprobando rol:', err);
        navigate('/');
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, [navigate]);

  /**
   * Obtiene la lista de usuarios desde la API.
   */
  const fetchUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/usuarios');
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  /**
   * Carga los usuarios cuando se confirma que el usuario es admin.
   */
  useEffect(() => {
    if (isAdmin) {
      fetchUsuarios();
    }
  }, [isAdmin]);

  /**
   * Agrega Google Fonts al documento. Se ejecuta solo una vez.
   */
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  /**
   * Maneja cambios en los campos del formulario.
   *
   * @param e - Evento de cambio en input o select
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Envía el formulario para crear o actualizar un usuario.
   * Cambia el método y URL según si está en edición.
   *
   * @param e - Evento de envío de formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url =
        isEditing && selectedId !== null
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

  /**
   * Prepara el formulario para editar un usuario existente.
   *
   * @param usuario - Usuario seleccionado para edición
   */
  const handleEdit = (usuario: Usuario) => {
    setForm(usuario);
    setSelectedId(usuario.idUsuario);
    setIsEditing(true);
  };

  /**
   * Elimina un usuario por su ID y recarga la lista.
   *
   * @param id - ID del usuario a eliminar
   */
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

  if (authLoading) {
    return <p>Cargando autorización...</p>;
  }

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
        <h1
          style={{
            textAlign: 'center',
            color: '#333',
            fontFamily: 'Madimi One',
          }}
        >
          Admin Dashboard
        </h1>

        {/* Formulario de creación/edición */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 15, marginBottom: 30 }}>
          {/* Campos del formulario */}
          <input
            name="nombreUsuario"
            placeholder="Nombre"
            value={form.nombreUsuario || ''}
            onChange={handleInputChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
          />
          <input
            name="emailUsuario"
            placeholder="Email"
            type="email"
            value={form.emailUsuario || ''}
            onChange={handleInputChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
          />
          <input
            name="contrasenaUsuario"
            placeholder="Contraseña"
            type="password"
            value={form.contrasenaUsuario || ''}
            onChange={handleInputChange}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
          />
          <input
            name="cantidadPettieCoins"
            placeholder="PettieCoins"
            type="number"
            value={form.cantidadPettieCoins || 0}
            onChange={handleInputChange}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
          />
          <select
            name="role"
            value={form.role || ''}
            onChange={handleInputChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', width: '100%', backgroundColor: 'white' }}
          >
            <option value="">Selecciona rol</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="pettier">Pettier</option>
          </select>

          <button
            type="submit"
            style={{ backgroundColor: '#007bff', color: 'white', padding: 10, border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </form>

        <h2 style={{ textAlign: 'center', color: '#333', fontFamily: 'Madimi One' }}>
          Lista de Usuarios
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {usuarios.map((usuario) => (
            <li key={usuario.idUsuario} style={{ backgroundColor: '#fafafa', border: '1px solid #ddd', borderRadius: 6, padding: 15, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
                  {usuario.nombreUsuario} · {usuario.role}
                </p>
                <p style={{ margin: '4px 0' }}>
                  {usuario.emailUsuario}
                </p>
                <p style={{ margin: '4px 0' }}>
                  {usuario.cantidadPettieCoins} PettieCoins
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(usuario)}
                  style={{ backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', marginRight: 10, fontWeight: 'bold', transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0a800')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario.idUsuario)}
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
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
