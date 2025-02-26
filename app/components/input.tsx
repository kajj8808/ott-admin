interface InputProps {
  name: string;
  id: string;
  placeholder: string;
}
export default function Input({ id, name, placeholder }: InputProps) {
  return (
    <input
      type="text"
      name={name}
      id={id}
      placeholder={placeholder}
      className="w-full rounded-sm p-3 text-center text-lg font-semibold text-neutral-900"
    />
  );
}
