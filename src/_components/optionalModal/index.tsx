"use client";

type Props = {
  cancelProps: {
    text: string;
    onClick: () => void;
  };
  confirmProps: {
    text: string;
    onClick: () => void;
  };
  text: string;
};

export default function OptionalModal({
  cancelProps,
  confirmProps,
  text,
}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50 z-1"
        onClick={cancelProps.onClick}
      ></div>

      <div className="bg-white p-6 rounded shadow-md z-2">
        <p className="text-lg font-medium mb-4 text-gray-900">{text}</p>

        <div className="flex flex-row justify-between">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded font-medium"
            onClick={cancelProps.onClick}
          >
            {cancelProps.text}
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded font-medium"
            onClick={confirmProps.onClick}
          >
            {confirmProps.text}
          </button>
        </div>
      </div>
    </div>
  );
}
