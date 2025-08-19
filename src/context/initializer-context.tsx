import React from "react";
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import i18n from "../i18n";


export class AppInitializerContext {
	preferredLanguage: string;

	constructor(preferredLanguage: string) {
		this.preferredLanguage = preferredLanguage || 'en';
		this.init();
	}

	init() {
		this.setPreferredLanguage();
	}

	setPreferredLanguage() {
		i18n.changeLanguage(this.preferredLanguage);
	}

}

const App_Initializer_Context = createContext<AppInitializerContext | undefined>(undefined);

export const AppInitializerProvider: FC<{ containerId: string, preferredLanguage: string, children: ReactNode }> = ({ containerId, preferredLanguage, children }) => {

	useEffect(() => {
		document.body.style.fontFamily = preferredLanguage === 'ar'
			? '"Noto Kufi Arabic", sans-serif'
			: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Ubuntu", "Fira Sans", "Helvetica Neue", sans-serif';

		const element = document.getElementById(containerId);
		if (element) {
			element.setAttribute('dir', preferredLanguage === "ar" ? 'rtl' : 'ltr');
		}
	}, [preferredLanguage]);

	const appInitializerContext = useMemo(() => {
		return new AppInitializerContext(preferredLanguage);
	}, [preferredLanguage]);


	return (
		<App_Initializer_Context.Provider value={appInitializerContext}>
			{children}
		</App_Initializer_Context.Provider>
	);
};

export const useAppInitializer = () => {
	const context = useContext(App_Initializer_Context);
	if (context === undefined) {
		throw new Error('useAppInitializer must be used within a AppInitializerProvider');
	}
	return context;
};
