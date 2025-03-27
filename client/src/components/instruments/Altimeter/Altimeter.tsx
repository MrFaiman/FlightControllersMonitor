import React, { useRef, useEffect } from "react";
import { AltimeterProps } from "./types";

const Altimeter: React.FC<AltimeterProps> = ({
	value,
	displayMode = "visual",
	width = 100,
	height = 300,
}) => {
	if (displayMode === "text") {
		return <div>Text</div>;
	}

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const textPadding = 30; // Padding for text
	const markerLength = width * 0.3; // 30% of canvas width
	const arrowLength = width * 0.75; // 75% of canvas width

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Altitude value between 0 and 3000
		const clampedValue = Math.max(0, Math.min(3000, value));

		// Draw background
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);

		// Draw border
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.strokeRect(0, 0, width, height);

		// Altitude scale
		ctx.fillStyle = "black";
		ctx.font = "12px Arial";
		ctx.textAlign = "left";

		// Draw altitude markers
		for (let alt = 0; alt <= 3000; alt += 500) {
			const y = height - textPadding - (alt / 3000) * (height - 2 * textPadding);

			// Horizontal line
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(markerLength, y);
			ctx.strokeStyle = "black";
			ctx.stroke();

			// Altitude text
			ctx.fillText(alt.toString(), markerLength + 5, y + 5);
		}

		// Calculate position of current value
		const valueY = height - textPadding - (clampedValue / 3000) * (height - 2 * textPadding);

		// Draw blue arrow
		ctx.beginPath();
		ctx.moveTo(0, valueY);
		ctx.lineTo(arrowLength, valueY);
		ctx.lineTo(arrowLength - 5, valueY - 5);
		ctx.moveTo(arrowLength, valueY);
		ctx.lineTo(arrowLength - 5, valueY + 5);
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 2;
		ctx.stroke();

		return () => {
			ctx.clearRect(0, 0, width, height);
		};
	}, [value, width, height]);

	return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Altimeter;
