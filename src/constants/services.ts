export interface ServiceDetail {
  icon: string;
  name: string;
  individual: string;
  business: string;
}

export const servicesDetails: ServiceDetail[] = [
  {
    icon: "/icons/services/gradient/qbooks.svg",
    name: "Bookkeeping",
    individual: "",
    business:
      "Our Bookkeeping service ensures that your financial records are meticulously maintained and up-to-date. We manage your daily transactions, reconcile accounts, and generate clear, concise reports, giving you a real-time view of your financial health.",
  },
  {
    icon: "/icons/services/gradient/tax-prep.svg",
    name: "Tax Preparation",
    individual:
      "Our Comprehensive Tax Preparation service is designed to handle all aspects of your tax filing, ensuring accuracy and maximizing your potential refund. We ensure that your fiing is accurate and provide helpful insights on your tax situation.",
    business:
      "Our Comprehensive Tax Preparation service is designed to handle all aspects of your tax filing, ensuring accuracy and maximizing your potential refund. We assist your business file the appropiate form.",
  },
  {
    icon: "/icons/services/gradient/meeting.svg",
    name: "Strategic Planning",
    individual:
      "Our Strategic Planning service is focused on helping you achieve your personal financial goals and optimizing your tax situation. Whether it's saving for retirement, buying a home, or managing your investments, we provide tailored.",
    business:
      "Our Strategic Planning service is tailored to help you achieve your financial goals and optimize your tax situation. We work closely with you to develop a comprehensive strategy that covers investment planning, tax planning.",
  },
  {
    icon: "/icons/services/gradient/intro-conv.svg",
    name: "Audit Support",
    individual:
      "Our Personal Audit Support service is here to guide you through the complexities of a tax audit with confidence and ease. We provide expert representation and comprehensive assistance, ensuring your financial records are accurately.",
    business:
      "Our Audit Support service provides you with expert guidance and representation during audits, ensuring that your financial records are thoroughly reviewed and accurately presented. We handle all communication with the authorities on your behalf.",
  },
  {
    icon: "/icons/services/gradient/cpa.svg",
    name: "CPA Advisory",
    individual:
      "Our CPA Consultation and Advisory service offers you direct access to expert guidance tailored to your unique financial needs and goals. Whether you need advice on tax strategies, financial planning, or navigating life’s significant.",
    business:
      "Our Business Advisory service offers strategic guidance to help your business thrive. Whether you need assistance with business planning, financial forecasting, or growth strategies, our experienced advisors provide tailored solutions to support your business.",
  },
  {
    icon: "/icons/services/gradient/payroll.svg",
    name: "Compliance",
    individual:
      "Our Compliance Services provide you with a full spectrum of support to ensure you meet all legal and regulatory requirements in your personal affairs. Whether you need notary services, assistance with immigration documentation or even translation to comply with a process.",
    business:
      "Our Business Compliance Services are designed to ensure your company remains fully compliant with all legal and regulatory obligations. From managing annual registrations and filing sales taxes to overseeing payroll compliance, it is a comprehensive service.",
  },
];
