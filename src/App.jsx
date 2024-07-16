import React, { useState } from 'react';
import Fetch from './Fetch';
import Toggler from './Toggler';
import FetchDog from './FetchDog';
import RetryPromise from './RetryPromise';
import { Select, SelectItem } from "@nextui-org/react";

const machines = [
  { key: "Toggler", label: "Toggler" },
  { key: "fetch", label: "fetch" },
  { key: "FetchDog", label: "FetchDog" },
  { key: "RetryPromise", label: "RetryPromise" },
];

function App() {
  const [selectedMachine, setSelectedMachine] = useState(machines[0].key);

  const renderComponent = () => {
    switch (selectedMachine) {
      case 'Toggler':
        return <Toggler />;
      case 'fetch':
        return <Fetch />;
      case 'FetchDog':
        return <FetchDog />;
      case 'RetryPromise':
        return <RetryPromise />;
      default:
        return null;
    }
  };
  return (
    // FIXME: 預設 label 顯示 toggler
    <>
      <Select
        label="Select an machine"
        className="max-w-xs"
        onChange={(e) => setSelectedMachine(e.target.value)}
      >
        {machines.map((machine) => (
          <SelectItem key={machine.key}>
            {machine.label}
          </SelectItem>
        ))}
      </Select>
      <br />
      {renderComponent()}
    </>
  );
}

export default App;
