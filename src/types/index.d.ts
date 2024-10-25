declare type User = {
  $id: string;
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  userType: string;
  userPhoto: string;
};

declare interface SiderbarProps {
  user: User;
}

declare interface Topbarprops {
  user?: any;
  pageTitle: string;
  searchString: string;
}

declare interface SearchProps {
  searchString: strintg;
}

declare interface DividerProps {
  style?: string;
}
declare interface ItemListProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

declare interface DashboardCardProps {
  type?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  imgURL?: string;
  className?: string;
  buttonLink: string;
  itemList?: ItemListProps[];
}

declare interface CardItemListProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

declare interface ChatListProps {
  name: string;
  message: string;
  time: string;
  unreadText?: number;
  state: "read" | "unread" | "typing" | "seen" | "sent";
  status: "online" | "offline";
  avatarURL?: string;
}

declare interface ChatCardProps {
  heading: string;
  buttonText: string;
  buttonLink: string;
  chatList: ChatListProps[];
}

declare type Status = "pending" | "approved" | "rejected" | "in review";

declare interface Employment {
  id: string;
  employer: string;
  jobTitle: string;
  type: string;
  address?: string;
  email?: string;
  phone?: string;
  startDate: Date;
}

declare interface Spouse {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  ssn?: string;
  dob?: Date;
}

declare interface Dependent {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  ssn?: string;
  dob?: Date;
  relationship: string;
}

declare interface Finance {
  id: string;
  incomeType: string;
  amount: number;
  taxFillingStatus?: string;
}

declare interface IndividualProfile {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: string;
  ssn?: string;
  dob?: Date;
  maritalStatus?: string;
  dependents?: Dependent[];
  finances?: Finance[];
  spouse?: Spouse[];
  employment: Employment[];
}
declare interface BusinessProfile {
  id: string;
  legalName: string;
  dba: string;
  ein?: string;
  structure?: string;
}
declare interface IClientProfile {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  individualProfile?: IndividualProfile;
  businessProfile?: BusinessProfile;
}
declare interface IClient {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  individualProfile?: IndividualProfile;
  businessProfiles: BusinessProfile[];
}

declare interface IUser {
  id: string;
  // clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  client?: IClient;
}

declare interface IServiceDocument {
  fileName: string;
  year: string;
  googleDriveId: string;
  googleDrivePath: string;
  serviceRequestId: string;
}
declare interface IServiceRequest {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  documents: IServiceDocument[];
}
