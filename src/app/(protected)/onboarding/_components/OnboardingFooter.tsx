type OnboardingFooterProps = {
  children: React.ReactNode;
};

const OnboardingFooter = ({ children }: OnboardingFooterProps) => {
  return <div className="mt-0  md:px-24 px-6 md:px-0">{children}</div>;
};

export default OnboardingFooter;
