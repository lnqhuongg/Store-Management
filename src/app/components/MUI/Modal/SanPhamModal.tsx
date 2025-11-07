'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { stat } from 'fs';
import { getAllCategories } from '@/app/services/categories/categoryService';
import { getAllSuppliers } from '@/app/services/suppliers/supplierService';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';     // chế độ: thêm hay sửa
    SanPhamData?: any;           // dữ liệu cũ khi sửa
    createProduct: (product: FormData) => Promise<void>;
    updateProduct: (id: string, product: FormData) => Promise<void>;
}

interface Category {
  categoryId?: number;
  categoryName: string;
}

interface Supplier {
  supplierId?: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: number;
}

interface Product {
  productName: string;
  categoryID: number;
  supplierID: number;
  price: string;
  barcode: string;
  unit: string;
//   created_at: string;
  imageUrl: File | null;
  stock: number;
  status: number;
}


export default function SanPhamModalForm({ show, handleClose, mode, SanPhamData, createProduct, updateProduct }: ModalFormProps) {
    const [formData, setFormData] = useState<Product>({ 
        productName: '', 
        categoryID: 1, 
        supplierID: 1, 
        price: '', 
        barcode: '', 
        unit: 'cái', 
        // created_at: '', 
        imageUrl: null,
        stock: 0,
        status: 1
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.dataDTO ?? response);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const fetchSuppliers = async () => {
        try {
            const response = await getAllSuppliers();   
            setSuppliers(response.dataDTO || response);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }   
    };
    useEffect(() => {
        fetchCategories();
        fetchSuppliers();
    }, []);

    // console.log('categories', categories);
    // console.log('suppliers', suppliers);

    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (mode === "edit" && SanPhamData) {
            setFormData(SanPhamData);
        } else {
            setFormData({
                productName: '', 
                categoryID: 1, 
                supplierID: 1, 
                price: '', 
                barcode: '', 
                unit: 'cái', 
                // created_at: '', 
                imageUrl: null,
                stock: 0,
                status: 1
                    });
        }
    }, [mode, SanPhamData]);

    const resetForm = () => {
        setPreviewImg(null);
        setSelectedImg(null);
        setFormData({ 
            productName: '', 
            categoryID: 1,
            supplierID: 1, 
            price: '', 
            barcode: '',
            unit: '', 
            // created_at: '', 
            imageUrl: null,
            stock: 0,
            status: 1
        });
    }

    const handleCloseModal = () => {
        resetForm();
        handleClose();
    }
    // handle submit xác định nút đó là add hay sửa
    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('ProductName', formData.productName);
            formDataToSubmit.append('Barcode', formData.barcode);
            formDataToSubmit.append('Price', formData.price.toString());
            formDataToSubmit.append('Unit', formData.unit);
            formDataToSubmit.append('Status', formData.status.toString());
            formDataToSubmit.append('Stock', formData.stock.toString());
            
            // Thêm categoryID và supplierID nếu có
            if (formData.categoryID && formData.categoryID > 0) {
                formDataToSubmit.append('CategoryID', formData.categoryID.toString());
            } else {
                alert('Vui lòng chọn loại sản phẩm');
                return;
            }
            
            if (formData.supplierID && formData.supplierID > 0) {
                formDataToSubmit.append('SupplierID', formData.supplierID.toString());
            } else {
                alert('Vui lòng chọn nhà cung cấp');
                return;
            }

            if (selectedImg) {
                formDataToSubmit.append('ImageUrl', selectedImg);
            } else {
                // Nếu không có ảnh mới, vẫn cần gửi trường này hoặc backend có thể xử lý null
                formDataToSubmit.append('ImageUrl', ''); // hoặc có thể bỏ qua nếu backend cho phép
            }

            if (mode === "add") {
                console.log("thêm", formDataToSubmit);
                // call POST API
                createProduct(formDataToSubmit);
            } else {
                console.log("sửa", formDataToSubmit);
                // call PUT API
                updateProduct(SanPhamData.productID, formDataToSubmit);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    

    const [selectedImg, setSelectedImg] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Kiểm tra định dạng
            if (!file.type.startsWith('image/')) {
                alert('Chỉ chấp nhận file ảnh');
                return;
            }

            // Tạo preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImg(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Lưu file để sau này xử lý
            setSelectedImg(file);
            setFormData({ ...formData, imageUrl: file });
        }
    };

    return (
        <Modal show={show} onHide={handleCloseModal} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className='d-flex flex-column'>
                    <div className='d-flex justify-content-between gap-3 mb-3'>
                        <div className=''>
                            {previewImg ? (
                                <img 
                                    src={previewImg} 
                                    alt="Preview" 
                                    style={{objectFit: 'cover' }}
                                    className='h-80 w-80 rounded border'
                                />
                            ) : mode === 'edit' ? (
                                <img 
                                    src={formData.imageUrl as unknown as string} 
                                    alt={formData.productName}
                                    className='h-80 w-80 rounded border'
                                    style={{objectFit: 'cover' }}
                                />
                            ) : (
                                <span style={{ color: '#666' }}>Chưa có ảnh</span>
                            )}
                            
                            {/* <Form.Group>
                                <div className="input-group mt-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" />
                                    <label className="input-group-text">Upload</label>
                                </div>
                            </Form.Group> */}
                            <Form.Group>
                                <div className="input-group mt-3">
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        id="inputGroupFile02"
                                        accept=".jpg,.jpeg"
                                        onChange={handleImageChange}
                                    />
                                    <label className="input-group-text" htmlFor="inputGroupFile02">
                                        Upload
                                    </label>
                                </div>
                                {/* <Form.Text className="text-muted">
                                    Chỉ chấp nhận file .jpg, .jpeg - Sau khi lưu SP, copy ảnh vào public/sanpham
                                </Form.Text> */}
                            </Form.Group>
                        </div>
                        <div className='w-50'>
                            {mode == 'edit' ? (
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                               
                                    <div className="input-group">
                                        <input 
                                            value={formData.productName} 
                                            type="text" 
                                            className="form-control" 
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            />
                                        <span className="input-group-text">{formData.unit}</span>
                                    </div>
                                </Form.Group>
                            ): (
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Nhập tên sản phẩm'
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    />
                                </Form.Group>
                            )}
                            
                       
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Form.Select 
                                        value={formData.categoryID || ''} 
                                        // defaultValue={1}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            categoryID: e.target.value as unknown as number
                                        })}
                                    > 

                                        {categories.map((category) => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Form.Select
                                        // value={formData.categoryID}
                                        defaultValue={1}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            categoryID: e.target.value as unknown as number
                                        })}
                                    > 
                                        {categories.map((category) => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )}
                            
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nhà cung cấp</Form.Label>
                                    <Form.Select 
                                        value={formData.supplierID} 
                                        // defaultValue={1}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            supplierID: e.target.value as unknown as number
                                        })}
                                    >
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.supplierId} value={supplier.supplierId}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nhà cung cấp</Form.Label>
                                    <Form.Select
                                        // value={formData.supplierID} 
                                        defaultValue={1}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            supplierID: e.target.value as unknown as number
                                        })}
                                    >
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.supplierId} value={supplier.supplierId}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )}
                            
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Đơn giá</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        value={formData.price} 
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Đơn giá</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={formData.price} 
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </Form.Group>
                            )}

                            {mode == 'edit' && (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Số lượng tồn</Form.Label>
                                    <Form.Control type='number' 
                                        value={formData.stock} 
                                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </Form.Group>
                            )}

                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Đơn vị</Form.Label>
                                    <Form.Select 
                                        value={formData.unit} 
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    >
                                        <option value="hộp">hộp</option>
                                        <option value="cái">cái</option>
                                        <option value="chai">chai</option>
                                        <option value="tuýp">tuýp</option>
                                        <option value="gói">gói</option>
                                        <option value="lon">lon</option>
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Đơn vị</Form.Label>
                                    <Form.Select 
                                        value={formData.unit} 
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    >
                                        <option value="hộp">hộp</option>
                                        <option value="cái">cái</option>
                                        <option value="chai">chai</option>
                                        <option value="tuýp">tuýp</option>
                                        <option value="gói">gói</option>
                                        <option value="lon">lon</option>
                                    </Form.Select>
                                </Form.Group>
                            )}
                            
                            {mode == 'edit' && (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Barcode</Form.Label>
                                    <Form.Control type='text' 
                                        disabled
                                        value={formData.barcode} 
                                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                                    />
                                </Form.Group>
                            ) }
                            

                            {/* tui lấy trường này ví dụ cho mng làm cái nút edit chứ thật chất ko có  */}

                            {mode === "edit" && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                                        aria-label="Default select example"
                                    >
                                        <option value="0">Không hoạt động</option>
                                        <option value="1">Hoạt động</option>
                                    </Form.Select>
                                </Form.Group>
                            )}

                            
                        </div>
                    </div>
                    <div className="text-end">
                                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                                    Hủy
                                </Button>
                                <Button variant="success" type="submit">
                                    {mode === "add" ? "Thêm mới" : "Cập nhật"}
                                </Button>
                            </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}