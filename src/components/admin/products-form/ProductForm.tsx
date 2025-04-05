import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveProduct } from './ProductService';
import useProductCategories from '../../../CustomHooks/ProductCategories';
import { useRef, useState } from 'react';


const schema = z.object({
    title: z.string().min(1, {message: 'El nombre es requerido.'}),
    price: z.number({invalid_type_error: 'Este campo es requerido'}),               
   // productImage: z.string().min(1, {message: 'Se requiere una imagen.'}),
    category: z.string().min(1, {message: 'Se requiere una categoria.'})
});

type FormData = z.infer<typeof schema>;

const ProductForm = () => {


    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({resolver: zodResolver(schema) });
    const { categories } = useProductCategories();
    const [file, setFile] = useState<File | undefined>();
    
    const date = Date.now();
    console.log(date)

    const getCategory = (id: string) => {
        return categories?.find((category: any) => category.id === id);
    }

    const handleProductImageOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement & { files: FileList};
        setFile(target.files[0]);
    } 

    const onSubmit = (data: FieldValues) => {
        const category = getCategory(data.category);
        const formValue = {...data, productImage: file, category: category};
        saveProduct(formValue);
    }
    return (
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-gropup mb-2">
                <input {...register('title')} placeholder="Title:" type="text" id="title" className="form-control"/>
               { errors.title && <div className="alert alert-danger mt-2">
                    <div> {errors.title?.message}</div>
                </div> }
            </div>
            <div className="form-gropup mb-2">
                <input {...register('price', {valueAsNumber: true})} placeholder="Price:" type="text" id="price" className="form-control"/>
                {errors.price && <div  className="alert alert-danger mt-2">
                    <div>{errors.price?.message}</div>
                </div>}
            </div>

            <div className="form-gropup mb-2">
                <input name="productImage" type="file"  className="form-control" onChange={handleProductImageOnChange}/>
            </div>
            <div className="form-gropup mb-2">
                <select {...register('category')}  className="form-select"  id="message">
                    <option></option>
                    {categories?.map((category: any) => <option key={category.id} value={category.id} id={category.id}>{category.categoryName}</option> 
                    )}
                </select>
                {/* {errors.category && <div  className="alert alert-danger mt-2">
                    <div>{errors.category?.message}</div>
                </div>} */}
            </div>
            <button className="mt-3 btn btn-primary contact-btn" type="submit">Enviar</button>
        </form>
    )
     
}

export default ProductForm;