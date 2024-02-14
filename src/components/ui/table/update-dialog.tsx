const UpdateDialog = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute flex h-full w-full items-center justify-center bg-black/75">{children}</div>;
};

export default UpdateDialog;
