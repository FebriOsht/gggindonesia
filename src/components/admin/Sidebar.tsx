'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Users, 
  Settings, 
  LogOut,
  Coffee,
  Droplet,
  Nut,
  Leaf
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FileText, label: 'Blog Posts', href: '/admin/dashboard/blog' },
    { icon: Image, label: 'Media', href: '/admin/dashboard/media' },
    { icon: Coffee, label: 'Produk Kopi', href: '/admin/dashboard/products/coffee' },
    { icon: Droplet, label: 'Pemanis Alami', href: '/admin/dashboard/products/sweeteners' },
    { icon: Nut, label: 'Produk Kelapa', href: '/admin/dashboard/products/coconut' },
    { icon: Leaf, label: 'Lainnya', href: '/admin/dashboard/products/others' },
    { icon: Users, label: 'Pengguna', href: '/admin/dashboard/users' },
    { icon: Settings, label: 'Pengaturan', href: '/admin/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-display font-bold text-primary mb-6">
          GGG Admin
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-dark hover:bg-primary/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => {
              // Handle logout
              window.location.href = '/admin/login';
            }}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;