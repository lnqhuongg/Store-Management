'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAll } from "../../../controllers/LoaiSanPham/LoaiSanPhamController";
import { getAllSuppliers } from '@/app/controllers/NhaCungCap/NhaCungCapController';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';
    SanPhamData?: any;
    createProduct: (product: FormData) => Promise<void>;
    updateProduct: (id: string, product: FormData) => Promise<void>;
}

interface Category {
    categoryId: number;
    categoryName: string;
}

interface Supplier {
    supplierId: number;
    name: string;
}

interface Product {
    productName: string;
    categoryID: number;
    supplierID: number;
    price: string;
    barcode: string;
    unit: string;
    imageUrl: File | string | null;
    status: number;
}

export default function SanPhamModalForm({ show, handleClose, mode, SanPhamData, createProduct, updateProduct }: ModalFormProps) {
    // Khởi tạo state ban đầu
    const initialState: Product = {
        productName: '',
        categoryID: 1,
        supplierID: 1,
        price: '',
        barcode: '',
        unit: 'cái',
        imageUrl: null,
        status: 1
    };

    const [formData, setFormData] = useState<Product>(initialState);
    const [categories, setCategories] = useState<Category[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [selectedImg, setSelectedImg] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    // Fetch dữ liệu danh mục và nhà cung cấp
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resCat, resSup] = await Promise.all([getAll(), getAllSuppliers()]);
                setCategories(resCat.data || []);
                setSuppliers(resSup.dataDTO|| []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Cập nhật form khi mode hoặc dữ liệu truyền vào thay đổi
    useEffect(() => {
        if (show) {
            if (mode === "edit" && SanPhamData) {
                setFormData({
                    productName: SanPhamData.productName || '',
                    categoryID: SanPhamData.categoryID || 1,
                    supplierID: SanPhamData.supplierID || 1,
                    price: SanPhamData.price || '',
                    barcode: SanPhamData.barcode || '',
                    unit: SanPhamData.unit || 'cái',
                    imageUrl: SanPhamData.imageUrl || null,
                    status: SanPhamData.status ?? 1
                });
                setPreviewImg(null); // Reset preview khi mở bản edit mới
            } else {
                setFormData(initialState);
                setPreviewImg(null);
                setSelectedImg(null);
            }
        }
    }, [show, mode, SanPhamData]);

    const handleCloseModal = () => {
        setPreviewImg(null);
        setSelectedImg(null);
        handleClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Chỉ chấp nhận file ảnh');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImg(e.target?.result as string);
            reader.readAsDataURL(file);
            setSelectedImg(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('ProductName', formData.productName);
        formDataToSubmit.append('Barcode', formData.barcode);
        formDataToSubmit.append('Price', formData.price.toString());
        formDataToSubmit.append('Unit', formData.unit);
        formDataToSubmit.append('Status', formData.status.toString());
        formDataToSubmit.append('CategoryID', formData.categoryID.toString());
        formDataToSubmit.append('SupplierID', formData.supplierID.toString());

        if (selectedImg) {
            formDataToSubmit.append('ImageUrl', selectedImg);
        }

        // CÁCH LOG ĐỂ KIỂM TRA DỮ LIỆU (Vì log đối tượng FormData trực tiếp sẽ thấy rỗng)
        console.log("--- Dữ liệu gửi đi ---");
        formDataToSubmit.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            if (mode === "add") {
                await createProduct(formDataToSubmit);
            } else {
                await updateProduct(SanPhamData.productID, formDataToSubmit);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Lỗi khi submit:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleCloseModal} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{mode === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className='d-flex flex-column'>
                    <div className='d-flex justify-content-between gap-3 mb-3'>
                        <div className=''>
                            {previewImg ? (
                                <img src={previewImg} alt="Preview" style={{ objectFit: 'cover' }} className='h-80 w-80 rounded border' />
                            ) : formData.imageUrl ? (
                                <img src={formData.imageUrl as string} alt="Product" style={{ objectFit: 'cover' }} className='h-80 w-80 rounded border' />
                            ) : (
                                <div className="h-80 w-80 rounded border d-flex align-items-center justify-content-center bg-light">
                                    <span style={{ color: '#666' }}>Chưa có ảnh</span>
                                </div>
                            )}

                            <Form.Group>
                                <div className="input-group mt-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" accept="image/*" onChange={handleImageChange} />
                                    <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                                </div>
                            </Form.Group>
                        </div>

                        <div className='w-50'>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <div className="input-group">
                                    <Form.Control 
                                        type="text" 
                                        placeholder='Nhập tên sản phẩm'
                                        value={formData.productName} 
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                        required
                                    />
                                    {mode === 'edit' && <span className="input-group-text">{formData.unit}</span>}
                                </div>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Loại sản phẩm</Form.Label>
                                <Form.Select 
                                    value={formData.categoryID} 
                                    onChange={(e) => setFormData({ ...formData, categoryID: Number(e.target.value) })}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Nhà cung cấp</Form.Label>
                                <Form.Select 
                                    value={formData.supplierID} 
                                    onChange={(e) => setFormData({ ...formData, supplierID: Number(e.target.value) })}
                                >
                                    {suppliers.map((sup) => (
                                        <option key={sup.supplierId} value={sup.supplierId}>{sup.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Đơn giá</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    value={formData.price} 
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            {mode === 'edit' && (
                                <>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Số lượng tồn</Form.Label>
                                        <Form.Control type='number' value={SanPhamData?.stock || 0} readOnly disabled />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Barcode</Form.Label>
                                        <Form.Control type='text' value={formData.barcode} readOnly disabled />
                                    </Form.Group>
                                </>
                            )}

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

                            {mode === "edit" && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select 
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                                    >
                                        <option value="0">Không hoạt động</option>
                                        <option value="1">Hoạt động</option>
                                    </Form.Select>
                                </Form.Group>
                            )}
                        </div>
                    </div>
                    <div className="text-end">
                        <Button variant="secondary" onClick={handleCloseModal} className="me-2">Hủy</Button>
                        <Button variant="success" type="submit">{mode === "add" ? "Thêm mới" : "Cập nhật"}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}