import '../../App.css'
export const Offices = (props) => {
	return (
		<div className = 'offices'>
			{props.offices.map((office) => {
				return (
					<div key={office.id} className = "office">
						<h1>Visit us on this address</h1>
						<h2> {office.city} {office.postCode}</h2>
						<h2> {office.street} </h2>
						<h1> Call us with this phone number</h1>
						<h2> {office.phoneNumber} </h2>
					</div>
				);
			})}
		</div>
	);
}