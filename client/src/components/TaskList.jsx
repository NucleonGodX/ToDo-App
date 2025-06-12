import React, { useState } from "react";
import { format, isToday, isPast } from "date-fns";
import {
  Edit,
  Trash2,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { taskService } from "@/services/taskService";
import { useTaskStore } from "@/store/taskStore";
import UpdateTaskDialog from "./UpdateTaskDialog";
import TaskStatusUpdateDialog from "./TaskStatusUpdateDialog";

// Updated color objects for consistency
const priorityColors = {
  P1: "bg-red-100 text-red-700 border-red-200",
  P2: "bg-orange-100 text-orange-700 border-orange-200",
  P3: "bg-amber-100 text-amber-700 border-amber-200",
  P4: "bg-blue-100 text-blue-700 border-blue-200",
};

const statusColors = {
  todo: "bg-slate-100 text-slate-700 border-slate-200",
  "in-progress": "bg-amber-100 text-amber-700 border-amber-200",
  completed: "bg-green-100 text-green-700 border-green-200",
};

export default function TaskList({
  tasks,
  isLoading,
  onRefresh,
  pagination,
  onPageChange,
}) {
  const { removeTask, updateTask } = useTaskStore();
  const [deleteDialog, setDeleteDialog] = useState({ open: false, task: null });
  const [updateDialog, setUpdateDialog] = useState({ open: false, task: null });
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    task: null,
    newStatus: null,
  });
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteDialog.task) return;
    try {
      await taskService.deleteTask(deleteDialog.task._id);
      removeTask(deleteDialog.task._id);
      toast.success("Task deleted successfully");
      setDeleteDialog({ open: false, task: null });
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleStatusUpdate = async () => {
    if (!statusDialog.task || !statusDialog.newStatus) return;
    setStatusUpdateLoading(true);
    try {
      const response = await taskService.updateTask(statusDialog.task._id, {
        status: statusDialog.newStatus,
      });
      updateTask(statusDialog.task._id, response.data.task);
      toast.success("Task status updated");
      setStatusDialog({ open: false, task: null, newStatus: null });
      setTimeout(() => onRefresh(), 100);
    } catch (error) {
      toast.error("Failed to update task status");
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleQuickStatusChange = (task, newStatus) => {
    setStatusDialog({ open: true, task, newStatus });
  };

  const getDueDateColor = (dueDateStr) => {
    if (!dueDateStr) return "text-slate-500";
    const dueDate = new Date(dueDateStr);
    if (isPast(dueDate) && !isToday(dueDate)) {
      return "text-red-600";
    }
    return "text-slate-500";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse bg-white p-4">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-16 bg-white border-dashed border-slate-300">
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-indigo-100 rounded-full">
              <AlertCircle className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No Tasks Found
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              It looks like there are no tasks matching your current filters.
              Try creating a new one!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task._id}
            className={`border-l-4 bg-white hover:shadow-lg transition-shadow duration-200 ${
              task.status === "completed"
                ? "border-l-green-500"
                : task.status === "in-progress"
                ? "border-l-amber-500"
                : "border-l-slate-400"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-slate-800 mb-2">
                    {task.taskName || task.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                        priorityColors[task.priority] || priorityColors.P4
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                        statusColors[task.status] || statusColors.todo
                      }`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {task.status !== "completed" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuickStatusChange(task, "completed")}
                      className="text-slate-500 hover:text-green-600 hover:bg-green-100 h-8 w-8"
                      title="Mark as completed"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  {task.status === "todo" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleQuickStatusChange(task, "in-progress")
                      }
                      className="text-slate-500 hover:text-amber-600 hover:bg-amber-100 h-8 w-8"
                      title="Start working"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  {task.status === "completed" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuickStatusChange(task, "todo")}
                      className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 h-8 w-8"
                      title="Move back to To Do"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUpdateDialog({ open: true, task })}
                    className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 h-8 w-8"
                    title="Edit task"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteDialog({ open: true, task })}
                    className="text-slate-500 hover:text-red-600 hover:bg-red-100 h-8 w-8"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {task.description && (
                <p className="text-slate-600 mb-4 text-sm">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-slate-500">
                {task.dueDate && (
                  <div
                    className={`flex items-center gap-1.5 ${getDueDateColor(
                      task.dueDate
                    )}`}
                  >
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(new Date(task.dueDate), "MMM dd, yyyy")}
                    </span>
                  </div>
                )}
                {task.assignee && (
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>{task.assignee}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="text-sm text-slate-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, task: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-slate-800">Delete Task</DialogTitle>
            <DialogDescription className="text-slate-500">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, task: null })}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateTaskDialog
        open={updateDialog.open}
        onOpenChange={(open) => setUpdateDialog({ open, task: null })}
        task={updateDialog.task}
        onSuccess={onRefresh}
      />
      <TaskStatusUpdateDialog
        open={statusDialog.open}
        onOpenChange={() =>
          setStatusDialog({ open: false, task: null, newStatus: null })
        }
        task={statusDialog.task}
        newStatus={statusDialog.newStatus}
        onConfirm={handleStatusUpdate}
        isLoading={statusUpdateLoading}
      />
    </>
  );
}
