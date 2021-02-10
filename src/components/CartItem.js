import './CartItem.css';

export function CartItem({imageLocation, name, price, quantity}){
    return(
        <li className='cart-item'>
            <img className="cart-item__image" src={imageLocation} alt={name}></img>
            <p className="cart-item__name">{name}</p>
            <p className="cart-item__quantity">{quantity}</p>
            <p className="cart-item__price">{(price * quantity).toFixed(2)}</p>

        </li>
    );
}