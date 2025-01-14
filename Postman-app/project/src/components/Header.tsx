import React from 'react';
import { LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="p-1">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold">PostConnect</h1>
      </div>
      <button className="p-2 hover:bg-blue-700 rounded-full">
        <LogOut size={20} />
      </button>
    </header>
  );
}