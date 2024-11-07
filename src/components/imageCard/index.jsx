import Image from '../image'
import Heading from '../heading';
import Text from '../text';
import './index.css'


const ImageCard = ({image, heading, text, link}) => {
  return (
    <div className="imageCard">
      <Image src={image} alt={heading} imageClassName="imageCard__image"/>
      <div className='imageCard__content'>
        <Heading level={3}>{heading}</Heading>
        <Text className="imageCard__text"> {text} </Text>
        <a href={link} className='imageCard__link'>Read More</a>
      </div>
    </div>
  )
};

export default ImageCard;
