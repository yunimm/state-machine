import { useNavigation } from '../context/NavigationContext';
import Toggler from './Toggler';
import RetryPromise from './RetryPromise';

export default function ContentColumn() {
  const { activeItem } = useNavigation();
  const renderContent = () => {
    switch (activeItem) {
      case 'Basics-toggle':
        return <Toggler />;
      case 'Fetch-RetryPromise':
        return <RetryPromise />;
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