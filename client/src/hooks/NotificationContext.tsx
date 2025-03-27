import React, { createContext, useContext, useState, useCallback } from "react";
import { NotificationVariant } from "@components/ui/Notification/Notification.types";
import Notification from "@components/ui/Notification/Notification";

interface NotificationContextType {
	showNotification: (message: string, variant: NotificationVariant) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [notification, setNotification] = useState<{
		message: string;
		variant: NotificationVariant;
	} | null>(null);

	const showNotification = useCallback((message: string, variant: NotificationVariant) => {
		setNotification({ message, variant });
	}, []);

	const hideNotification = useCallback(() => {
		setNotification(null);
	}, []);

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			{notification && (
				<Notification
					message={notification.message}
					variant={notification.variant}
					close={hideNotification}
				/>
			)}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotification must be used within a NotificationProvider");
	}
	return context;
};
