import "../styles/container.css"

export const Container = ({children}: {children: React.ReactNode}) => {
	return(
		<div className = "container-fluid">
			{children}
		</div>
	)
}