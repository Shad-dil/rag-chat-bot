"use client";
import React, { useState } from "react";
import { processPdfFile } from "./action";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const PDFUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setMessages(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await processPdfFile(formData);
      if (result.success) {
        setMessages({
          type: "success",
          text: result.message || "pdf processed success fully",
        });
        e.target.value = "";
      } else {
        setMessages({
          type: "error",
          text: result.message || "failed to process pdf",
        });
      }
    } catch (e) {
      setMessages({
        type: "error",
        text: `${e instanceof Error ? e.message : "not able to process"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-8 text-center">
          PDF Upload
        </h1>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <Label htmlFor="pdf-upload">Upload Pdf File</Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isLoading}
              />
              {isLoading && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-muted-foreground">
                    process your pdf...
                  </span>
                </div>
              )}
              {messages && (
                <Alert
                  variant={
                    messages.type === "error" ? "destructive" : "default"
                  }
                >
                  <AlertTitle>
                    {messages.type === "error" ? "Error" : "Success"}
                  </AlertTitle>
                  <AlertDescription>{messages.text}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PDFUpload;
