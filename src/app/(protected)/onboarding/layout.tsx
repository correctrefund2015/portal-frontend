type OnboardingProps = {
  children: React.ReactNode;
};

export default function OnboardingLayout({ children }: OnboardingProps) {
  return <div className="cr-bg-image">{children}</div>;
}
