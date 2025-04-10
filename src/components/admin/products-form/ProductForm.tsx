import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveProduct } from './ProductService';
import useProductCategories from '../../../CustomHooks/ProductCategories';
import { useState } from 'react';
import Card from '../../card/Card';
import styles from './ProductForm.module.css';



const ProductForm = () => {



const checkFileType = (file: File) => {
    if(file?.name){
        const fileType = file.name.split(".").pop();
        if(fileType && ["png", "jpg", "jpeg"].includes(fileType?.toLowerCase())) return true;
    }
    return false;
}

const validateMaxFile = (file: File) => {
    const MAX_FILE_SIZE = 3000000;

    return file?.size < MAX_FILE_SIZE;
}

const schema = z.object({
    title: z.string().min(1, {message: 'El nombre es requerido.'}),
    price: z.union([z.number({invalid_type_error: 'Este campo es requerido'}), z.nan().transform(() => undefined)]),             
    category: z.string().min(1, {message: 'Se requiere una categoria.'}),
    productImage: z.any().refine((files) => files?.length === 1, 'Se require una imagen.')
                        .refine((files) => validateMaxFile(files[0]), 'El Tamano maximo de imagen permitido es 3MB.')
                        .refine((files) => checkFileType(files[0]), 'Solo se permiten los formatos .jpg y npg.')                 
});

type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors }, reset, watch} = useForm<FormData>({resolver: zodResolver(schema) });
    const { categories } = useProductCategories();
    const [file, setFile] = useState<File | undefined>();

    const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
    const [formInfo, setFormInfo] = useState<any>();
    
    const getCategory = (id: string) => {
        return categories?.find((category: any) => category.id === id);
    }

    const formValues = watch();

    console.log(formValues);

    const onImageChange = (event: React.FormEvent<HTMLInputElement>) => {
     const target = event.target as HTMLInputElement & { files: FileList};
        if (target.files) {
                setFile(target.files[0]);
                var reader = new FileReader();
                reader.readAsDataURL(target.files[0]);
                reader.onload=(event: any) => {
                setPreviewImageUrl(event.target.result);
            }
        }
    }


    const onSubmit = (data: FieldValues) => {
        const category = getCategory(data.category);
        const formValue = {...data, productImage: data.productImage[0], category: category};

        saveProduct(formValue);
        reset();
    }
    return (
         <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6">
                  <form className="h-100" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-gropup mb-2">
                    <label htmlFor="title">Title</label>
                    <input {...register('title')} placeholder="Title:" type="text" id="title" className="form-control"/>
                   { errors.title && <div className="alert alert-danger mt-2">
                        <div> {errors.title?.message}</div>
                    </div> }
                </div>
                <div className="form-gropup mb-2">
                     <label htmlFor="price">Price</label>
                     <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                      <input {...register('price', {valueAsNumber: true})} placeholder="Price:" type="text" id="price" className="form-control"/>
             
                </div>
                   {errors.price && <div  className="alert alert-danger mt-2">
                        <div>{errors.price?.message}</div>
                    </div>}
                </div>
                <div className="form-gropup mb-2">
                     <label htmlFor="category">Category</label>
                    <select {...register('category')}  className="form-select"  id="message">
                        <option></option>
                        {categories?.map((category: any) => <option key={category.id} value={category.id} id={category.id}>{category.categoryName}</option>
                        )}
                    </select>
                    {errors.category && <div  className="alert alert-danger mt-2">
                        <div>{errors.category?.message}</div>
                    </div>}
                </div>
                  <div className="form-gropup mb-2">
                    <label htmlFor="productImage">Image</label>
                    <input {...register('productImage')} type="file"  className="form-control" accept=".jpg, .jpeg, .png" onChange={onImageChange} />
                     {errors.productImage && <div  className="alert alert-danger mt-2">
                        <div>{errors?.productImage?.message}</div>
                    </div>}
                </div>
                <button className="mt-3 btn btn-primary contact-btn" type="submit">Enviar</button>
                     </form>
            </div>
             <div className="col-md-6 col-sm-6 col-lg-6">
                  <Card cardInfo={{imageUrl: previewImageUrl, title: formValues.title, price: formValues.price }}/>
             </div>
         </div>
    )
     
}

export default ProductForm;