import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText } from "lucide-react";
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

const parseSchema = z.object({
  text: z.string().min(10, "Text must be at least 10 characters long"),
});

export default function ParseTextDialog({ open, onOpenChange, onSuccess }) {
  const { addBulkTasks } = useTaskStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(parseSchema),
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".txt") && !file.name.endsWith(".md")) {
      toast.error("Please upload a .txt or .md file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setValue("text", content, { shouldValidate: true });
    };
    reader.readAsText(file);
  };

  const parseText = async (data) => {
    setIsLoading(true);
    try {
      let response;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        response = await taskService.parseFile(formData);
      } else {
        response = await taskService.parseText({ text: data.text });
      }

      const tasks =
        response.data.tasks || (response.data.data && response.data.data.tasks);

      if (tasks && tasks.length > 0) {
        addBulkTasks(tasks);
        toast.success(`Successfully parsed and created ${tasks.length} tasks!`);
        handleClose();
        onSuccess();
      } else {
        toast.error("No tasks could be extracted from the text");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to parse text");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedFile(null);
    // Clear the file input visually
    document.getElementById("file-upload-input").value = "";
    onOpenChange(false);
  };

  // Note: This object is not used in the JSX but has been updated for consistency
  // in case you want to use it for displaying parsed tasks in the future.
  const priorityColors = {
    P1: "bg-red-100 text-red-700",
    P2: "bg-orange-100 text-orange-700",
    P3: "bg-amber-100 text-amber-700",
    P4: "bg-blue-100 text-blue-700",
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            Parse Natural Language Text
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Upload a file or paste text to automatically extract and create
            tasks using AI.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(parseText)} className="space-y-4 pt-4">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">
              Upload File (.txt or .md)
            </Label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
              <Upload className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 mb-2">
                Drop a file here or click to select
              </p>
              <Input
                id="file-upload-input"
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              {selectedFile && (
                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-indigo-600 font-medium">
                  <FileText className="h-4 w-4" />
                  <span>{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Text Input Section */}
          <div className="space-y-2">
            <Label htmlFor="text" className="text-slate-700 font-medium">
              Paste Text Content
            </Label>
            <Textarea
              id="text"
              placeholder="Paste your meeting notes, task descriptions, or any text containing tasks..."
              className="border-slate-300 min-h-[150px] focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              {...register("text")}
            />
            {errors.text && (
              <p className="text-sm text-red-600">{errors.text.message}</p>
            )}
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
              {isLoading ? "Parsing..." : "Parse & Create Tasks"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
