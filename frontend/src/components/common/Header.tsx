import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full px-4 py-3 border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          TechStore
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                Bienvenido, <span className="font-medium">{user.username}</span>
              </span>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-800">
                  Panel Admin
                </Link>
              )}
              <Button 
                variant="outline" 
                onClick={logout}
                size="sm"
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;