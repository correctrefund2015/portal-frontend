import AuthWrapper from "../(auth)/_components/AuthWrapper";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
}
