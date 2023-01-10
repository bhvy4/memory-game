import './SingleCard.css'

export default function SingleCard({ card }) {
    return (
        <div className='card'>
            <img src={card.src} className='front' alt='card front' />
            <img src='/img/cover.png' className='back' alt='card back' />
        </div>
    )
}