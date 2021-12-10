import {useState, useEffect} from 'react'
import './CartProduct.css'
import api from './Api'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const CartProduct = ({ cartProduct }) => {
    const [image, setImages] = useState([])

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(cartProduct.productSpec.product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getImages()
    }, [])

    const deleteItem = async(cartItemSpecId) => {
        await api.deleteCustomerCart(cartItemSpecId)
        window.location.reload(false)
    }

    const handleAddItem = async() => {
        await api.updateCustomerCart(cartProduct.productSpec.id, cartProduct.quantity + 1)
    }

    const handleDecreaseItem = async() => {
        const data = await api.updateCustomerCart(cartProduct.productSpec.id, cartProduct.quantity - 1)

        if (data.data[0].quantity === 0) {
            await api.deleteCustomerCart(cartProduct.productSpec.id)
            window.location.reload(false)
        }
    }

    return (
        <div className='cart-product-outer-box'>
            <div className='cart-product-image-box'>
                <img src={ image? image.image_url : '0'} alt='img'/>
            </div>
            
            <div className='cart-product-descriptions-box'>
                <div className='cart-product-description'>
                    <h3>商品: </h3> 
                    <span>{cartProduct.productSpec.product.title}</span>
                </div>
                
                <div className='cart-product-description'>
                    <h3>规格: </h3>
                    <span>{cartProduct.productSpec.description}</span>
                </div>

                <div className='cart-product-description'>
                    <h3>价格: </h3>
                    <span>¥ {cartProduct.productSpec.price}</span>
                </div>

                <div className='cart-product-description'>
                    <h3>数量: </h3>
                    <span>{cartProduct.productSpec.stock > cartProduct.quantity ? cartProduct.quantity : cartProduct.productSpec.stock }</span>
                    <button onClick={() => handleAddItem()}>+</button>
                    <button onClick={() => handleDecreaseItem()}>-</button>
                </div>

                <div className='cart-product-description'>
                    <h3>总金额: </h3>
                    <span>¥ {cartProduct.productSpec.stock > cartProduct.quantity ?
                            (cartProduct.productSpec.price * cartProduct.quantity).toFixed(2)
                            : (cartProduct.productSpec.price * cartProduct.productSpec.stock).toFixed(2)}</span>
                </div>

                <div className='cart-buttons-box'>
                    <button className='delete-item-button' onClick={() => deleteItem(cartProduct.productSpec.id)}>
                        <DeleteOutlineOutlinedIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
