import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteProductById, getProductById, saveProduct } from './ProductService';
import useProductCategories from '../../../CustomHooks/ProductCategories';
import { useState, useEffect, act } from 'react';
import ProductCard from '../../card/ProductCard';
import './ProductForm.css';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../confirmation-modal/ConfimationModal';
import { ProductCategory } from "../../../models/ProductCategory";



const ProductForm = () => {

const schema = z.object({
    title: z.string().min(1, {message: 'El nombre es requerido.'}),
    price: z.number({invalid_type_error: 'Este campo es requerido'}),             
    category: z.string().min(1, {message: 'Se requiere una categoria.'})             
});

type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue} = useForm<FormData>({resolver: zodResolver(schema) });
    const { categories } = useProductCategories();

   const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [file, setFile] = useState<any>(null);

    const [fileInputErrorMessage, setFileInputErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { id } = useParams();
    
    const getCategory = (id: string): ProductCategory => {
        return categories?.find((category: ProductCategory) => category.id === id);
    }

    const formValues = watch();


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

const validateMaxFileSize = (file: File) => {
    const MAX_FILE_SIZE = 3000000;

    return file?.size <= MAX_FILE_SIZE;
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

const checkFileInputErrors = (fileLocal?: File) => {
    const actualFile = fileLocal || file;

    validateFileInput(actualFile);
}

const readImageFile = (file: File) => {
       var reader = new FileReader();
        reader?.readAsDataURL(file);
        reader.onload=(event: any) => {
            setPreviewImageUrl(event?.target?.result);
            checkFileInputErrors(file);
        }
}

const validateFileInput = (file: File) => {
       const message = !file ? 'Se require una imagen.' 
        : !validateMaxFileSize(file) ? 'El Tamano maximo de imagen permitido es 3MB.' 
        : !checkFileType(file) ? 'Solo se permiten los formatos .jpg y npg.' : '';
   setFileInputErrorMessage(message);
}

const getProductInfo = () => {
    console.log('pathname', location.pathname);
    getProductById(id!).then((product) => {
        setValue('title', product?.data?.title);
        setValue('price', product?.data?.price);
        setValue('category', product.data?.category?.id);

        const base64 = product?.data?.productImage;
        const byteArray = new Uint8ClampedArray(
            atob(base64)
            .split('')
            .map((char) => char.charCodeAt(0))
        );

        const blob = new Blob([byteArray], {type: product?.data?.imageType})

        const file = new File([blob], product?.data?.imageName);

        setFile(file);
        readImageFile(file);
    });
}

    const onImageChange = (event: React.FormEvent<HTMLInputElement>) => {
     const target = event.target as HTMLInputElement & { files: FileList};
        if (target.files[0]) {
                setFile(target.files[0]);
               readImageFile(target.files[0]);
        } 
    }


    const onSubmit = (data: FieldValues) => {

        if(fileInputErrorMessage) return;

        const category = getCategory(data.category);
        const formValue = {...data, productImage: file, category: category};

        saveProduct(formValue, id).then(resp => {
             reset();
             navigate('/admin/products');
        }).catch(error => error);
        
       
    }
    return (
        <>
         <div className="row form-control-container">
            <div className="col-md-6 col-sm-6 col-lg-6">
                  <form className="h-100" onSubmit={handleSubmit(onSubmit)}>
                   {/* <form className="h-100">  */}
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
                      <input {...register('price', {valueAsNumber: true})} placeholder="Price:" type="number" id="price" className="form-control"/>
             
                </div>
                   {errors.price && <div  className="alert alert-danger mt-2">
                        <div>{errors.price?.message}</div>
                    </div>}
                </div>
                <div className="form-gropup mb-3">
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
                      <p className="mb-1">Product Image</p>
                    <div className="d-flex">
                        <div>
                            <label className="product-image-label" htmlFor="productImage">Attach</label>
                            <input id="productImage" type="file" accept=".jpg, .jpeg, .png" onChange={onImageChange} value={undefined} multiple />
                        </div>
                        <div style={{alignSelf:'end'}} className="inline-block flex-direction-column w-100">
                            <p className="ms-2 my-0" style={{alignSelf: 'end'}}>{file?.name}</p>
                            <div className="inline-block" style={{backgroundColor: 'black', height: '0.02rem', width: '100%', alignSelf: 'end'}}></div>
                        </div>
                    </div>
                     { fileInputErrorMessage && <div  className="alert alert-danger mt-2">
                        <div>{fileInputErrorMessage}</div>
                    </div>}
                </div>
                <button onClick={() => checkFileInputErrors()} className="mt-3 btn btn-primary contact-btn me-2" type="submit">{id ? 'Actualizar' : 'Crear'}</button>
                {id && <button onClick={onRequestDelete} className="mt-3 btn btn-danger me-2 contact-btn" type="button">Eliminar</button>}

                 <button onClick={() => navigate('/admin/products')} className="mt-3 btn btn-secondary contact-btn" type="button">Cancelar</button>
                     </form>
            </div>
             <div className="col-md-6 col-sm-6 col-lg-6">
                  <ProductCard showActions={false} cardInfo={{product:{ title: formValues.title, price: formValues.price, productImage: previewImageUrl, category: getCategory(formValues.category) }}}/>
             </div>
         </div>
         <ConfirmationModal message={"¿Esta seguro de que quiere eliminar este producto?"} isModalOpen={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={onDeleteConfirmation} />
         </>
    )
     
}

export default ProductForm;

