"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import BlinkingCursor from "./BlinkingCursor";
import AboutSectionContent from "./AboutSectionContent";
import ProjectsSectionContent from "./ProjectsSectionContent";
import ContactSectionContent from "./ContactSectionContent";

interface HistoryEntry {
  id: number;
  type: "command" | "output" | "component" | "error" | "system";
  content: string | JSX.Element;
}

const TerminalPrompt: React.FC = () => (
  <span className="text-base md:text-lg mr-2 shrink-0">
    {" "}
    {/* Adjusted prompt size */}
    <span className="text-accent">user</span>
    <span className="text-foreground">@</span>
    <span className="text-primary">ifeanyidotdev</span>
    <span className="text-foreground">:~$</span>
  </span>
);

const TerminalInterface: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([
      {
        id: Date.now(),
        type: "system",
        content: 'Welcome User! Type "help" to see available commands.',
      },
    ]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (inputRef.current && terminalContainerRef.current) {
        let target = event.target as HTMLElement;
        let isInteractive = false;
        // Traverse up the DOM tree from the click target
        while (target && target !== terminalContainerRef.current) {
          // Check for common interactive elements by tag name
          if (
            ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(
              target.tagName,
            ) ||
            // Check for elements with specific ARIA roles implying interactivity
            target.closest(
              '[role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="slider"], [role="switch"], [role="tab"], [role="option"]',
            ) ||
            // Check if the element is content editable
            target.isContentEditable
          ) {
            isInteractive = true;
            break;
          }
          target = target.parentElement as HTMLElement;
        }
        // If the click was not on an interactive element (or its descendant), focus the main input
        if (!isInteractive) {
          inputRef.current.focus();
        }
      }
    };
    const currentTerminalContainer = terminalContainerRef.current;
    currentTerminalContainer?.addEventListener("click", handleClick);
    return () => {
      currentTerminalContainer?.removeEventListener("click", handleClick);
    };
  }, []);

  const processCommand = useCallback(async (commandStr: string) => {
    setIsProcessing(true);

    const commandToAdd: HistoryEntry = {
      id: Date.now(),
      type: "command",
      content: commandStr,
    };
    // Use a functional update to ensure we're working with the latest history state
    setHistory((prev) => [...prev, commandToAdd]);

    const [command, ...args] = commandStr.trim().toLowerCase().split(/\s+/);
    let outputEntry: HistoryEntry | null = null;

    // Simulate processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 100 + Math.random() * 200),
    );

    switch (command) {
      case "help":
        outputEntry = {
          id: Date.now() + 1,
          type: "output",
          content: (
            <>
              <p>Available commands:</p>
              <ul className="list-disc list-inside ml-1">
                <li>
                  <span className="text-primary">help</span>: Show this help
                  message.
                </li>
                <li>
                  <span className="text-primary">about</span>: Display
                  information about me.
                </li>
                <li>
                  <span className="text-primary">projects</span>: Show my
                  projects.
                </li>
                <li>
                  <span className="text-primary">contact</span>: Show contact
                  information.
                </li>
                <li>
                  <span className="text-primary">date</span>: Display current
                  date and time.
                </li>
                <li>
                  <span className="text-primary">echo [text]</span>: Print back
                  the given text.
                </li>
                <li>
                  <span className="text-primary">
                    theme [light|dark|system]
                  </span>
                  : Change theme.
                </li>
                <li>
                  <span className="text-primary">clear</span>: Clear the
                  terminal screen.
                </li>
              </ul>
            </>
          ),
        };
        break;
      case "about":
        outputEntry = {
          id: Date.now() + 1,
          type: "component",
          content: <AboutSectionContent />,
        };
        break;
      case "projects":
        outputEntry = {
          id: Date.now() + 1,
          type: "component",
          content: <ProjectsSectionContent />,
        };
        break;
      case "contact":
        outputEntry = {
          id: Date.now() + 1,
          type: "component",
          content: <ContactSectionContent />,
        };
        break;
      case "clear":
        setHistory([]); // Clears history, effectively "clearing" the screen
        setIsProcessing(false); // Reset processing state
        return; // Exit early, no further output needed
      case "date":
        outputEntry = {
          id: Date.now() + 1,
          type: "output",
          content: new Date().toLocaleString(),
        };
        break;
      case "echo":
        outputEntry = {
          id: Date.now() + 1,
          type: "output",
          content: args.join(" ") || "Usage: echo [text to print]",
        };
        break;
      case "theme":
        const htmlEl = document.documentElement;
        if (args[0] === "light") {
          htmlEl.classList.remove("dark");
          // htmlEl.classList.add('light'); // Not needed if :root is light theme
          outputEntry = {
            id: Date.now() + 1,
            type: "system",
            content: "Theme set to light.",
          };
        } else if (args[0] === "dark") {
          // htmlEl.classList.remove('light');
          htmlEl.classList.add("dark");
          outputEntry = {
            id: Date.now() + 1,
            type: "system",
            content: "Theme set to dark.",
          };
        } else if (args[0] === "system") {
          // htmlEl.classList.remove('light');
          htmlEl.classList.remove("dark");
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ) {
            htmlEl.classList.add("dark");
          } // If system prefers light, no class is needed, :root styles apply.
          outputEntry = {
            id: Date.now() + 1,
            type: "system",
            content: "Theme set to system preference.",
          };
        } else {
          outputEntry = {
            id: Date.now() + 1,
            type: "error",
            content: "Usage: theme [light|dark|system]",
          };
        }
        break;
      case "": // Handle empty command submission (already added to history by handleFormSubmit)
        setIsProcessing(false);
        return;
      default:
        outputEntry = {
          id: Date.now() + 1,
          type: "error",
          content: `Command not found: ${commandStr}. Type "help" for available commands.`,
        };
    }

    if (outputEntry) {
      // Use a functional update here as well if outputEntry depends on previous history
      setHistory((prev) => [...prev, outputEntry!]);
    }
    setIsProcessing(false);
  }, []); // Dependencies for processCommand, ensure it's stable if not changing

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isProcessing) return;

      const commandToProcess = input;
      setInput(""); // Clear input immediately

      if (commandToProcess.trim() === "") {
        // Add empty command to history
        setHistory((prev) => [
          ...prev,
          { id: Date.now(), type: "command", content: "" },
        ]);
      } else {
        // Process the command
        await processCommand(commandToProcess);
      }
      // Re-focus the input field after any command submission (empty or processed)
      inputRef.current?.focus();
    },
    [input, isProcessing, processCommand],
  );

  return (
    <div
      ref={terminalContainerRef}
      className="p-3 bg-background text-foreground font-mono h-full flex flex-col"
      tabIndex={0}
    >
      {" "}
      {/* Added tabIndex to allow div to be focusable for clicks */}
      <div className="flex-grow overflow-y-auto pr-2 space-y-1 text-sm md:text-base">
        {" "}
        {/* Consistent text size for history */}
        {history.map((entry) => (
          <div key={entry.id}>
            {entry.type === "command" && (
              <div className="flex">
                <TerminalPrompt />
                <span className="break-all">{entry.content as string}</span>
              </div>
            )}
            {/* Ensure consistent text sizing for different output types */}
            {entry.type === "output" && (
              <div className="whitespace-pre-wrap text-muted-foreground">
                {entry.content}
              </div>
            )}
            {entry.type === "component" && (
              <div className="mt-1 mb-1">{entry.content}</div>
            )}{" "}
            {/* Components manage their own sizing internally */}
            {entry.type === "error" && (
              <div className="whitespace-pre-wrap text-destructive">
                {entry.content}
              </div>
            )}
            {entry.type === "system" && (
              <div className="whitespace-pre-wrap text-muted-foreground italic">
                {entry.content}
              </div>
            )}
          </div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="mt-2 flex items-center shrink-0"
      >
        <TerminalPrompt />
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow bg-transparent border-0 focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 focus:outline-none focus-visible:outline-none p-0 text-base md:text-lg text-foreground"
          placeholder=""
          disabled={isProcessing}
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
          autoFocus={true}
        />
        {/* {!isProcessing && <BlinkingCursor />} */}
      </form>
    </div>
  );
};

export default TerminalInterface;
