import { useState } from 'react';

// ListItem 組件
const ListItem = ({ text, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`py-1 px-2 rounded transition-colors duration-200 ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
  >
    {text}
  </li>
);

// Section 組件
const Section = ({ title, items, activeItem, onItemClick }) => (
  <li className="mb-6">
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <ul className="space-y-2 ml-2">
      {items.map((item, index) => (
        <ListItem
          key={`${title}-${item}`}
          text={item}
          isActive={activeItem === `${title}-${item}`}
          onClick={() => onItemClick(`${title}-${item}`)}
        />
      ))}
    </ul>
  </li>
);

// SidebarList 組件
const SidebarList = ({ sections, activeItem, onItemClick }) => (
  <div className="bg-gray-900 text-gray-400 p-4 w-64">
    <h2 className="text-white text-xl font-bold mb-4">Docs02</h2>
    <ul className="space-y-6">
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          items={section.items}
          activeItem={activeItem}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  </div>
);

export default function NavigationColumn({ target }) {
  const [activeItem, setActiveItem] = useState(target);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const sidebarData = [
    {
      title: "Basics",
      items: ["Lorem Ipsum", "Lorem Ipsum 1", "Lorem Ipsum 2", "Lorem Ipsum 3", "Lorem Ipsum 4", "Lorem Ipsum 5"]
    },
    {
      title: "Header 1",
      items: ["Lorem Ipsum", "Lorem Ipsum 1"]
    },
    {
      title: "Header 2",
      items: ["Lorem ipsum", "Lorem Ipsum 1"]
    },
    {
      title: "Header 3",
      items: ["Lorem ipsum", "Lorem Ipsum 1"]
    },
    {
      title: "Header 4",
      items: ["Lorem Ipsum", "Lorem Ipsum 1"]
    }
  ];

  return (
    <SidebarList
      sections={sidebarData}
      activeItem={activeItem}
      onItemClick={handleItemClick}
    />
  );
}