import React, { useState } from "react";
import MidiForm from "./lib/MidiForm";

interface FormData {
  id: number;
  midiChannel: number;
  midiCC: number;
  value: number;
  label: string;
}

const App = () => {
  const [forms, setForms] = useState([
    {
      id: 1,
      midiChannel: 1,
      midiCC: 1,
      value: 64,
      label: "MIDI Control Block",
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleAddInput = () => {
    if (forms.length < 25) {
      setForms((prev) => [
        ...prev,
        {
          id: nextId,
          midiChannel: 1,
          midiCC: 1,
          value: 64,
          label: "MIDI Control Block",
        },
      ]);
      setNextId((prev) => prev + 1);
    }
  };

  const handleRemoveForm = (id: number) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
  };

  const updateFormField = (
    id: number,
    field: keyof FormData,
    value: string | number
  ) => {
    setForms((prev) =>
      prev.map((form) => (form.id === id ? { ...form, [field]: value } : form))
    );
  };

  const savePreset = () => {
    const preset = {
      name:
        prompt("Enter preset name:") || `Preset ${new Date().toLocaleString()}`,
      timestamp: new Date().toISOString(),
      forms: forms,
    };

    const dataStr = JSON.stringify(preset, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${preset.name.replace(/[^a-z0-9]/gi, "_")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLoadPreset = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const result = event.target?.result as string;
          const preset = JSON.parse(result);
          if (preset.forms && Array.isArray(preset.forms)) {
            setForms(preset.forms);
            const maxId = Math.max(...preset.forms.map((f) => f.id), 0);
            setNextId(maxId + 1);
          } else {
            alert("Invalid preset file format");
          }
        } catch (error) {
          alert("Error loading preset: Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <main>
      <h1>midi pedal web editor</h1>

      <nav className="nav-bar">
        <button onClick={handleAddInput}>Add Input</button>
        <button onClick={savePreset}>Save Preset</button>
        <button>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleLoadPreset(e as unknown as Event)}
            value=""
          ></input>
        </button>
      </nav>

      <div className="forms-container">
        {forms.map((form) => (
          <MidiForm
            key={form.id}
            onRemove={() => handleRemoveForm(form.id)}
            midiChannel={form.midiChannel}
            setMidiChannel={(value: string | number) =>
              updateFormField(form.id, "midiChannel", value)
            }
            midiCC={form.midiCC}
            setMidiCC={(value: string | number) =>
              updateFormField(form.id, "midiCC", value)
            }
            value={form.value}
            setValue={(value: string | number) =>
              updateFormField(form.id, "value", value)
            }
            label={form.label}
            setLabel={(value: string | number) =>
              updateFormField(form.id, "label", value)
            }
          />
        ))}
      </div>
    </main>
  );
};

export default App;
