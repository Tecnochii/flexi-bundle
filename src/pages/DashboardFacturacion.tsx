import React, { useEffect, useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Interfaces
interface Order {
  id: number;
  number: number;
  status: string;
  payment_status: string;
  total: string;
  subtotal: string;
  discount: string;
  shipping_cost_customer: string;
  created_at: string;
  contact_name: string;
  contact_email: string;
  products: Array<{
    id: number;
    name: string;
    quantity: number;
    price: string;
  }>;
  gateway_name: string;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  paidOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
}

interface DailyData {
  date: string;
  revenue: number;
  orders: number;
}

interface PaymentMethodData {
  name: string;
  value: number;
  percentage: number;
}

const DashboardFacturacion = () => {
  // Simular navigate
  const goBack = () => {
    window.history.back();
  };
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodData[]>([]);

  // Estados para filtros de fecha
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    return firstDay.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Función para obtener cookies
  const getCookie = (nombre: string): string | null => {
    const nombreBuscado = nombre + "=";
    const cookiesArray = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nombreBuscado) === 0) {
        return cookie.substring(nombreBuscado.length, cookie.length);
      }
    }
    return null;
  };

  // Calcular estadísticas
  const calculateStats = (ordersData: Order[]): Stats => {

    ordersData = ordersData
    console.log(ordersData);

    
    const totalOrders = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => {
      return sum + parseFloat(order.total || '0');
    }, 0);
    const paidOrders = ordersData.filter(o => o.payment_status === 'paid').length;
    const cancelledOrders = ordersData.filter(o => o.status === 'cancelled').length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalOrders,
      totalRevenue,
      paidOrders,
      cancelledOrders,
      averageOrderValue
    };
  };

  // Procesar datos para gráficos
  const processChartData = (ordersData: Order[]) => {
    // Agrupar por día
    const dailyMap = new Map<string, { revenue: number; orders: number }>();
    
    ordersData.forEach(order => {
      const date = new Date(order.created_at).toISOString().split('T')[0];
      const current = dailyMap.get(date) || { revenue: 0, orders: 0 };
      current.revenue += parseFloat(order.total || '0');
      current.orders += 1;
      dailyMap.set(date, current);
    });

    const daily = Array.from(dailyMap.entries())
      .map(([date, data]) => ({
        date,
        revenue: data.revenue,
        orders: data.orders
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setDailyData(daily);

    // Métodos de pago
    const paymentMap = new Map<string, number>();
    let totalAmount = 0;

    ordersData.forEach(order => {
      if (order.payment_status === 'paid') {
        const method = order.gateway_name || 'Otros';
        const amount = parseFloat(order.total || '0');
        paymentMap.set(method, (paymentMap.get(method) || 0) + amount);
        totalAmount += amount;
      }
    });

    const paymentData = Array.from(paymentMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        percentage: (value / totalAmount) * 100
      }))
      .sort((a, b) => b.value - a.value);

    setPaymentMethodData(paymentData);
  };

  // Cargar órdenes
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const accessToken = getCookie('tiendanube_token');
      const userId = getCookie('tiendanube_user_id');

      if (!accessToken || !userId) {
        setError('No se encontró la sesión. Por favor, vuelve a iniciar sesión.');
        return;
      }

      const url = `https://n8n.tecnobundles.com/webhook/ordenes?access_token=${accessToken}&user_id=${userId}&fecha=${startDate}&fecha_max=${endDate}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las órdenes');
      }

      let data = await response.json();
      data = data.filter(order => order.payment_status == "paid")
      // data = data.filter(order => order.promotional_discount?.promotions_applied[0]?.discount_script_type == "custom") 
      setOrders(data);
      setStats(calculateStats(data));
      processChartData(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los datos. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar y cuando cambien las fechas
  useEffect(() => {
    loadOrders();
  }, []);

  // Formatear moneda
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(numValue);
  };

  // Formatear fecha para gráficos
  const formatDateForChart = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Colores para gráficos
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  // Tooltip personalizado para recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-sm mb-2">{formatDateForChart(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Revenue') || entry.name.includes('Ingresos') 
                ? formatCurrency(entry.value) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Formatear fecha completa
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener badge de estado
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: 'Abierta', className: 'bg-blue-100 text-blue-800' },
      closed: { label: 'Cerrada', className: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'Cancelada', className: 'bg-red-100 text-red-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { 
      label: status, 
      className: 'bg-gray-100 text-gray-800' 
    };
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  // Obtener badge de pago
  const getPaymentBadge = (paymentStatus: string) => {
    const statusConfig = {
      paid: { label: 'Pagada', icon: CheckCircle, color: 'text-green-600' },
      pending: { label: 'Pendiente', icon: Clock, color: 'text-yellow-600' },
      refunded: { label: 'Reembolsada', icon: XCircle, color: 'text-red-600' }
    };
    const config = statusConfig[paymentStatus as keyof typeof statusConfig] || { 
      label: paymentStatus, 
      icon: AlertCircle, 
      color: 'text-gray-600' 
    };
    const Icon = config.icon;
    return (
      <div className={`flex items-center gap-1 ${config.color}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };

  // Exportar a CSV
  const exportToCSV = () => {
    const headers = ['Número', 'Fecha', 'Cliente', 'Total', 'Estado', 'Pago'];
    const rows = orders.map(order => [
      order.number,
      formatDate(order.created_at),
      order.contact_name,
      order.total,
      order.status,
      order.payment_status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ordenes_${startDate}_${endDate}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard de Facturación</h1>
              <p className="text-gray-600 mt-1">Análisis detallado de tus ventas</p>
            </div>
            <button 
              onClick={goBack} 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Volver a Bundles
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros de Fecha */}
        <div className="bg-white rounded-lg border shadow-sm mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Filtros de Búsqueda
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                  Fecha Inicio
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                  Fecha Fin
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={loadOrders} 
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Buscar
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={exportToCSV} 
                  disabled={orders.length === 0}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Error</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Ingresos Diarios */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Evolución de Ingresos
              </h3>
              {dailyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDateForChart}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)"
                      name="Ingresos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No hay datos para mostrar
                </div>
              )}
            </div>
          </div>

          {/* Gráfico de Órdenes por Día */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                Órdenes por Día
              </h3>
              {dailyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDateForChart}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis style={{ fontSize: '12px' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="orders" fill="#8b5cf6" name="Órdenes" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No hay datos para mostrar
                </div>
              )}
            </div>
          </div>

          {/* Gráfico de Métodos de Pago */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-green-600" />
                Métodos de Pago
              </h3>
              {paymentMethodData.length > 0 ? (
                <div className="flex items-center justify-between">
                  <ResponsiveContainer width="60%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {paymentMethodData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="text-sm">
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-gray-500">
                            {formatCurrency(entry.value)} ({entry.percentage.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No hay datos para mostrar
                </div>
              )}
            </div>
          </div>

          {/* Gráfico de Comparación Revenue vs Órdenes */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Ingresos vs Órdenes
              </h3>
              {dailyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDateForChart}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Ingresos"
                      dot={{ fill: '#f59e0b' }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Órdenes"
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No hay datos para mostrar
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Total Órdenes Aplicadas con la App</h3>
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Facturación Total</h3>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Ticket Promedio</h3>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold">{formatCurrency(stats.averageOrderValue)}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Órdenes Pagadas</h3>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.paidOrders}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {((stats.paidOrders / stats.totalOrders) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Órdenes Canceladas</h3>
                  <XCircle className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Órdenes */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Detalle de Órdenes</h3>
            <p className="text-sm text-gray-600 mb-4">{orders.length} órdenes encontradas</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-sm">Nº Orden</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Productos</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Subtotal</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Envío</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Descuento</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Pago</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Método</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="text-center py-8 text-gray-500">
                        No se encontraron órdenes en el período seleccionado
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">#{order.number}</td>
                        <td className="py-3 px-4 text-sm">{formatDate(order.created_at)}</td>
                        <td className="py-3 px-4">{order.contact_name}</td>
                        <td className="py-3 px-4 text-sm">{order.contact_email}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{order.products.length}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">{formatCurrency(order.subtotal)}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(order.shipping_cost_customer)}</td>
                        <td className="py-3 px-4 text-right text-red-600">-{formatCurrency(order.discount)}</td>
                        <td className="py-3 px-4 text-right font-bold">{formatCurrency(order.total)}</td>
                        <td className="py-3 px-4">{getPaymentBadge(order.payment_status)}</td>
                        <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                        <td className="py-3 px-4 text-sm">{order.gateway_name}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFacturacion;