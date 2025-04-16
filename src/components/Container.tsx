import "../styles/container.css"

export const Container = ({children}: {children: React.ReactNode}) => {
	return(
	<div className = 'flex-wrap'>
		<div className = "container-fluid">
			{children}
		</div>
	</div>
	)
}