import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Tab = 'signin' | 'signup';

export function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setToast(null);

    try {
      if (tab === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(name, email, password);
      }
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-shell">
      {toast && <div className="toast toast-error">{toast}</div>}
      <section className="auth-card">
        <div className="auth-logo">
          <GraduationCap size={22} />
        </div>
        <h1>CampusConnect</h1>
        <p>Your all-in-one school companion</p>

        <div className="auth-tabs">
          <button type="button" className={tab === 'signin' ? 'active' : ''} onClick={() => setTab('signin')}>
            Sign In
          </button>
          <button type="button" className={tab === 'signup' ? 'active' : ''} onClick={() => setTab('signup')}>
            Sign Up
          </button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <label>
              Full Name
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
          )}
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
          </label>
          <button type="submit" disabled={busy}>{busy ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}</button>
        </form>
      </section>
    </div>
  );
}
