import { useNavigation } from '../context/NavigationContext';
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
  <li className="mb-6 cursor-pointer">
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
  <div className="bg-gray-800 text-gray-400 p-4 w-64">
    <h2 className="py-1 px-2 text-gray-400 mb-4">StateMachine</h2>
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

export default function NavigationColumn() {
  const { activeItem, changeActiveItem } = useNavigation();

  const handleItemClick = (item) => {
    changeActiveItem(item);
  };

  const sidebarData = [
    {
      title: "Basics",
      items: ["toggle"]
    },
    {
      title: "Fetch",
      items: ["RetryPromise"]
    },
  ];

  return (
    <>
      <SidebarList
        sections={sidebarData}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
    </>
  );
}