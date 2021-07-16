import '../../App.css';
const ClientSection = (props) => {
    return (
            <> 
                <button type = 'button' className = 'clientButton' onClick = {()=>props.setMenuChoice('Reserved cars')}> Reserved cars </button>
            </>
        );
}

export default ClientSection;