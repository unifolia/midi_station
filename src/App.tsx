/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import MidiForm from "./lib/MidiForm";
import Header from "./lib/Header";
import { FormsContainer } from "./styles/components";
import Navigation from "./lib/NavBar";
import Device from "./lib/Device";

interface MidiFormData {
  id: number;
  midiChannel: number;
  midiCC: number;
  value: number;
  label: string;
}

const App = () => {
  const [forms, setForms] = useState({
    name: "MIDI Control Block Grouping",
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
  const [globalMidiChannel, setGlobalMidiChannel] = useState<number | null>(
    null
  );
  const [device, setDevice] = useState("");
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  const handleGlobalMidiChannelChange = (newGlobalChannel: number) => {
    setGlobalMidiChannel(newGlobalChannel);
    if (newGlobalChannel !== null) {
      setForms((prev) => ({
        ...prev,
        inputs: prev.inputs.map((form) => ({
          ...form,
          midiChannel: newGlobalChannel,
        })),
      }));
    }
  };

  const handleAddInput = () => {
    if (forms.inputs.length < 50) {
      setForms((prev) => ({
        ...prev,
        inputs: [
          ...prev.inputs,
          {
            id: nextId,
            midiChannel: globalMidiChannel || 1,
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
      const handle = await (window as any).showSaveFilePicker({
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

  const handleLoadPreset = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              name: preset.name,
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

  const handleMIDIMessage = (event: any) => {
    const [status, data1, data2] = event.data;

    const command = status >> 4;
    const note = data1;
    const velocity = data2;

    console.log(command, note, velocity);
    // Need to finish this ^ Update form input (with CC that matches note)'s value with new velocity
  };

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          const outputs = Array.from(midiAccess.outputs.values());

          if (outputs.length === 0) {
            alert("No MIDI outputs found. Please connect a MIDI device.");
            return;
          }

          const uniqueManufacturers = [
            ...new Set(
              outputs
                .map((output) => output.manufacturer)
                .filter(
                  (manufacturer): manufacturer is string =>
                    manufacturer !== null
                )
                .filter(
                  (manufacturer): manufacturer is string => manufacturer !== ""
                )
            ),
          ];
          setManufacturers(uniqueManufacturers);

          for (let input of midiAccess.inputs.values()) {
            input.onmidimessage = handleMIDIMessage;
          }
        },
        () => console.error("Failed to access MIDI devices.")
      );
    } else {
      console.error("MIDI is not supported on this browser :(");
    }
  }, []);

  return (
    <main>
      <Header
        name={forms.name}
        setName={(value: string) =>
          setForms((prev) => ({ ...prev, name: value }))
        }
      />

      <Device
        device={device}
        manufacturers={manufacturers}
        setDevice={setDevice}
      />

      <Navigation
        handleAddInput={handleAddInput}
        savePreset={savePreset}
        handleLoadPreset={handleLoadPreset}
        globalMidiChannel={globalMidiChannel}
        handleGlobalMidiChannelChange={handleGlobalMidiChannelChange}
      />

      <FormsContainer>
        {forms.inputs.map((form) => (
          <MidiForm
            key={form.id}
            onRemove={() => handleRemoveForm(form.id)}
            midiChannel={form.midiChannel}
            setMidiChannel={(value: string | number) =>
              updateFormField(form.id, "midiChannel", value)
            }
            globalMidiChannel={globalMidiChannel}
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
            device={device}
          />
        ))}
      </FormsContainer>
    </main>
  );
};

export default App;
