import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { taskService } from "@/services/taskService";
import { useTaskStore } from "@/store/taskStore";

const updateTaskSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  priority: z.enum(["P1", "P2", "P3", "P4"]),
  status: z.enum(["todo", "in-progress", "completed"]),
  dueDate: z.string().optional(),
  assignee: z.string().optional(),
});

export default function UpdateTaskDialog({
  open,
  onOpenChange,
  task,
  onSuccess,
}) {
  const { updateTask } = useTaskStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
  });

  // Populate form with task data when dialog opens
  useEffect(() => {
    if (task && open) {
      setValue("taskName", task.taskName || task.title || "");
      setValue("description", task.description || "");
      setValue("priority", task.priority || "P3");
      setValue("status", task.status || "todo");
      setValue("assignee", task.assignee || "");

      // Format date for the HTML date input
      if (task.dueDate) {
        try {
          const date = new Date(task.dueDate);
          const formattedDate = date.toISOString().split("T")[0];
          setValue("dueDate", formattedDate);
        } catch (e) {
          setValue("dueDate", "");
        }
      } else {
        setValue("dueDate", "");
      }
    }
  }, [task, open, setValue]);

  const onSubmit = async (data) => {
    if (!task) return;

    setIsLoading(true);

    const updateData = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
    };

    // Remove empty strings so they don't overwrite existing data
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === "" || updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    try {
      const response = await taskService.updateTask(task._id, updateData);
      updateTask(task._id, response.data.task);
      toast.success("Task updated successfully!");
      handleClose();

      setTimeout(() => {
        onSuccess();
      }, 100);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Update Task</DialogTitle>
          <DialogDescription className="text-slate-500">
            Modify the details of your existing task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="taskName" className="text-slate-700 font-medium">
              Task Name *
            </Label>
            <Input
              id="taskName"
              placeholder="Enter task name"
              className="border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              {...register("taskName")}
            />
            {errors.taskName && (
              <p className="text-sm text-red-600">{errors.taskName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              className="border-slate-300 min-h-[80px] focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-slate-700 font-medium">
                Priority
              </Label>
              <select
                id="priority"
                className="w-full h-10 px-3 py-2 text-sm border border-slate-300 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                {...register("priority")}
              >
                <option value="P1">P1 - Critical</option>
                <option value="P2">P2 - High</option>
                <option value="P3">P3 - Medium</option>
                <option value="P4">P4 - Low</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-700 font-medium">
                Status
              </Label>
              <select
                id="status"
                className="w-full h-10 px-3 py-2 text-sm border border-slate-300 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                {...register("status")}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-slate-700 font-medium">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                className="border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                {...register("dueDate")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-slate-700 font-medium">
                Assignee
              </Label>
              <Input
                id="assignee"
                placeholder="Enter assignee name"
                className="border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                {...register("assignee")}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="text-slate-700 border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isLoading ? "Updating..." : "Update Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
