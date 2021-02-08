export function CartItem({name, price, quantity}){
    return(
        <div className='cart-item'>
            <p>{name}</p>
            <p>{price}</p>
            <p>{quantity}</p>
        </div>
    );
}