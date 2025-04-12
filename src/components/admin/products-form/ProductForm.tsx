import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteProductById, getProductById, saveProduct } from './ProductService';
import useProductCategories from '../../../CustomHooks/ProductCategories';
import { useState, useEffect } from 'react';
import Card from '../../card/Card';
import styles from './ProductForm.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../confirmation-modal/ConfimationModal';



const ProductForm = () => {

const schema = z.object({
    title: z.string().min(1, {message: 'El nombre es requerido.'}),
    price: z.union([z.number({invalid_type_error: 'Este campo es requerido'}), z.nan().transform(() => undefined)]),             
    category: z.string().min(1, {message: 'Se requiere una categoria.'}),
    productImage: z.any().refine((files) => files?.length === 1, 'Se require una imagen.')
                        .refine((files) => validateMaxFile(files[0]), 'El Tamano maximo de imagen permitido es 3MB.')
                        .refine((files) => checkFileType(files[0]), 'Solo se permiten los formatos .jpg y npg.')                 
});

type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue} = useForm<FormData>({resolver: zodResolver(schema) });
    const { categories } = useProductCategories();

    const [previewImageUrl, setPreviewImageUrl] = useState<string>(null);
    const [isFromInput, setIsFromInput] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    
    const getCategory = (id: string) => {
        return categories?.find((category: any) => category.id === id);
    }

    const formValues = watch();
    // const productImage = watch('productImage');

    // console.log(productImage);

    console.log(formValues);

    useEffect(() =>  {
    if(id) {
        getProductInfo();
    }
}, []);

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

const onRequestDelete = () => {
    setIsDeleteModalOpen(true);
}

const onDeleteConfirmation = () => {
    deleteProductById(id!).then(resp => {
        if(resp.data.success) {
            setIsDeleteModalOpen(false);
            navigate('/admin/products');
            
        }
    })
}

const getProductInfo = () => {
    getProductById(id!).then((product) => {
        setValue('title', product?.data?.title);
        setValue('price', product?.data?.price);
        setValue('category', product.data?.category?.id);
        setValue('productImage', 'data:' + product?.data?.imageType+';base64,' + product?.data?.productImage);
      
       // setValue('productImage', image);
        setIsFromInput(false);
        // Object.keys(product?.data).map((key: string) => {
        //     setValue(key, product?.data[key]);
        // });
    });
}

    const onImageChange = (event: React.FormEvent<HTMLInputElement>) => {
     const target = event.target as HTMLInputElement & { files: FileList};
        if (target.files) {
                var reader = new FileReader();
                reader.readAsDataURL(target.files[0]);
                reader.onload=(event: any) => {
                setPreviewImageUrl(event.target.result);
                setIsFromInput(true);
            }
        }
    }


    const onSubmit = (data: FieldValues) => {
        const category = getCategory(data.category);
        const formValue = {...data, productImage: data.productImage[0], category: category};

        saveProduct(formValue, id);
        reset();
    }
    return (
        <>
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
                    <select {...register('category')}  className="form-select"  id="category">
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
                    <input id="productImage" {...register('productImage')} type="file"  className="form-control" accept=".jpg, .jpeg, .png" onChange={onImageChange} />
                     {errors.productImage && <div  className="alert alert-danger mt-2">
                        <div>{errors?.productImage?.message}</div>
                    </div>}
                </div>
                <button className="mt-3 btn btn-primary contact-btn me-2" type="submit">{id ? 'Actualizar' : 'Crear'}</button>
                {id && <button onClick={onRequestDelete} className="mt-3 btn btn-danger me-2 contact-btn" type="submit">Eliminar</button>}

                 <button onClick={() => navigate('/admin/products')} className="mt-3 btn btn-secondary contact-btn" type="submit">Cancelar</button>
                     </form>
            </div>
             <div className="col-md-6 col-sm-6 col-lg-6">
                  <Card cardInfo={{ title: formValues.title, price: formValues.price, productImage: formValues.productImage?.length ? isFromInput ? previewImageUrl : formValues.productImage : previewImageUrl }}/>
             </div>
         </div>
         <ConfirmationModal message={"¿Esta seguro de que quiere eliminar este producto?"} isModalOpen={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={onDeleteConfirmation} />
         </>
    )
     
}

export default ProductForm;