/* eslint-disable no-undef */
import { useState } from "react";
import MidiForm from "./lib/MidiForm";
import Header from "./lib/Header";

interface MidiFormData {
  id: number;
  midiChannel: number;
  midiCC: number;
  value: number;
  label: string;
}

const App = () => {
  const [forms, setForms] = useState({
    name: "MIDI Control Block Group",
    inputs: [
      {
        id: 1,
        midiChannel: 1,
        midiCC: 1,
        value: 64,
        label: "MIDI Control Block",
      },
    ],
  });
  const [nextId, setNextId] = useState(2);

  const handleAddInput = () => {
    if (forms.inputs.length < 25) {
      setForms((prev) => ({
        ...prev,
        inputs: [
          ...prev.inputs,
          {
            id: nextId,
            midiChannel: 1,
            midiCC: 1,
            value: 64,
            label: "MIDI Control Block",
          },
        ],
      }));
      setNextId((prev) => prev + 1);
    }
  };

  const handleRemoveForm = (id: number) => {
    setForms((prev) => ({
      ...prev,
      inputs: prev.inputs.filter((form) => form.id !== id),
    }));
  };

  const updateFormField = (
    id: number,
    field: keyof MidiFormData,
    value: string | number
  ) => {
    setForms((prev) => ({
      ...prev,
      inputs: prev.inputs.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      ),
    }));
  };

  const savePreset = async () => {
    const preset = {
      name: forms.name,
      timestamp: new Date().toISOString(),
      forms: forms.inputs,
    };

    const dataStr = JSON.stringify(preset, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const suggestedName = `${preset.name.replace(/[^a-z0-9]/gi, "_")}`;

    if ("showSaveFilePicker" in window) {
      const handle = await showSaveFilePicker({
        suggestedName: `${suggestedName}.json`,
      });
      const writable = await handle.createWritable();
      await writable.write(dataBlob);
      await writable.close();
      return;
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${suggestedName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
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
            setForms({
              name: "name",
              inputs: preset.forms,
            });
            const maxId = Math.max(
              ...preset.forms.map((f: MidiFormData) => f.id),
              0
            );
            setNextId(maxId + 1);
          } else {
            alert("Invalid preset file");
          }
        } catch (error) {
          alert("Invalid preset file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <main>
      <Header
        name={forms.name}
        setName={(value: any) => setForms((prev) => ({ ...prev, name: value }))}
      />

      <nav className="nav-bar">
        <button onClick={handleAddInput}>Add Input</button>
        <button onClick={savePreset}>Save Preset</button>
        <button className="load-button">
          Upload Preset
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleLoadPreset(e as unknown as Event)}
            value=""
          ></input>
        </button>
      </nav>

      <div className="forms-container">
        {forms.inputs.map((form) => (
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
