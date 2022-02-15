import React,{useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{

    const [btnIsHighlighed, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const noofCartItems = items.reduce((curNum, item)=>{
        return curNum + item.amount;
    }, 0);

    

    const btnClasses = `${styles.button} ${btnIsHighlighed ? styles.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const  timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        //Clean up Function
        return() => {
            clearTimeout(timer);
        }

    }, [items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{noofCartItems}</span>
        </button>
    )
};

export default HeaderCartButton;