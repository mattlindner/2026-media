import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ScreenProvider } from "./util/screenContext.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ScreenProvider>
			<App />
		</ScreenProvider>
	</StrictMode>,
)
