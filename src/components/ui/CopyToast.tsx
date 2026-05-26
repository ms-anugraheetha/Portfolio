type CopyToastProps = {
  message: string;
  visible: boolean;
};

export function CopyToast({ message, visible }: CopyToastProps) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-line bg-charcoal px-5 py-2.5 text-sm font-medium text-ivory shadow-lg"
    >
      {message}
    </div>
  );
}
