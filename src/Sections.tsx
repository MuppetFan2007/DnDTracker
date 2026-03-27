import React from 'react';

export function PetsSection() {
  return (
    <div style={{ padding: 32, textAlign: 'center', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ fontSize: 28, marginBottom: 12 }}>Pets & Summons</h2>
      <p style={{ color: '#7a6a72', fontSize: 15 }}>
        Track your animal companions, familiars, and magical summons here. (Feature coming soon!)
      </p>
      <img src="/src/assets/hero.png" alt="Pets" style={{ width: 180, marginTop: 24, opacity: 0.8, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
    </div>
  );
}

export function SpellsSection() {
  return (
    <div style={{ padding: 32, textAlign: 'center', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ fontSize: 28, marginBottom: 12 }}>Spellbook</h2>
      <p style={{ color: '#7a6a72', fontSize: 15 }}>
        Browse, add, and manage spells for your characters. (Feature coming soon!)
      </p>
      <img src="/src/assets/react.svg" alt="Spells" style={{ width: 120, marginTop: 24, opacity: 0.8, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
    </div>
  );
}
