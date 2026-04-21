'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@components/ui/button';
import {
  GraduationCap,
  LogOut,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  FileText,
  Menu,
  X,
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  progress: number;
  credits: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    studentId: 'STU001',
  });

  const courses: Course[] = [
    {
      id: '1',
      name: 'Advanced Calculus',
      code: 'MATH301',
      instructor: 'Dr. Smith',
      progress: 85,
      credits: 4,
    },
    {
      id: '2',
      name: 'Data Structures',
      code: 'CS201',
      instructor: 'Prof. Johnson',
      progress: 92,
      credits: 3,
    },
    {
      id: '3',
      name: 'Physics II',
      code: 'PHYS102',
      instructor: 'Dr. Williams',
      progress: 78,
      credits: 4,
    },
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set 5',
      course: 'MATH301',
      dueDate: '2024-04-25',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Binary Search Tree Implementation',
      course: 'CS201',
      dueDate: '2024-04-22',
      status: 'submitted',
    },
    {
      id: '3',
      title: 'Physics Lab Report',
      course: 'PHYS102',
      dueDate: '2024-04-20',
      status: 'graded',
    },
  ];

  const gpa = 3.75;
  const totalCredits = 11;
  const completedCredits = 11;

  const handleLogout = () => {
    window.location.href = '/';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Portal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.studentId}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.studentId}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="w-full gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your academic overview for this semester
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* GPA Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
                <p className="text-3xl font-bold text-foreground">{gpa}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </div>

          {/* Credits Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Credits</p>
                <p className="text-3xl font-bold text-foreground">
                  {completedCredits}/{totalCredits}
                </p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Completed this semester</p>
          </div>

          {/* Courses Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Courses</p>
                <p className="text-3xl font-bold text-foreground">{courses.length}</p>
              </div>
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Enrolled courses</p>
          </div>

          {/* Pending Assignments Card */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold text-foreground">
                  {assignments.filter((a) => a.status === 'pending').length}
                </p>
              </div>
              <AlertCircle className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Assignments to submit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                My Courses
              </h2>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {course.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {course.code} • {course.instructor}
                        </p>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {course.credits} credits
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {course.progress}% complete
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div>
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming
              </h2>

              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border border-border rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <p className="font-medium text-foreground text-sm mb-2">
                      {assignment.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {assignment.course}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {getDaysUntilDue(assignment.dueDate)} days
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded capitalize ${getStatusColor(
                          assignment.status
                        )}`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-secondary/30 rounded-lg border border-border p-6 mt-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 text-primary hover:underline text-sm">
                  <FileText className="w-4 h-4" />
                  View Grades
                </button>
                <button className="w-full flex items-center gap-2 text-primary hover:underline text-sm">
                  <Users className="w-4 h-4" />
                  Message Instructors
                </button>
                <button className="w-full flex items-center gap-2 text-primary hover:underline text-sm">
                  <BookOpen className="w-4 h-4" />
                  Course Materials
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
