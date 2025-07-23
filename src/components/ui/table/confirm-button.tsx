import { ArrowUpRight } from 'lucide-react';

type ConfirmButtonProps = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'success' | 'danger' | 'info';
  icon?: React.ReactNode;
  disabled?: boolean;
};

const variantClasses = {
  primary:
    'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
  success:
    'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
  danger:
    'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
  info: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white',
};

export const ConfirmButton = ({
  label,
  onClick,
  variant = 'primary',
  icon = <ArrowUpRight className="w-4 h-4" />,
  disabled = false,
}: ConfirmButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg shadow-md transition-all duration-200 ${
        variantClasses[variant]
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
};
