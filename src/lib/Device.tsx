import { GlobalChannelSelect } from "../styles/components";

interface DeviceProps {
  device: string;
  deviceList: string[];
  setDevice: (manufacturer: string) => void;
}

const Device = ({ device, deviceList, setDevice }: DeviceProps) => {
  return (
    <div>
      <h3>
        MIDI Device:
        <GlobalChannelSelect
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          style={{ margin: "0px 0px 8px 8px" }}
        >
          <option value="">Select Device...</option>
          {deviceList.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </GlobalChannelSelect>
      </h3>
    </div>
  );
};

export default Device;
