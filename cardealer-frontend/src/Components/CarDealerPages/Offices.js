import '../../App.css'
export const Offices = (props) => {
	return (
		<div className = 'offices'>
			{props.offices.map((office) => {
				return (
					<div key={office.id} className = "office">
						<h2> {office.city} {office.postCode}</h2>
						<h2> {office.street} </h2>
						<h1> Phone number </h1>
						<h2> {office.phoneNumber} </h2>
					</div>
				);
			})}
		</div>
	);
}