export type NotificationVariant = "success" | "warning" | "danger";

export interface NotificationProps {
	message: string;
	variant: NotificationVariant;
	duration?: number;
	close?: () => void;
}
