interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 max-w-md">
        <h2 className="text-red-400 font-bold text-lg mb-2">Error</h2>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
}
