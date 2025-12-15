'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentData {
  method: string;
  percent: number;
}

interface Props {
  data: PaymentData[];
}

const PAYMENT_COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function PaymentPieChart({ data }: Props) {
  
  const translateMethod = (method: string) => {
    switch (method) {
      case 'cash': return 'Tiền mặt';
      case 'bank_transfer': return 'Chuyển khoản';
      case 'card': return 'Quẹt thẻ';
      case 'e-wallet': return 'Ví điện tử';
      default: return 'Khác';
    }
  };

  const chartData = (data || []).map(item => ({
    name: translateMethod(item.method),
    value: item.percent
  }));

  const renderPieLabel = ({ percent }: { percent?: number }) => {
    return !percent ? '' : `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="card h-100 border-0"> {/* Đã bỏ shadow-sm */}
      <div className="card-body">
        <h5 className="card-title mb-3">Cơ cấu phương thức thanh toán</h5>
        
        {(!chartData || chartData.length === 0) ? (
           <div className="text-center py-5 text-muted">Chưa có dữ liệu thanh toán</div>
        ) : (
          // 1. TĂNG CHIỀU CAO TỪ 320 -> 350 (hoặc 360 tùy ý)
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData} 
                  dataKey="value"    
                  nameKey="name"
                  cx="50%" 
                  // Giữ nguyên hoặc giảm nhẹ cy nếu muốn biểu đồ không quá thấp
                  cy="55%" 
                  innerRadius={70} 
                  outerRadius={110} 
                  paddingAngle={4}
                  label={renderPieLabel}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]} />
                  ))}
                </Pie>
                
                <Tooltip formatter={(value: number) => `${value}%`} />
                
                {/* 2. CHỈNH LEGEND XUỐNG THẤP */}
                <Legend 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle" // Đổi icon thành hình tròn cho đẹp
                    wrapperStyle={{ paddingTop: '20px' }} // Đẩy cách xa biểu đồ ra 20px
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}