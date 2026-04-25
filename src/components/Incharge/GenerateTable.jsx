import React, { useState, useEffect } from "react";
import GenerateTableHeader from "./GenerateTable/GenerateTableHeader";
import NoSessionCreated from "./GenerateTable/NoSessionCreated";
import SessionList from "./academicSession/SessionList";
import CreateSessionModal from "./academicSession/CreateSessionModal";
import SearchBar from "./GenerateTable/SearchBar";

const GenerateTable = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("GenerateTable rendered, sessions:", sessions);

  // Load sessions from localStorage on mount
  useEffect(() => {
    console.log("Loading sessions from localStorage");
    const savedSessions = localStorage.getItem("academicSessions");
    if (savedSessions) {
      console.log("Found saved sessions:", JSON.parse(savedSessions));
      setSessions(JSON.parse(savedSessions));
      setFilteredSessions(JSON.parse(savedSessions));
    } else {
      // Add demo data for testing
      const demoSessions = [
        {
          id: 1,
          name: "2024-25",
          type: "EVEN",
          status: "Active",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "2023-24",
          type: "ODD",
          status: "Inactive",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "2025-26",
          type: "EVEN",
          status: "Active",
          createdAt: new Date().toISOString(),
        },
        {
          id: 4,
          name: "2022-23",
          type: "ODD",
          status: "Inactive",
          createdAt: new Date().toISOString(),
        },
      ];
      console.log("No saved sessions, adding demo data:", demoSessions);
      setSessions(demoSessions);
      setFilteredSessions(demoSessions);
    }
  }, []);

  // Filter sessions based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter((session) =>
        session.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredSessions(filtered);
    }
  }, [searchQuery, sessions]);

  // Save to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      console.log("Saving sessions to localStorage:", sessions);
      localStorage.setItem("academicSessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  const handleAddSession = (newSession) => {
    console.log("Adding new session:", newSession);
    const sessionWithId = {
      ...newSession,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSessions((prev) => {
      console.log("Previous sessions:", prev);
      const updated = [...prev, sessionWithId];
      console.log("Updated sessions:", updated);
      return updated;
    });
    setIsModalOpen(false);
  };

  const handleEditSession = (updatedSession) => {
    console.log("🔄 EDIT FUNCTION CALLED with:", updatedSession);
    setSessions((prev) => {
      const updated = prev.map((session) =>
        session.id === updatedSession.id ? updatedSession : session,
      );
      console.log("Sessions after edit:", updated);
      return updated;
    });
  };

  const handleDeleteSession = (id) => {
    console.log("🗑️ DELETE FUNCTION CALLED for id:", id);
    setSessions((prev) => {
      const updated = prev.filter((session) => session.id !== id);
      console.log("Sessions after delete:", updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GenerateTableHeader
          onAddSession={() => {
            console.log("Add Session button clicked");
            setIsModalOpen(true);
          }}
          sessionCount={filteredSessions.length}
          totalSessions={sessions.length}
        />

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredSessions.length}
        />

        {filteredSessions.length === 0 ? (
          searchQuery ? (
            <NoSearchResults
              searchQuery={searchQuery}
              onClear={() => setSearchQuery("")}
            />
          ) : (
            <NoSessionCreated
              onAddSession={() => {
                console.log("Create first session clicked");
                setIsModalOpen(true);
              }}
            />
          )
        ) : (
          <SessionList
            sessions={filteredSessions}
            onEdit={handleEditSession}
            onDelete={handleDeleteSession}
          />
        )}

        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={() => {
            console.log("Closing modal");
            setIsModalOpen(false);
          }}
          onSave={handleAddSession}
        />
      </div>
    </div>
  );
};

export default GenerateTable;
