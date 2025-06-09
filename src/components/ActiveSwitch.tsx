import { useState } from "react";

type Props = {
  isActive: number;
  onToggle: (newState: boolean) => void;
};

export default function ActiveSwitch({ isActive, onToggle }: Props) {
  const [enabled, setEnabled] = useState(isActive === 1);

  const handleChange = () => {
    const newState = !enabled;
    setEnabled(newState);
    onToggle(newState); // نفذ الدالة مع القيمة الجديدة
  };

  return (
    <div className="flex items-center gap-2" dir="ltr">
      <div className="relative">
        <input
          type="checkbox"
          id="active-course"
          checked={enabled}
          onChange={handleChange}
          className="sr-only"
        />
        <div
          onClick={handleChange}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            enabled ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
