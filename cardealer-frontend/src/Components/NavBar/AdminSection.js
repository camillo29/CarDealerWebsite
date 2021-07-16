import '../../App.css'
const AdminSection = (props) => {
    return (
    <>
        <button type='button' className='adminButton' onClick = {() => props.setMenuChoice('Manage cars')}> Manage cars         </button>
        <button type='button' className='adminButton' onClick = {() => props.setMenuChoice('Manage car brands')}> Manage car brands   </button>
        <button type='button' className='adminButton' onClick = {() => props.setMenuChoice('Manage fuel types')}> Manage fuel types   </button>
        <button type='button' className='adminButton' onClick = {() => props.setMenuChoice('Manage gearbox types')}> Manage gear boxes   </button>
        <button type='button' className='adminButton' onClick = {() => props.setMenuChoice('Manage offices')}> Manage offices   </button>
    </>
    );
}

export default AdminSection;