import "./switch.css";

const Switch = ({
  isOn,
  isDisabled,
  handleToggle,
}: {
  isOn: boolean;
  isDisabled: boolean;
  handleToggle: any;
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        disabled={!isDisabled}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? "#06D6A0" : undefined }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
