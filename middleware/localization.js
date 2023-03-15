/** @format */

import i18next from "i18next";
import i18nextFs from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

i18next
	.use(i18nextFs)
	.use(middleware.LanguageDetector)
	.init({
		detection: {
			order: ["header"],
		},
		fallbackLng: "fa",
		backend: {
			loadPath: "./locals/{{lng}}/{{ns}}.json",
		},
		preload: ["en", "fa", "ps"],
		ns: [
			"validations",
			"general",
			"messages",
			"emails"
		],
		defaultNS: "general",
	});

export default middleware.handle(i18next);
