import React, { createContext, useContext } from "react";
import { useInstrumentsReducer } from "@hooks/useInstrumentsReducer";
import { InstrumentsState } from "@utils/types";

interface InstrumentsContextType {
	state: InstrumentsState;
	setAdi: (value: number) => void;
	setHis: (value: number) => void;
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

export const useInstruments = () => {
	const context = useContext(InstrumentsContext);
	if (context === undefined) {
		throw new Error("useInstruments must be used within an InstrumentsProvider");
	}
	return context;
};
