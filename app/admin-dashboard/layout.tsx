const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center px-5 py-10">{children}</div>
  );
};

export default Layout;
