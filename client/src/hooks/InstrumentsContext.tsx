import React, { createContext, useContext } from "react";
import { useInstrumentsReducer, InstrumentsState } from "@hooks/useInstrumentsReducer";

interface InstrumentsContextType {
	state: InstrumentsState;
	setAdi: (value: number) => void;
	setHsi: (value: number) => void;
	setAltitude: (value: number) => void;
	reset: () => void;
}

const InstrumentsContext = createContext<InstrumentsContextType | undefined>(undefined);

export const InstrumentsProvider = ({ children }: { children: React.ReactNode }) => {
	const instruments = useInstrumentsReducer();

	return (
		<InstrumentsContext.Provider value={instruments}>{children}</InstrumentsContext.Provider>
	);
};

export function useInstruments() {
	const context = useContext(InstrumentsContext);
	if (context === undefined) {
		throw new Error("useInstruments must be used within an InstrumentsProvider");
	}
	return context;
}
