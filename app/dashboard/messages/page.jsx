"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare, ArrowLeft, Trash2, Mail, MailOpen, Search, X, Clock, User, Send } from "lucide-react"
import PageLoader from "@/components/page-loader"

// Message detail modal component
function MessageModal({ message, isOpen, onClose, onMarkRead, onDelete }) {
  if (!isOpen || !message) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl max-w-2xl w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{message.name}</h3>
              <p className="text-sm text-muted-foreground">{message.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="w-4 h-4" />
            {new Date(message.createdAt).toLocaleString()}
          </div>

          <h4 className="text-lg font-semibold text-foreground mb-4">{message.subject}</h4>

          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary/30">
          <button
            onClick={() => onMarkRead(message._id, !message.read)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            {message.read ? (
              <>
                <Mail className="w-4 h-4" />
                Mark as Unread
              </>
            ) : (
              <>
                <MailOpen className="w-4 h-4" />
                Mark as Read
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${message.email}?subject=Re: ${message.subject}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Reply
            </a>
            <button
              onClick={() => {
                onDelete(message._id)
                onClose()
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState("all") // all, unread, read

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages")
      const data = await res.json()
      setMessages(data)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id, read) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      })
      setMessages(messages.map((m) => (m._id === id ? { ...m, read } : m)))
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read })
      }
    } catch (error) {
      console.error("Failed to update message:", error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" })
      setMessages(messages.filter((m) => m._id !== id))
    } catch (error) {
      console.error("Failed to delete message:", error)
    }
  }

  const openMessage = (message) => {
    setSelectedMessage(message)
    if (!message.read) {
      handleMarkRead(message._id, true)
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "unread") return matchesSearch && !message.read
    if (filter === "read") return matchesSearch && message.read
    return matchesSearch
  })

  const unreadCount = messages.filter((m) => !m.read).length

  if (loading) {
    return <PageLoader message="Loading messages..." />
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-xl">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-muted-foreground">View and manage contact form submissions</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {["all", "unread", "read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No messages found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Messages from your contact form will appear here"}
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {filteredMessages.map((message, index) => (
              <div
                key={message._id}
                onClick={() => openMessage(message)}
                className={`flex items-start gap-4 p-5 cursor-pointer hover:bg-secondary/50 transition-colors ${
                  index !== filteredMessages.length - 1 ? "border-b border-border" : ""
                } ${!message.read ? "bg-primary/5" : ""}`}
              >
                {/* Read indicator */}
                <div className="pt-1">
                  {message.read ? (
                    <MailOpen className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Mail className="w-5 h-5 text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h3
                      className={`font-medium truncate ${!message.read ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {message.name}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate mb-1 ${!message.read ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {message.subject}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      <MessageModal
        message={selectedMessage}
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        onMarkRead={handleMarkRead}
        onDelete={handleDelete}
      />
    </div>
  )
}
