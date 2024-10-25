export const sidebarLinks = [
  {
    imgURL: "/icons/sidebar/dashboard.svg",
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: "/icons/sidebar/services.svg",
    route: "/dashboard/services",
    label: "Services",
  },
  {
    imgURL: "/icons/sidebar/user.svg",
    route: "/dashboard/profile",
    label: "Profile",
  },
  {
    imgURL: "/icons/sidebar/message.svg",
    route: "/dashboard/chat",
    label: "Chat",
  },
  {
    imgURL: "/icons/sidebar/settings.svg",
    route: "/dashboard/settings",
    label: "Settings",
  },
];

export const clientServiceNavbar = [
  {
    label: "Explore our services",
    route: "/dashboard/services",
  },
  {
    label: "My services",
    route: "/dashboard/services/client",
  },
];

export const adminSidebarLinks = [
  {
    imgURL: "/icons/sidebar/dashboard.svg",
    route: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: "/icons/sidebar/services.svg",
    route: "/admin/services/service-request",
    label: "Services",
  },
  {
    imgURL: "/icons/sidebar/users.svg",
    route: "/admin/users/individual",
    label: "Users",
  },
  {
    imgURL: "/icons/sidebar/company.svg",
    route: "/admin/users/company",
    label: "Company",
  },
  {
    imgURL: "/icons/sidebar/Task-check.svg",
    route: "/admin/dashboard/tasks",
    label: "Tasks",
  },
  {
    imgURL: "/icons/sidebar/sms.svg",
    route: "/admin/dashboard/sms",
    label: "SMS",
  },
  {
    imgURL: "/icons/sidebar/call.svg",
    route: "/admin/dashboard/call",
    label: "Call",
  },

  {
    imgURL: "/icons/sidebar/user.svg",
    route: "/admin/profile",
    label: "Profile",
  },
  {
    imgURL: "/icons/sidebar/settings.svg",
    route: "/admin/dashboard/settings",
    label: "Settings",
  },
];

export const adminSecondaryNavbarLinks = [
  {
    label: "Overview",
    route: "/admin/dashboard/overview",
  },
  {
    label: "Admin",
    route: "/admin/dashboard/admin-overview",
  },
];

export const adminUsersSecondaryNavbarLinks = [
  {
    label: "Individual",
    route: "/admin/users/individual",
  },
  {
    label: "Company",
    route: "/admin/users/company",
  },
];

export const adminProfileSecondaryNavbarLinks = [
  {
    label: "Home",
    route: "/admin/profile",
  },
  {
    label: "Communication",
    route: "/admin/profile/communication",
  },
  {
    label: "Notes",
    route: "/admin/profile/notes",
  },
  {
    label: "Files",
    route: "/admin/profile/files",
  },
];

export const otherLinks = {
  helpAndSupport: {
    imgURL: "/icons/sidebar/help.svg",
    route: "/dashboard/help",
    label: "Help and Support",
  },
};

export const topBarLinks = [
  {
    imgURL: "/icons/calendar-top-nav.svg",
    route: "/",
  },
  {
    imgURL: "/icons/message-top-nav.svg",
    route: "/",
  },
  {
    imgURL: "/icons/notification-top-nav.svg",
    route: "/",
  },
];

export const homeCards = [
  {
    type: "welcome",
    imgURL: "/images/welcome.png",
    heading: "Hey, Bassie",
    description: "Sunday, Aug 25, 2024",
    buttonText: "Make Appointment",
  },
  {
    type: "basic",
    imgURL: "/images/collect.png",
    heading: "We Collect",
    description: "Choose the document type and upload it for the service",
    buttonText: "Get Started",
  },
  {
    type: "basic",
    imgURL: "/images/process.png",
    heading: "We Process",
    description: "Monitor the progress of your document processing.",
    buttonText: "Track Processing Status",
  },
  {
    type: "basic",
    imgURL: "/images/deliver.png",
    heading: "We Deliver",
    description: "Access and review the finalized documents for your service.",
    buttonText: " View Completed Results",
  },
];

export const cardItemList = [
  {
    title: "Tax return file",
    description: "Uploaded by Nahid 10 dasy ago",
    link: "/",
    icon: "/icons/files/doc.svg",
  },
  {
    title: "Service equest file",
    description: "Uploaded by Nahid 10 dasy ago",
    link: "/",
    icon: "/icons/files/pdf.svg",
  },
  {
    title: "Service request file",
    description: "Uploaded by Nahid 10 dasy ago",
    link: "/",
    icon: "/icons/files/xls.svg",
  },
  {
    title: "Service request file",
    description: "Uploaded by Nahid 10 dasy ago",
    link: "/",
    icon: "/icons/files/xls.svg",
  },
  {
    title: "Service equest file",
    description: "Uploaded by Nahid 10 dasy ago",
    link: "/",
    icon: "/icons/files/pdf.svg",
  },
];

