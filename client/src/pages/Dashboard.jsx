import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Kept in case you want to re-add search
import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";
import { taskService } from "@/services/taskService";
import TaskList from "@/components/TaskList";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import ParseTextDialog from "@/components/ParseTextDialog";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  // --- STATE MANAGEMENT ---
  // All dynamic data and filters are pulled from the central task store.
  const {
    tasks = [],
    isLoading = false,
    filters = {},
    pagination = {},
    setTasks,
    setLoading,
    setFilters,
    setPagination,
  } = useTaskStore();

  // Local state for controlling dialog visibility
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showParseDialog, setShowParseDialog] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    priority: { P1: 0, P2: 0, P3: 0, P4: 0 },
    status: { todo: 0, "in-progress": 0, completed: 0 },
  });

  // --- DATA FETCHING ---
  // This effect re-runs whenever the filters or page number change.
  useEffect(() => {
    loadTasks();
    loadStats();
  }, [filters?.priority, filters?.status, pagination?.currentPage]);

  // Fetches the aggregate stats for the top cards
  const loadStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  // Fetches the paginated and filtered list of tasks
  const loadTasks = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination?.currentPage || 1,
        limit: pagination?.limit || 10,
        sortBy: filters?.sortBy || "createdAt",
        sortOrder: filters?.sortOrder || "desc",
      };

      // Add filters to the API request if they are not 'all'
      if (filters?.priority && filters.priority !== "all") {
        params.priority = filters.priority;
      }
      if (filters?.status && filters.status !== "all") {
        params.status = filters.status;
      }
      if (filters?.search) {
        params.search = filters.search;
      }

      const response = await taskService.getTasks(params);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // --- EVENT HANDLERS ---
  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  // Note: The search handler is here if you wish to add the search bar back.
  const handleSearch = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, search: value });
    setPagination({ ...pagination, currentPage: 1 });
  };

  // Handler for Priority Filter. Sets the priority and resets to page 1.
  const handlePriorityFilter = (priority) => {
    setFilters({ ...filters, priority });
    setPagination({ ...pagination, currentPage: 1 });
  };

  // Handler for Status Filter. Sets the status and resets to page 1.
  const handleStatusFilter = (status) => {
    setFilters({ ...filters, status });
    setPagination({ ...pagination, currentPage: 1 });
  };

  // --- STYLE HELPERS ---
  // These functions keep the JSX clean by handling styling logic.

  // Returns the correct CSS classes for a priority button based on the active filter.
  const getPriorityButtonStyle = (priority, baseStyle, activeStyle) => {
    return filters.priority === priority ? activeStyle : baseStyle;
  };

  // Returns the correct CSS classes for a status button based on the active filter.
  const getStatusButtonStyle = (status) => {
    if (filters.status === status) {
      // Active styles
      switch (status) {
        case "in-progress":
          return "bg-white text-amber-600 shadow-sm";
        case "completed":
          return "bg-white text-green-600 shadow-sm";
        default:
          return "bg-white text-slate-800 shadow-sm";
      }
    } else {
      // Inactive styles
      switch (status) {
        case "in-progress":
          return "text-amber-600 hover:bg-white/50";
        case "completed":
          return "text-green-600 hover:bg-white/50";
        default:
          return "text-slate-600 hover:bg-white/50";
      }
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/70 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Taskflow AI Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowParseDialog(true)}
                className="text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              >
                <Upload className="h-4 w-4 mr-2" />
                Parse Text
              </Button>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-500 hover:bg-slate-200 rounded-full"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">
                {stats.priority.P1}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">
                {stats.status["in-progress"]}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {stats.status.completed}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="mb-6 bg-white border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Status Filter Controls */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusFilter("all")}
                  className={`w-full ${getStatusButtonStyle("all")}`}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusFilter("todo")}
                  className={`w-full ${getStatusButtonStyle("todo")}`}
                >
                  To Do
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusFilter("in-progress")}
                  className={`w-full ${getStatusButtonStyle("in-progress")}`}
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusFilter("completed")}
                  className={`w-full ${getStatusButtonStyle("completed")}`}
                >
                  Completed
                </Button>
              </div>

              {/* Priority Filter Controls */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handlePriorityFilter("all")}
                  className={getPriorityButtonStyle(
                    "all",
                    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100",
                    "bg-indigo-600 text-white hover:bg-indigo-700"
                  )}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePriorityFilter("P1")}
                  className={getPriorityButtonStyle(
                    "P1",
                    "bg-white text-red-600 border border-red-200 hover:bg-red-50",
                    "bg-red-500 text-white hover:bg-red-600"
                  )}
                >
                  P1
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePriorityFilter("P2")}
                  className={getPriorityButtonStyle(
                    "P2",
                    "bg-white text-orange-600 border border-orange-200 hover:bg-orange-50",
                    "bg-orange-500 text-white hover:bg-orange-600"
                  )}
                >
                  P2
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePriorityFilter("P3")}
                  className={getPriorityButtonStyle(
                    "P3",
                    "bg-white text-amber-600 border border-amber-200 hover:bg-amber-50",
                    "bg-amber-500 text-white hover:bg-amber-600"
                  )}
                >
                  P3
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePriorityFilter("P4")}
                  className={getPriorityButtonStyle(
                    "P4",
                    "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50",
                    "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                >
                  P4
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List Component */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onRefresh={() => {
            loadTasks();
            loadStats();
          }}
        />
      </main>

      {/* Dialog Components */}
      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={() => {
          loadTasks();
          loadStats();
        }}
      />

      <ParseTextDialog
        open={showParseDialog}
        onOpenChange={setShowParseDialog}
        onSuccess={() => {
          loadTasks();
          loadStats();
        }}
      />
    </div>
  );
}
