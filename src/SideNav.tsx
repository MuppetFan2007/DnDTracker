import { FiUsers, FiHome, FiBookOpen, FiFeather } from "react-icons/fi";

interface SideNavProps {
  currentView: string;
  setView: (v: string) => void;
}

export default function SideNav({ currentView, setView }: SideNavProps) {
  const navItems = [
    { label: 'Roster', view: 'roster', icon: <FiUsers /> },
    { label: 'Create', view: 'create', icon: <FiHome /> },
    { label: 'Spells', view: 'spells', icon: <FiBookOpen /> },
    { label: 'Pets', view: 'pets', icon: <FiFeather /> },
  ];
  return (
    <nav style={{
      width: 72,
      background: '#fff2f6',
      borderRight: '1px solid #ffdce8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 16,
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10,
    }}>
      {navItems.map(item => (
        <button
          key={item.view}
          onClick={() => setView(item.view)}
          style={{
            background: currentView === item.view ? '#ffd1e8' : 'transparent',
            color: currentView === item.view ? '#c2185b' : '#7a6a72',
            border: 'none',
            borderRadius: 12,
            width: 48,
            height: 48,
            margin: '8px 0',
            fontSize: 24,
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.18s',
            boxShadow: currentView === item.view ? '0 2px 8px #ffd1e880' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={item.label}
        >
          <span>{item.icon}</span>
          <span style={{ fontSize: 10, marginTop: 2 }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