export const serviceList: any[] = [
  {
    title: "Service Type 1",
    description: "Due August 24, 2024",
    link: "/",
    icon: "/icons/services/1.svg",
  },
  {
    title: "Service request file",
    description: "Due August 24, 2024",
    link: "/",
    icon: "/icons/services/2.svg",
  },
  {
    title: "Service request file",
    description: "Due August 24, 2024",
    link: "/",
    icon: "/icons/services/3.svg",
  },
  {
    title: "Service request file",
    description: "Due August 24, 2024",
    link: "/",
    icon: "/icons/services/4.svg",
  },
  {
    title: "Service equest file",
    description: "Due August 24, 2024",
    link: "/",
    icon: "/icons/services/5.svg",
  },
];

export enum ChatState {
  READ = "read",
  UNREAD = "unread",
  TYPING = "typing",
  SEEN = "seen",
  SENT = "sent",
}
export enum ChatStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}
export const chatList = [
  {
    name: "Habibullah Nahid",
    message: "you need to improve now.",
    time: "10:20 AM",
    unreadText: 3,
    state: ChatState.READ,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Imruk Kayes",
    message: "you need to improve now.",
    time: "03:20 PM",
    unreadText: 3,
    state: ChatState.UNREAD,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-2.png",
  },
  {
    name: "Wahid Nafis",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.TYPING,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-3.png",
  },
  {
    name: "Rocky Mountain",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SEEN,
    status: ChatStatus.OFFLINE,
    avatarURL: "/avatars/avatar-bessie-.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
];

export const messageList = [
  {
    name: "Habibullah Nahid",
    message: "you need to improve now.",
    time: "10:20 AM",
    unreadText: 3,
    state: ChatState.READ,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-3.png",
  },
  {
    name: "Imruk Kayes",
    message: "you need to improve now.",
    time: "03:20 PM",
    unreadText: 3,
    state: ChatState.UNREAD,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-2.png",
  },
  {
    name: "Wahid Nafis",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.TYPING,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-3.png",
  },
  {
    name: "Rocky Mountain",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SEEN,
    status: ChatStatus.OFFLINE,
    avatarURL: "/avatars/avatar-bessie-.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Imruk Kayes",
    message: "you need to improve now.",
    time: "03:20 PM",
    unreadText: 3,
    state: ChatState.UNREAD,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-2.png",
  },
  {
    name: "Wahid Nafis",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.TYPING,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-3.png",
  },
  {
    name: "Rocky Mountain",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SEEN,
    status: ChatStatus.OFFLINE,
    avatarURL: "/avatars/avatar-bessie-.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
  {
    name: "Mifta John",
    message: "you need to improve now.",
    time: "10:20 AM",
    state: ChatState.SENT,
    status: ChatStatus.ONLINE,
    avatarURL: "/avatars/avatar-1.png",
  },
];
export const mockCallData: any[] = [
  {
    id: 1,
    avatarUrl: "/avatars/avatar-1.png",
    name: "John Doe",
    callStatus: "received",
    timestamp: "July 14, 11:15 AM",
    duration: "26:56",
  },
  {
    id: 2,
    avatarUrl: "/avatars/avatar-2.png",
    name: "Jane Smith",
    callStatus: "missed",
    timestamp: "July 13, 09:40 AM",
    duration: "02:15",
  },
  {
    id: 3,
    avatarUrl: "/avatars/avatar-3.png",
    name: "Michael Johnson",
    callStatus: "outward",
    timestamp: "July 12, 03:45 PM",
    duration: "12:34",
  },
  {
    id: 4,
    avatarUrl: "/avatars/avatar-4.png",
    name: "Emily Davis",
    callStatus: "received",
    timestamp: "July 11, 07:20 AM",
    duration: "15:20",
  },
  {
    id: 5,
    avatarUrl: "/avatars/avatar-5.png",
    name: "Christopher Brown",
    callStatus: "missed",
    timestamp: "July 10, 10:35 AM",
    duration: "05:45",
  },
  {
    id: 6,
    avatarUrl: "/avatars/avatar-6.png",
    name: "Patricia Wilson",
    callStatus: "outward",
    timestamp: "July 9, 08:25 PM",
    duration: "08:50",
  },
  {
    id: 7,
    avatarUrl: "/avatars/avatar-7.png",
    name: "James Taylor",
    callStatus: "received",
    timestamp: "July 8, 01:15 PM",
    duration: "22:10",
  },
  {
    id: 8,
    avatarUrl: "/avatars/avatar-8.png",
    name: "Linda Martinez",
    callStatus: "missed",
    timestamp: "July 7, 02:30 PM",
    duration: "01:30",
  },
  {
    id: 9,
    avatarUrl: "/avatars/avatar-9.png",
    name: "Robert Anderson",
    callStatus: "outward",
    timestamp: "July 6, 04:45 PM",
    duration: "18:20",
  },
  {
    id: 10,
    avatarUrl: "/avatars/avatar-10.png",
    name: "Elizabeth Thomas",
    callStatus: "received",
    timestamp: "July 5, 06:55 AM",
    duration: "30:00",
  },
];

export const mockChatMessages = [
  {
    id: 1,
    name: "Johe Doe",
    timestamp: "08:34 AM",
    message: "Hello, this is a sample message!",
    type: "received",
    profilePhoto: "/avatars/avatar-3.png",
  },
  {
    id: 2,
    name: "You",
    timestamp: "08:35 AM",
    message: "Thanks for the message! Here's my response.",
    type: "sent",
    status: "Sent",
  },
  {
    id: 3,
    name: "You",
    timestamp: "08:36 AM",
    message: "Just checking if you received my message.",
    type: "sent",
    status: "Seen",
  },
  {
    id: 4,
    name: "You",
    timestamp: "08:36 AM",
    message:
      "Just checking if you received my message. Just checking if you received my message. Just checking if you received my message. Just checking if you received my message. Just checking if you received my message. Just checking if you received my message.",
    type: "sent",
    status: "Seen",
  },
];

export const smsData = [
  {
    id: 1,
    name: "Alice Johnson",
    timestamp: "08:30 AM",
    message: [
      "Hey, just wanted to check in and see how you're doing.",
      "Let me know if you need anything!",
    ],
    type: "received",
    profilePhoto: "/avatars/avatar-1.png",
  },
  {
    id: 2,
    name: "Bob Smith",
    timestamp: "08:32 AM",
    message: [
      "Good morning! I got your message and will get back to you shortly.",
      "Hope you have a great day!",
    ],
    type: "sent",
    profilePhoto: "/avatars/avatar-2.png",
  },
  {
    id: 3,
    name: "Alice Johnson",
    timestamp: "08:34 AM",
    message: ["No rush!", "Just wanted to catch up. 😊"],
    type: "received",
    profilePhoto: "/avatars/avatar-1.png",
  },
  {
    id: 4,
    name: "Bob Smith",
    timestamp: "08:36 AM",
    message: ["Sounds great!", "I'll call you later today."],
    type: "sent",
    profilePhoto: "/avatars/avatar-2.png",
  },
  {
    id: 5,
    name: "Alice Johnson",
    timestamp: "08:38 AM",
    message: ["Looking forward to it!", "Talk soon."],
    type: "received",
    profilePhoto: "/avatars/avatar-1.png",
  },
  {
    id: 6,
    name: "Charlie Brown",
    timestamp: "08:40 AM",
    message: [
      "Hey, Alice.",
      "Can you send me the report by noon?",
      "Can you send me the report by noon?",
    ],
    type: "received",
    profilePhoto: "/avatars/avatar-3.png",
  },
  {
    id: 7,
    name: "Alice Johnson",
    timestamp: "08:42 AM",
    message: ["Sure, I'll get that to you by then."],
    type: "sent",
    profilePhoto: "/avatars/avatar-1.png",
  },
  {
    id: 8,
    name: "Charlie Brown",
    timestamp: "08:45 AM",
    message: ["Thanks! I appreciate it."],
    type: "received",
    profilePhoto: "/avatars/avatar-3.png",
  },
];

export const smsMockData = [
  {
    id: 1,
    avatarURL: "/avatars/avatar-1.png",
    name: "Alice Johnson",
    message: [
      "Hey there!",
      "Just wanted to check in and see how you're doing.",
    ],
    time: "08:15 AM",
    status: "seen", // or "sent"
  },
  {
    id: 2,
    avatarURL: "/avatars/avatar-2.png",
    name: "Bob Smith",
    message: [
      "Good morning!",
      "I received your message and will get back to you shortly.",
    ],
    time: "08:20 AM",
    status: "sent",
  },
  {
    id: 3,
    avatarURL: "/avatars/avatar-1.png",
    name: "Alice Johnson",
    message: ["No rush!", "Just catching up. 😊"],
    time: "08:22 AM",
    status: "seen",
  },
  {
    id: 4,
    avatarURL: "/avatars/avatar-2.png",
    name: "Bob Smith",
    message: ["Sounds good!", "I'll call you later today."],
    time: "08:25 AM",
    status: "sent",
  },
  {
    id: 5,
    avatarURL: "/avatars/avatar-3.png",
    name: "Charlie Brown",
    message: ["Hey, Alice.", "Can you send me the report by noon?"],
    time: "08:30 AM",
    status: "sent",
  },
  {
    id: 6,
    avatarURL: "/avatars/avatar-1.png",
    name: "Alice Johnson",
    message: ["Sure, I'll have it ready for you."],
    time: "08:35 AM",
    status: "sent",
  },
];
