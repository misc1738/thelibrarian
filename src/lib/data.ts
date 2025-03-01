
import { 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  CircleCheck, 
  Clock, 
  AlertTriangle, 
  BarChart4 
} from "lucide-react";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  status: 'available' | 'checked-out' | 'reserved' | 'processing';
  publishedYear: number;
  publisher: string;
  category: string;
  dueDate?: string;
};

export type Patron = {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  booksCheckedOut: number;
  status: 'active' | 'suspended' | 'expired';
  fines?: number;
};

export type StatsCard = {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
};

export type ActivityItem = {
  id: string;
  action: 'checkout' | 'return' | 'reserve' | 'cancel' | 'overdue';
  bookTitle: string;
  patronName: string;
  timestamp: string;
};

// Mock data for dashboard statistics
export const dashboardStats: StatsCard[] = [
  {
    title: "Total Books",
    value: "12,458",
    change: 3.2,
    icon: BookOpen,
    trend: "up",
  },
  {
    title: "Active Patrons",
    value: "3,642",
    change: 7.1,
    icon: Users,
    trend: "up",
  },
  {
    title: "Books Checked Out",
    value: "1,247",
    change: 2.5,
    icon: ArrowUpRight,
    trend: "up",
  },
  {
    title: "Overdue Items",
    value: "86",
    change: -12.3,
    icon: ArrowDownRight,
    trend: "down",
  },
];

// Mock data for books
export const books: Book[] = [
  {
    id: "b1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "978-0465050659",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1287&auto=format&fit=crop",
    status: "available",
    publishedYear: 2013,
    publisher: "Basic Books",
    category: "Design",
  },
  {
    id: "b2",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "978-0374533557",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1287&auto=format&fit=crop",
    status: "checked-out",
    publishedYear: 2011,
    publisher: "Farrar, Straus and Giroux",
    category: "Psychology",
    dueDate: "2024-06-15",
  },
  {
    id: "b3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "978-0593135204",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1287&auto=format&fit=crop",
    status: "available",
    publishedYear: 2021,
    publisher: "Ballantine Books",
    category: "Science Fiction",
  },
  {
    id: "b4",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1288&auto=format&fit=crop",
    status: "reserved",
    publishedYear: 2018,
    publisher: "Avery",
    category: "Self-Help",
  },
  {
    id: "b5",
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-0525559474",
    coverImage: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?q=80&w=1287&auto=format&fit=crop",
    status: "checked-out",
    publishedYear: 2020,
    publisher: "Viking",
    category: "Fiction",
    dueDate: "2024-06-22",
  },
  {
    id: "b6",
    title: "Educated",
    author: "Tara Westover",
    isbn: "978-0399590504",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1276&auto=format&fit=crop",
    status: "available",
    publishedYear: 2018,
    publisher: "Random House",
    category: "Memoir",
  },
];

// Mock data for patrons
export const patrons: Patron[] = [
  {
    id: "p1",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    memberSince: "2020-03-15",
    booksCheckedOut: 3,
    status: "active",
  },
  {
    id: "p2",
    name: "James Wilson",
    email: "james.wilson@example.com",
    memberSince: "2019-11-02",
    booksCheckedOut: 1,
    status: "active",
    fines: 5.25,
  },
  {
    id: "p3",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    memberSince: "2021-05-20",
    booksCheckedOut: 2,
    status: "active",
  },
  {
    id: "p4",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@example.com",
    memberSince: "2018-09-12",
    booksCheckedOut: 0,
    status: "expired",
  },
  {
    id: "p5",
    name: "Olivia Parker",
    email: "olivia.parker@example.com",
    memberSince: "2022-01-30",
    booksCheckedOut: 4,
    status: "active",
  },
];

// Mock data for recent activities
export const recentActivities: ActivityItem[] = [
  {
    id: "a1",
    action: "checkout",
    bookTitle: "The Midnight Library",
    patronName: "Emma Thompson",
    timestamp: "2024-06-05T14:32:00Z",
  },
  {
    id: "a2",
    action: "return",
    bookTitle: "Dune",
    patronName: "James Wilson",
    timestamp: "2024-06-05T11:45:00Z",
  },
  {
    id: "a3",
    action: "reserve",
    bookTitle: "A Promised Land",
    patronName: "Sophia Chen",
    timestamp: "2024-06-05T09:17:00Z",
  },
  {
    id: "a4",
    action: "overdue",
    bookTitle: "Sapiens: A Brief History of Humankind",
    patronName: "Olivia Parker",
    timestamp: "2024-06-04T23:59:00Z",
  },
  {
    id: "a5",
    action: "checkout",
    bookTitle: "Thinking, Fast and Slow",
    patronName: "James Wilson",
    timestamp: "2024-06-04T16:23:00Z",
  },
  {
    id: "a6",
    action: "cancel",
    bookTitle: "The Great Gatsby",
    patronName: "Michael Rodriguez",
    timestamp: "2024-06-04T12:10:00Z",
  },
];

// Chart data for book trends
export const circulationTrends = [
  { month: "Jan", checkouts: 245, returns: 198 },
  { month: "Feb", checkouts: 267, returns: 230 },
  { month: "Mar", checkouts: 286, returns: 271 },
  { month: "Apr", checkouts: 304, returns: 280 },
  { month: "May", checkouts: 332, returns: 305 },
  { month: "Jun", checkouts: 350, returns: 325 },
];

// Top categories data
export const topCategories = [
  { name: "Fiction", count: 3245, percentage: 26 },
  { name: "Science", count: 2102, percentage: 17 },
  { name: "History", count: 1879, percentage: 15 },
  { name: "Technology", count: 1654, percentage: 13 },
  { name: "Arts", count: 1254, percentage: 10 },
];

// Status icons mapping
export const statusIcons = {
  'available': CircleCheck,
  'checked-out': ArrowUpRight,
  'reserved': Clock,
  'processing': BarChart4,
  'overdue': AlertTriangle,
};
