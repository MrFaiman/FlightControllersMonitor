import React, { useRef, useEffect } from "react";
import { AttitudeIndicatorProps } from "./types";
import styles from "./Attitudeindicator.module.css";

const AttitudeIndicator: React.FC<AttitudeIndicatorProps> = ({
	value,
	displayMode = "visual",
	width = 300,
	height = 300,
}) => {
	if (displayMode === "text") {
		return <div>Text</div>;
	}

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, width, height);

		// Center point
		const centerX = width / 2;
		const centerY = height / 2;

		// ADI value between -100 and 100
		const clampedValue = Math.max(-100, Math.min(100, value));

		// Calculate the horizon line position
		const horizonY = (Math.abs(clampedValue) / 100) * height;

		if (clampedValue >= 0) {
			ctx.fillStyle = "skyblue";
			ctx.fillRect(0, 0, width, horizonY);

			ctx.fillStyle = "forestgreen";
			ctx.fillRect(0, horizonY, width, height - horizonY);
		} else {
			ctx.fillStyle = "forestgreen";
			ctx.fillRect(0, 0, width, horizonY);

			ctx.fillStyle = "skyblue";
			ctx.fillRect(0, horizonY, width, height - horizonY);
		}

		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;

		ctx.beginPath();
		ctx.moveTo(centerX - 30, centerY);
		ctx.lineTo(centerX + 30, centerY);
		ctx.moveTo(centerX, centerY - 20);
		ctx.lineTo(centerX, centerY + 20);
		ctx.stroke();

		// Draw horizon line
		ctx.beginPath();
		ctx.moveTo(0, horizonY);
		ctx.lineTo(width, horizonY);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();

		return () => {
			ctx.clearRect(0, 0, width, height);
		};
	}, [value, width, height]);

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			className={styles.attitude__indicator}
		/>
	);
};

export default AttitudeIndicator;
