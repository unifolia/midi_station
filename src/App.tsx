/* eslint-disable no-undef */
import { useState, useEffect, useCallback, useRef } from "react";
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
  backgroundColor: string;
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
        backgroundColor: "#1a1a2e",
      },
    ],
  });
  const [nextId, setNextId] = useState(2);
  const [globalMidiChannel, setGlobalMidiChannel] = useState<number | null>(
    null
  );

  const [isMidiOutput, setIsMidiOutput] = useState(false);
  const [device, setDevice] = useState("");
  const [deviceList, setDeviceList] = useState<string[]>([]);
  const [wavesEnabled, setWavesEnabled] = useState(false);
  const formsRef = useRef(forms);
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update the ref whenever forms changes
  useEffect(() => {
    formsRef.current = forms;
  }, [forms]);

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
            backgroundColor: "#1a1a2e",
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

  const handleMidiUpload = async (
    midiChannel: number,
    midiCC: number,
    currentValue: number
  ) => {
    try {
      const midiAccess = await navigator.requestMIDIAccess();

      const outputs = midiAccess?.outputs?.values();
      const outputsArray = outputs ? Array.from(outputs) : [];
      const [output] = outputsArray.filter(
        (outputs) => outputs?.name === device
      );

      const message = [0xb0 + midiChannel - 1, midiCC, currentValue];
      console.log(message);

      console.log(outputsArray);
      if (output) {
        output.send(message);
      }
    } catch (error) {
      console.error("MIDI Error:", error);
    }
  };

  const handleMIDIMessage = useCallback((event: any) => {
    const [status, data1, data2] = event.data;

    const command = status >> 4;
    const note = data1;
    const velocity = data2;

    if (command == 11) {
      const currentForms = formsRef.current;
      const matchingForm = currentForms.inputs.find(
        (form) => form.midiCC === note
      );

      if (matchingForm) {
        setForms((prev) => ({
          ...prev,
          inputs: prev.inputs.map((form) =>
            form.midiCC === note ? { ...form, value: velocity } : form
          ),
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        (midiAccess) => {
          const outputs = Array.from(midiAccess.outputs.values());

          if (outputs.length === 0) {
            setIsMidiOutput(false);
            return;
          }

          setIsMidiOutput(true);

          const names = [
            ...new Set(
              outputs
                .map((output) => output.name)
                .filter(
                  (manufacturer): manufacturer is string =>
                    manufacturer !== null
                )
                .filter(
                  (manufacturer): manufacturer is string => manufacturer !== ""
                )
            ),
          ];
          setDeviceList(names);

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

  // Wave animation effect
  useEffect(() => {
    if (wavesEnabled) {
      // Create unique wave parameters for each form with direction tracking
      const waveParams = forms.inputs.map((form) => ({
        id: form.id,
        phase: Math.random() * Math.PI * 2, // Random starting phase
        frequency: 0.3 + Math.random() * 0.4, // Random frequency between 0.3-0.7 (slower for incremental changes)
        lastWaveValue: 0, // Track last wave calculation for direction
        changeCounter: 0, // Counter to slow down changes
        changeThreshold: Math.floor(Math.random() * 3) + 1, // Random threshold 1-3 for varied speeds
        currentDirection: Math.random() > 0.5 ? 1 : -1, // Random starting direction: 1 for up, -1 for down
      }));

      let startTime = Date.now();

      waveIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000; // Time in seconds

        setForms((prev) => ({
          ...prev,
          inputs: prev.inputs.map((form) => {
            const params = waveParams.find((p) => p.id === form.id);
            if (!params) return form;

            // Increment counter for change frequency control
            params.changeCounter++;

            // Only change value when counter reaches threshold (adds randomness to timing)
            if (params.changeCounter >= params.changeThreshold) {
              params.changeCounter = 0;

              let newValue = form.value;

              // Check if we need to reverse direction at boundaries
              if (form.value >= 127) {
                params.currentDirection = -1; // Force downward
              } else if (form.value <= 10) {
                params.currentDirection = 1; // Force upward
              }

              // Apply movement based on current direction
              if (params.currentDirection === 1 && form.value < 127) {
                newValue = form.value + 1;
              } else if (params.currentDirection === -1 && form.value > 10) {
                newValue = form.value - 1;
              }

              // Trigger MIDI upload if value changed
              if (newValue !== form.value) {
                handleMidiUpload(form.midiChannel, form.midiCC, newValue);
              }

              return {
                ...form,
                value: newValue,
              };
            }

            return form; // No change this cycle
          }),
        }));
      }, 100); // Update every 150ms
    } else {
      // Clear interval when waves disabled
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
        waveIntervalRef.current = null;
      }
    }

    // Cleanup on unmount or when wavesEnabled changes
    return () => {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
        waveIntervalRef.current = null;
      }
    };
  }, [wavesEnabled, forms.inputs.length]); // Re-run when waves toggled or forms change

  return (
    <main>
      <Header
        name={forms.name}
        setName={(value: string) =>
          setForms((prev) => ({ ...prev, name: value }))
        }
      />

      {isMidiOutput ? (
        <Device device={device} deviceList={deviceList} setDevice={setDevice} />
      ) : (
        <h3>No Midi Devices Connected</h3>
      )}

      <Navigation
        handleAddInput={handleAddInput}
        savePreset={savePreset}
        handleLoadPreset={handleLoadPreset}
        globalMidiChannel={globalMidiChannel}
        handleGlobalMidiChannelChange={handleGlobalMidiChannelChange}
        wavesEnabled={wavesEnabled}
        setWavesEnabled={setWavesEnabled}
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
            backgroundColor={form.backgroundColor}
            setBackgroundColor={(value: string) =>
              updateFormField(form.id, "backgroundColor", value)
            }
            device={device}
            handleMidiUpload={(
              midiChannel: number,
              midiCC: number,
              currentValue: number
            ) => handleMidiUpload(midiChannel, midiCC, currentValue)}
          />
        ))}
      </FormsContainer>
    </main>
  );
};

export default App;
