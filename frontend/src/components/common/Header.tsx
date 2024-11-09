import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <span>Bienvenido, {user.username}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <Link href="/login">Iniciar sesión</Link>
      )}
    </header>
  );
}