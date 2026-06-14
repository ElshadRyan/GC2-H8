import { Link } from "react-router";

export default function Card ({product}) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-200 rounded-2xl overflow-hidden h-full">
          <figure className="h-48 overflow-hidden">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title line-clamp-1">{product.name}</h2>

            <p className="text-sm opacity-70 line-clamp-2">
              {product.description}
            </p>

            <div className="card-actions justify-end mt-3">
              <a
                href={`/details/${product.id}`}
                className="btn btn-primary btn-sm"
              >
                Details
              </a>
            </div>
          </div>
        </div>
    )
}