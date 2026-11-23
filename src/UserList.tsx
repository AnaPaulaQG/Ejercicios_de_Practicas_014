import { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { UserCard } from './UserCard';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        // 1. Hacer la petición a la API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // 2. Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }

        // 3. Convertir la respuesta a JSON
        const data: User[] = await response.json();

        // 4. Guardar los datos en el estado
        setUsers(data);
      } catch (err) {
        setError('No se pudieron cargar los usuarios');
        console.error(err);
      } finally {
        // Siempre termina la carga
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-list">
      <h2>Lista de Usuarios ({users.length})</h2>
      <div className="users-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            website={user.website}
          />
        ))}
      </div>
    </div>
  );
}