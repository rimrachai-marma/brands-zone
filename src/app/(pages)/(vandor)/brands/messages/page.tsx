"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

export default function VendorMessagesPage() {
  const messages = [
    {
      id: 1,
      customer: "Olivia Martin",
      subject: "Question about product warranty",
      preview: "Hi, I wanted to ask about the warranty period...",
      time: "10 min ago",
      unread: true,
    },
    {
      id: 2,
      customer: "Noah Williams",
      subject: "Order tracking inquiry",
      preview: "Can you provide tracking info for order #3209?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      customer: "Emma Brown",
      subject: "Product review",
      preview: "Just wanted to say the product is amazing!",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      customer: "Liam Jones",
      subject: "Return request",
      preview: "I would like to return my recent purchase...",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 5,
      customer: "Ava Davis",
      subject: "Bulk order inquiry",
      preview: "Do you offer discounts for bulk orders?",
      time: "3 days ago",
      unread: false,
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 mt-1">Communicate with your customers</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    className={`w-full text-left p-3 rounded-lg border ${
                      message.unread
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm text-slate-900">
                        {message.customer}
                      </p>
                      {message.unread && <Badge className="text-xs">New</Badge>}
                    </div>
                    <p className="text-xs font-medium text-slate-700 mb-1">
                      {message.subject}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {message.preview}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {message.time}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                Olivia Martin - Question about product warranty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="bg-slate-100 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">
                    Hi, I wanted to ask about the warranty period for the
                    Wireless Headphones Pro. Does it come with a manufacturer
                    warranty?
                  </p>
                  <p className="text-xs text-slate-500 mt-2">10 minutes ago</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Reply
                  </label>
                  <Textarea
                    placeholder="Type your message..."
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
