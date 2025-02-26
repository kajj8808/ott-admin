interface FormProps {
  action: (payload: FormData) => void;
  subTitle: string;
  children: React.ReactNode;
}
export default function Form({ action, subTitle, children }: FormProps) {
  return (
    <form
      action={action}
      className="scrollbar-hide mt-2 flex w-96 max-w-sm flex-col gap-2 overflow-scroll"
    >
      <span className="text-sm text-neutral-400">{subTitle}</span>
      {children}
    </form>
  );
}
