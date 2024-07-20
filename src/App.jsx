import Header from './components/Header';
import SidebarColumn from './components/SidebarColumn';
import NavigationColumn from './components/NavigationColumn';
import ContentColumn from './components/ContentColumn';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <header className="w-full bg-gray-800 border-b border-gray-700">
          <Header />
        </header>
        <div className="flex flex-grow">
          <aside className="hidden md:block w-64 bg-gray-800 overflow-y-auto">
            <NavigationColumn target="Lorem Ipsum 1" />
          </aside>
          <main className="flex-grow p-8 overflow-y-auto">
            <ContentColumn />
          </main>
          <aside className="hidden lg:block w-64 p-4 bg-gray-800 overflow-y-auto">
            <SidebarColumn />
          </aside>
        </div>
      </div>
    </>
  );
}

export default App;
