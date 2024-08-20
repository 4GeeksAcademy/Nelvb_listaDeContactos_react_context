import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Contact } from "./views/contact";
import { AddContact } from "./views/addContact";
import { Single } from "./views/single";  // Solo mantener si realmente lo necesitas
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
	// the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Contact />} />
						<Route path="/add-contact" element={<AddContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
						<Route path="/add-contact/:id" element={<AddContact/>} /> {/* Solo mantener si es necesario */}
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
