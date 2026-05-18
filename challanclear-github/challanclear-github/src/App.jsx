import { useState, useEffect } from 'react';
import Home           from './screens/Home';
import CitizenPortal  from './screens/CitizenPortal';
import AdminPortal    from './screens/AdminPortal';
import { INIT_CHALLANS } from './data/seed';

export default function App() {
  const [screen,   setScreen]   = useState('home');   // home | citizen | admin
  const [challans, setChallans] = useState(INIT_CHALLANS);

  // Inject the spin keyframe once
  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = `
      @keyframes ccspin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  /** Update one challan by id */
  const updateChallan = (id, updates) =>
    setChallans((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );

  /** Append a brand-new challan */
  const addChallan = (challan) =>
    setChallans((prev) => [...prev, challan]);

  return (
    <div
      style={{
        background:  '#0a0a0a',
        minHeight:   '100vh',
        color:       '#f0f0f0',
        fontFamily:  "'Outfit', 'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {screen === 'home' && (
        <Home
          onCitizen={() => setScreen('citizen')}
          onAdmin  ={() => setScreen('admin')}
        />
      )}

      {screen === 'citizen' && (
        <CitizenPortal
          challans={challans}
          onUpdate={updateChallan}
          onBack  ={() => setScreen('home')}
        />
      )}

      {screen === 'admin' && (
        <AdminPortal
          challans={challans}
          onUpdate={updateChallan}
          onAdd   ={addChallan}
          onBack  ={() => setScreen('home')}
        />
      )}
    </div>
  );
}
