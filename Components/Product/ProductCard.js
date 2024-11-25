export default function ProductCard({ product }) {

    return(
        <div>
            <div>
                <img alt="Imagen" src={product.url} />
            </div>
            <div>
                <div>{product.name}</div>
                <div>{product.brand}</div>
                <div>{product.quantity}</div>
                <div>{product.price}</div>
            </div>

        </div>
    )
}