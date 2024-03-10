import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-72 bg-gray-200 p-4">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <ul className="space-y-2">
        <li>Category 1</li>
        <li>Category 2</li>
        <li>Category 3</li>
      </ul>
    </aside>
  );
};

export default Sidebar;