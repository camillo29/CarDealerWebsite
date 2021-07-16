import image from '../../Resources/carDealerImage.jpg';
const MainPage = () => {
    return (
            <div>
                <h1 style = {{marginTop: '5%'}}> Welcome to Car dealer website where you can browse our super cars! </h1>
                <img src = {image} style = {{margin: '5%', maxWidth: '60%', maxHeight: '50%'}}/>
            </div>
        );
}

export default MainPage;