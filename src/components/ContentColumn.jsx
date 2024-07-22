import { useNavigation } from '../context/NavigationContext';
import Toggler from './Toggler';
import RetryPromise from './RetryPromise';
import Cache from './Cache';

export default function ContentColumn() {
  const { activeItem } = useNavigation();
  const renderContent = () => {
    switch (activeItem) {
      case 'Basics-toggle':
        return <Toggler />;
      case 'Fetch-RetryPromise':
        return <RetryPromise />;
      case 'Fetch-Cache':
        return <Cache />;
      default:
        return <p>請選擇一個項目來查看內容</p>;
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}