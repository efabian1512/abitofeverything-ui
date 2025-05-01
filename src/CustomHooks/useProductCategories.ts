import { useEffect, useState } from "react";
import { getProductCategories } from "../components/admin/products-form/ProductService";

export const useProductCategories = () => {
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        getProductCategories().then(response => {
            setCategories(response.data);
        })
        .catch((error) =>  error
        );
    }, []);

    return {categories: categories};
}

export default useProductCategories;