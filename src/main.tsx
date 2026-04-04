import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ScreenProvider } from "./util/screenContext.tsx"

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error("Root element not found")
}

createRoot(rootElement).render(
	<StrictMode>
		<ScreenProvider>
			<App />
		</ScreenProvider>
	</StrictMode>,
)
