'use client';

import { useState, useRef, useEffect } from 'react';

export type Promo = {
    promoId: number;
    promoCode: string;
    description?: string;
    discountType?: 'fixed' | 'percent';
    discountValue?: number;
    minOrderAmount?: number;
};

interface PromoInputProps {
    // giả lập danh sách mã (frontend mock). Sau này bạn có thể fetch từ API.
    promos?: Promo[];
    onApply?: (promo: Promo | null) => void;
}

export default function PromoInput({ promos = [], onApply }: PromoInputProps) {
    const [q, setQ] = useState('');
    const [open, setOpen] = useState(false);
    const [filtered, setFiltered] = useState<Promo[]>([]);
    const [selected, setSelected] = useState<Promo | null>(null);
    const [highlight, setHighlight] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!q) {
            setFiltered([]);
            setOpen(false);
            return;
        }
        const f = promos.filter(p =>
            p.promoCode.toLowerCase().includes(q.toLowerCase())
            || (p.description || '').toLowerCase().includes(q.toLowerCase())
        );
        setFiltered(f);
        setOpen(f.length > 0);
        setHighlight(0);
    }, [q, promos]);

    // click outside to close
    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    const handleSelect = (p: Promo) => {
        setSelected(p);
        setQ(p.promoCode);
        setOpen(false);
    };

    const handleApply = () => {
        if (selected) {
            onApply?.(selected);
        } else {
            // nếu muốn áp dụng bằng mã nhập tay: tìm xem có match exact
            const match = promos.find(p => p.promoCode.toLowerCase() === q.trim().toLowerCase()) || null;
            setSelected(match);
            onApply?.(match);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlight(h => Math.min(h + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlight(h => Math.max(h - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filtered[highlight]) handleSelect(filtered[highlight]);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    return (
        <div ref={ref} style={{ position: 'relative', minWidth: 260 }}>
            <div className="d-flex gap-2 align-items-center">
                <input
                    className="form-control"
                    placeholder="Nhập mã giảm giá..."
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setSelected(null); }}
                    onFocus={() => { if (filtered.length) setOpen(true); }}
                    onKeyDown={onKeyDown}
                />
                <button type="button" className="btn btn-outline-primary" onClick={handleApply}>
                    Áp dụng
                </button>
            </div>

            {/* suggestion dropdown */}
            {open && filtered.length > 0 && (
                <div className="card shadow-sm" style={{ position: 'absolute', zIndex: 50, width: '100%', maxHeight: 220, overflowY: 'auto' }}>
                    <ul className="list-group list-group-flush">
                        {filtered.map((p, idx) => (
                            <li
                                key={p.promoId}
                                className={`list-group-item list-group-item-action ${idx === highlight ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setHighlight(idx)}
                                onClick={() => handleSelect(p)}
                            >
                                <div className="fw-bold">{p.promoCode}</div>
                                <small className="text-muted">{p.description}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* hiển thị promo đã chọn */}
            {selected ? (
                <div className="mt-2">
                    <div className="small text-muted">Đã chọn:</div>
                    <div className="d-flex gap-2 align-items-center">
                        <strong>{selected.promoCode}</strong>
                        <span className="text-muted">{selected.description}</span>
                        <span className="badge bg-success">
                            {selected.discountType === 'percent' ? `${selected.discountValue}%` : selected.discountValue?.toLocaleString()}
                        </span>
                    </div>
                </div>
            ) : q ? (
                <div className="mt-2 small text-muted">Không tìm thấy mã khớp (hoặc chưa chọn)</div>
            ) : null}
        </div>
    );
}
