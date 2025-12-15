// src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import BotonVolver from '@/components/BotonVolver';
import BotonLogout from '@/components/BotonLogout';

// Interfaces
interface StatsData {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  bundleConversionRate: number;
  periodChange: {
    sales: number;
    orders: number;
    aov: number;
    conversion: number;
  };
}

interface SalesData {
  date: string;
  ventas: number;
  ordenes: number;
  bundleSales: number;
}

interface ProductData {
  name: string;
  sales: number;
  orders: number;
  revenue: number;
}

interface BundlePerformance {
  bundleName: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  
  // Estados para datos
  const [stats, setStats] = useState<StatsData | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topProducts, setTopProducts] = useState<ProductData[]>([]);
  const [bundlePerformance, setBundlePerformance] = useState<BundlePerformance[]>([]);

  // Función para obtener cookie
  function obtenerCookie(nombre: string) {
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
  }

  // Cargar datos del dashboard
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const access_token = obtenerCookie('access_token');
        
        if (!access_token) {
          navigate('/login');
          return;
        }

        // Llamada a tu API/n8n para obtener datos
        const response = await fetch(
          `https://n8n.tecnobundles.com/webhook/dashboard?access_token=${access_token}&range=${timeRange}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const data = await response.json();
        
        if (data.stats) {
          setStats(data.stats);
          setSalesData(data.salesData || []);
          setTopProducts(data.topProducts || []);
          setBundlePerformance(data.bundlePerformance || []);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error cargando dashboard:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [timeRange]);

  // Datos de ejemplo para desarrollo (eliminar cuando conectes con API real)
  useEffect(() => {
    // Datos mock mientras configuras la API
    setStats({
      totalSales: 1250000,
      totalOrders: 89,
      averageOrderValue: 14044,
      bundleConversionRate: 68,
      periodChange: {
        sales: 15.3,
        orders: 12.5,
        aov: 8.2,
        conversion: 5.7
      }
    });

    setSalesData([
      { date: '2025-01-24', ventas: 45000, ordenes: 3, bundleSales: 35000 },
      { date: '2025-01-25', ventas: 52000, ordenes: 4, bundleSales: 42000 },
      { date: '2025-01-26', ventas: 38000, ordenes: 2, bundleSales: 28000 },
      { date: '2025-01-27', ventas: 67000, ordenes: 5, bundleSales: 55000 },
      { date: '2025-01-28', ventas: 89000, ordenes: 7, bundleSales: 72000 },
      { date: '2025-01-29', ventas: 95000, ordenes: 6, bundleSales: 78000 },
      { date: '2025-01-30', ventas: 110000, ordenes: 8, bundleSales: 95000 }
    ]);

    setTopProducts([
      { name: 'Bundle 3x1 Premium', sales: 45, orders: 45, revenue: 450000 },
      { name: 'Pack 2x1 Básico', sales: 32, orders: 32, revenue: 280000 },
      { name: 'Combo 5x1 Pro', sales: 28, orders: 28, revenue: 420000 },
      { name: 'Bundle 4x1 Especial', sales: 19, orders: 19, revenue: 210000 }
    ]);

    setBundlePerformance([
      { bundleName: 'Bundle 3x1', views: 1250, clicks: 456, conversions: 89, revenue: 450000 },
      { bundleName: 'Pack 2x1', views: 980, clicks: 342, conversions: 67, revenue: 280000 },
      { bundleName: 'Combo 5x1', views: 750, clicks: 298, conversions: 52, revenue: 420000 }
    ]);

    setLoading(false);
  }, []);

  // Colores para gráficos
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  // Formatear números
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <BotonVolver />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Análisis de ventas y rendimiento de bundles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Selector de rango de tiempo */}
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                  <SelectItem value="12m">Último año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => window.print()}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <BotonLogout />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Ventas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Ventas
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats && formatCurrency(stats.totalSales)}
              </div>
              <div className={`flex items-center text-sm mt-2 ${
                stats && stats.periodChange.sales >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats && stats.periodChange.sales >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{stats && formatPercent(stats.periodChange.sales)} vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Órdenes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Órdenes
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.totalOrders}
              </div>
              <div className={`flex items-center text-sm mt-2 ${
                stats && stats.periodChange.orders >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats && stats.periodChange.orders >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{stats && formatPercent(stats.periodChange.orders)} vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Valor Promedio de Orden */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ticket Promedio
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats && formatCurrency(stats.averageOrderValue)}
              </div>
              <div className={`flex items-center text-sm mt-2 ${
                stats && stats.periodChange.aov >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats && stats.periodChange.aov >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{stats && formatPercent(stats.periodChange.aov)} vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Tasa de Conversión */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Conversión Bundles
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.bundleConversionRate}%
              </div>
              <div className={`flex items-center text-sm mt-2 ${
                stats && stats.periodChange.conversion >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats && stats.periodChange.conversion >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{stats && formatPercent(stats.periodChange.conversion)} vs período anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Ventas en el Tiempo */}
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Ventas</CardTitle>
              <CardDescription>Ventas totales vs ventas de bundles</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('es-AR')}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="ventas" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="Ventas Totales"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bundleSales" 
                    stackId="2"
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                    name="Ventas Bundles"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Órdenes */}
          <Card>
            <CardHeader>
              <CardTitle>Órdenes por Día</CardTitle>
              <CardDescription>Cantidad de órdenes procesadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => new Date(label).toLocaleDateString('es-AR')}
                  />
                  <Legend />
                  <Bar dataKey="ordenes" fill="#ec4899" name="Órdenes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tablas y gráficos secundarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Productos */}
          <Card>
            <CardHeader>
              <CardTitle>Bundles Más Vendidos</CardTitle>
              <CardDescription>Productos con mejor rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.orders} ventas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rendimiento de Bundles */}
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Bundles</CardTitle>
              <CardDescription>Métricas de conversión por bundle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bundlePerformance.map((bundle, index) => (
                  <div key={index} className="pb-4 border-b last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">{bundle.bundleName}</p>
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(bundle.revenue)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Vistas
                        </p>
                        <p className="font-semibold">{bundle.views}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Clicks</p>
                        <p className="font-semibold">{bundle.clicks}</p>
                        <p className="text-xs text-gray-500">
                          {((bundle.clicks / bundle.views) * 100).toFixed(1)}% CTR
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Conversiones</p>
                        <p className="font-semibold">{bundle.conversions}</p>
                        <p className="text-xs text-green-600">
                          {((bundle.conversions / bundle.clicks) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botón de ir a Bundles */}
        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/list')} size="lg">
            <Settings className="w-5 h-5 mr-2" />
            Gestionar Mis Bundles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;