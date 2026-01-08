import { ProcessLogEntry } from '../types';

let currentLog: Partial<ProcessLogEntry> | null = null;

/**
 * Starts a new logging session for a specific scenario node.
 * @param nodeId The unique identifier of the scenario being presented.
 */
export const startLogging = (nodeId: string): void => {
    currentLog = {
        nodeId,
        startTime: performance.now(),
        events: [],
    };
};

/**
 * Logs a specific event that occurred while a scenario is active.
 * @param type A string describing the event type (e.g., 'hover_enter').
 * @param metadata An object containing any relevant data about the event.
 */
export const logEvent = (type: string, metadata: any): void => {
    if (!currentLog || !currentLog.events) return;
    currentLog.events.push({
        type,
        metadata,
        timestamp: performance.now(),
    });
};

/**
 * Finalizes the current logging session, calculates the duration, and returns the complete log entry.
 * @param finalChoice The identifier of the option the player selected.
 * @returns The completed ProcessLogEntry object, or null if no log was active.
 */
export const finalizeLogging = (finalChoice: string): ProcessLogEntry | null => {
    if (!currentLog || typeof currentLog.startTime === 'undefined') return null;
    
    const endTime = performance.now();
    const finalizedLog: ProcessLogEntry = {
        nodeId: currentLog.nodeId!,
        startTime: currentLog.startTime,
        events: currentLog.events || [],
        endTime,
        totalDuration: endTime - currentLog.startTime,
        finalChoice,
    };
    
    currentLog = null; // Reset for the next node
    return finalizedLog;
};
