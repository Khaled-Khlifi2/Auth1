export const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const base = 'px-4 py-2 text-sm font-medium rounded transition';
  const styles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
