import { GlobalChannelSelect } from "../styles/components";

interface DeviceProps {
  device: string;
  manufacturers: string[];
  setDevice: (manufacturer: string) => void;
}

const Device = ({ device, manufacturers, setDevice }: DeviceProps) => {
  return (
    <div>
      <h3>
        MIDI Connection:
        <GlobalChannelSelect
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          style={{ marginLeft: "8px" }}
        >
          <option value="">Select Device...</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer} value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </GlobalChannelSelect>
      </h3>
    </div>
  );
};

export default Device;
