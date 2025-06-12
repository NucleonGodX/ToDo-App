import React, { useState } from "react";
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

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["P1", "P2", "P3", "P4"]),
  status: z.enum(["todo", "in-progress", "completed"]),
  dueDate: z.string().optional(),
  assignee: z.string().optional(),
});

export default function CreateTaskDialog({ open, onOpenChange, onSuccess }) {
  const { addTask } = useTaskStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: "P3",
      status: "todo",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const taskData = {
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate).toISOString()
          : undefined,
      };

      const response = await taskService.createTask(taskData);

      // Assuming backend returns the created task directly or in a specific format
      const createdTask = response.data.tasks
        ? response.data.tasks[0]
        : response.data;
      addTask(createdTask);
      toast.success("Task created successfully!");
      reset();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
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
          <DialogTitle className="text-slate-800">Create New Task</DialogTitle>
          <DialogDescription className="text-slate-500">
            Add a new task to your task list. Fill out the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 font-medium">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Design the new dashboard"
              className="border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add more details about the task..."
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee" className="text-slate-700 font-medium">
              Assignee
            </Label>
            <Input
              id="assignee"
              placeholder="e.g., jane.doe@example.com"
              className="border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              {...register("assignee")}
            />
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
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
