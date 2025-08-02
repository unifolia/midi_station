import React, { useState } from "react";
import MidiForm from "./lib/MidiForm";

const App = () => {
  const [forms, setForms] = useState([{ id: 1 }]);
  const [nextId, setNextId] = useState(2);

  const handleAddInput = () => {
    if (forms.length < 25) {
      setForms((prev) => [...prev, { id: nextId }]);
      setNextId((prev) => prev + 1);
    }
  };

  const handleRemoveForm = (id) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
  };

  return (
    <main>
      <h1>spa day</h1>

      <nav className="nav-bar">
        <button onClick={handleAddInput}>Add Input</button>

        {/* <button>Load Group</button>
        <button>Save Group</button>
        <button>Login</button> */}
      </nav>

      <div className="forms-container">
        {forms.map((form) => (
          <MidiForm key={form.id} onRemove={() => handleRemoveForm(form.id)} />
        ))}
      </div>
    </main>
  );
};

export default App;
