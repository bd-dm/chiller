import { Component } from "solid-js";
import { Body } from "./components";
import { HomeContext } from "./context";

const Home: Component = () => {
	return (
		<HomeContext.Provider>
			<Body />
		</HomeContext.Provider>
	);
};

export { Home };
