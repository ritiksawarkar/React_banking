import React, { useState } from 'react';
import { 
  FaChartLine, FaChartPie, FaChartBar, FaChartArea, 
  FaArrowUp, FaArrowDown, FaInfoCircle, FaDownload,
  FaSearch, FaFilter, FaSort, FaEllipsisV, FaEdit,
  FaTrash, FaPlus, FaFileAlt, FaBuilding, FaHome,
  FaWarehouse, FaStore, FaHotel, FaIndustry, FaTimes,
  FaShieldAlt, FaMoneyBillWave, FaPercent, FaCalculator,
  FaHistory, FaUsers, FaExclamationTriangle, FaWrench,
  FaCalendarAlt, FaMapMarkerAlt, FaCity
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const PortfolioOverview = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  // Portfolio Summary Data
  const portfolioSummary = {
    totalValue: 12500000,
    totalReturn: 2500000,
    returnPercentage: 25,
    monthlyReturn: 85000,
    riskScore: 65,
    diversificationScore: 78,
    rentalIncome: 150000,
    occupancyRate: 92,
    maintenanceCost: 45000,
    propertyTax: 125000,
    totalProperties: 8,
    activeTenants: 12,
    pendingMaintenance: 3,
    upcomingRenewals: 2
  };

  // Property Portfolio Data
  const properties = [
    {
      id: 1,
      name: 'Luxury Apartment Complex',
      type: 'Residential',
      location: 'Mumbai, Maharashtra',
      value: 4500000,
      area: 2500,
      units: 12,
      occupancy: 11,
      rentalIncome: 60000,
      appreciation: 8.5,
      lastValuation: '2024-02-15',
      documents: ['Property Deed', 'Tax Receipts', 'Insurance Policy'],
      maintenance: [
        { date: '2024-01-15', type: 'Regular', cost: 5000, description: 'Monthly maintenance' },
        { date: '2024-02-01', type: 'Repair', cost: 15000, description: 'Plumbing repairs' }
      ],
      tenants: [
        { name: 'John Doe', unit: 'A101', rent: 5000, leaseEnd: '2024-12-31' },
        { name: 'Jane Smith', unit: 'A102', rent: 5500, leaseEnd: '2025-01-31' }
      ],
      alerts: [
        { type: 'maintenance', message: 'HVAC system needs servicing' },
        { type: 'renewal', message: '2 leases expiring next month' }
      ]
    },
    {
      id: 2,
      name: 'Commercial Plaza',
      type: 'Commercial',
      location: 'Delhi, NCR',
      value: 3500000,
      area: 5000,
      units: 8,
      occupancy: 7,
      rentalIncome: 45000,
      appreciation: 7.2,
      lastValuation: '2024-01-20',
      documents: ['Property Deed', 'Tax Receipts', 'Insurance Policy'],
      maintenance: [
        { date: '2024-01-10', type: 'Regular', cost: 8000, description: 'Monthly maintenance' },
        { date: '2024-02-05', type: 'Repair', cost: 20000, description: 'HVAC maintenance' }
      ],
      tenants: [
        { name: 'ABC Corp', unit: 'B201', rent: 8000, leaseEnd: '2024-12-31' },
        { name: 'XYZ Ltd', unit: 'B202', rent: 7500, leaseEnd: '2025-06-30' }
      ]
    },
    {
      id: 3,
      name: 'Villa Complex',
      type: 'Residential',
      location: 'Bangalore, Karnataka',
      value: 4500000,
      area: 4000,
      units: 4,
      occupancy: 4,
      rentalIncome: 45000,
      appreciation: 9.5,
      lastValuation: '2024-02-01',
      documents: ['Property Deed', 'Tax Receipts', 'Insurance Policy'],
      maintenance: [
        { date: '2024-01-20', type: 'Regular', cost: 6000, description: 'Monthly maintenance' },
        { date: '2024-02-10', type: 'Repair', cost: 12000, description: 'Garden maintenance' }
      ],
      tenants: [
        { name: 'Robert Brown', unit: 'C301', rent: 12000, leaseEnd: '2024-12-31' },
        { name: 'Sarah Wilson', unit: 'C302', rent: 11500, leaseEnd: '2025-03-31' }
      ]
    }
  ];

  // Asset Allocation Data
  const assetAllocation = {
    options: {
      chart: {
        type: 'donut',
        background: 'transparent'
      },
      labels: ['Residential', 'Commercial', 'Land', 'REITs', 'Others'],
      colors: ['#4F46E5', '#10B981', '#F59E0B', '#6366F1', '#EC4899'],
      legend: {
        position: 'bottom',
        fontSize: '14px',
        markers: {
          width: 12,
          height: 12,
          radius: 6
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontWeight: 600,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '16px',
                fontWeight: 400,
                offsetY: 16,
                formatter: (value) => `₹${value.toLocaleString()}`
              }
            }
          }
        }
      }
    },
    series: [45, 25, 15, 10, 5]
  };

  // Performance Chart Data
  const performanceData = {
    options: {
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value) => `₹${value.toLocaleString()}`
        }
      },
      tooltip: {
        y: {
          formatter: (value) => `₹${value.toLocaleString()}`
        }
      },
      colors: ['#4F46E5']
    },
    series: [{
      name: 'Portfolio Value',
      data: [10000000, 10500000, 11000000, 11500000, 12000000, 12500000]
    }]
  };

  // Rental Income Chart Data
  const rentalIncomeData = {
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          borderRadius: 4
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: '#6B7280'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value) => `₹${value.toLocaleString()}`
        }
      },
      colors: ['#10B981']
    },
    series: [{
      name: 'Rental Income',
      data: [120000, 125000, 130000, 135000, 140000, 150000]
    }]
  };

  // Property Details Modal
  const PropertyDetailsModal = ({ property, onClose }) => {
    if (!property) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{property.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{property.location}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 pb-4">
              <div className="flex space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                  Overview
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Tenants
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Maintenance
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Documents
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Alerts Section */}
            {property.alerts && property.alerts.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Alerts</h4>
                <div className="space-y-3">
                  {property.alerts.map((alert, index) => (
                    <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
                      <FaExclamationTriangle className="text-yellow-500 w-5 h-5 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-800">{alert.message}</p>
                        <p className="text-xs text-yellow-600 mt-1">
                          {alert.type === 'maintenance' ? 'Maintenance Required' : 'Lease Renewal'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Property Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaBuilding className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="text-sm font-medium">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm font-medium">{property.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaMoneyBillWave className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Current Value</p>
                      <p className="text-sm font-medium">₹{property.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaPercent className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Appreciation</p>
                      <p className="text-sm font-medium">{property.appreciation}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Occupancy Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaHome className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Total Units</p>
                      <p className="text-sm font-medium">{property.units}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaUsers className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Occupancy Rate</p>
                      <p className="text-sm font-medium">
                        {((property.occupancy / property.units) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaMoneyBillWave className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Monthly Rental Income</p>
                      <p className="text-sm font-medium">₹{property.rentalIncome.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaCalendarAlt className="text-indigo-600 w-5 h-5" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Last Valuation</p>
                      <p className="text-sm font-medium">{property.lastValuation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tenants Section */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Tenants</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rent
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lease End
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {property.tenants.map((tenant, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tenant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tenant.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          ₹{tenant.rent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {tenant.leaseEnd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Maintenance History */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Maintenance History</h4>
              <div className="space-y-4">
                {property.maintenance.map((item, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <FaWrench className="text-indigo-600 w-5 h-5" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{item.type}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ₹{item.cost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.documents.map((doc, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <FaFileAlt className="text-indigo-600 w-5 h-5" />
                    <span className="ml-3 text-sm text-gray-900">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardPageHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Portfolio Value</h3>
              <FaChartLine className="text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ₹{portfolioSummary.totalValue.toLocaleString()}
            </p>
            <div className="flex items-center text-sm">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-green-500">{portfolioSummary.monthlyReturn}% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Rental Income</h3>
              <FaMoneyBillWave className="text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ₹{portfolioSummary.rentalIncome.toLocaleString()}
            </p>
            <div className="flex items-center text-sm">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-green-500">{portfolioSummary.occupancyRate}% occupancy rate</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Maintenance Cost</h3>
              <FaWrench className="text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ₹{portfolioSummary.maintenanceCost.toLocaleString()}
            </p>
            <div className="flex items-center text-sm">
              <FaCalendarAlt className="text-gray-500 mr-1" />
              <span className="text-gray-500">Monthly average</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Property Tax</h3>
              <FaFileAlt className="text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ₹{portfolioSummary.propertyTax.toLocaleString()}
            </p>
            <div className="flex items-center text-sm">
              <FaCalendarAlt className="text-gray-500 mr-1" />
              <span className="text-gray-500">Annual</span>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Value Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Value Trend</h3>
              <div className="flex items-center space-x-2">
                {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      timeRange === range
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80">
              <ReactApexChart
                options={performanceData.options}
                series={performanceData.series}
                type="area"
                height="100%"
              />
            </div>
          </div>

          {/* Rental Income Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Rental Income Trend</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <FaDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <ReactApexChart
                options={rentalIncomeData.options}
                series={rentalIncomeData.series}
                type="bar"
                height="100%"
              />
            </div>
          </div>
        </div>

        {/* Asset Allocation and Properties */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Asset Allocation */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
            <div className="h-64">
              <ReactApexChart
                options={assetAllocation.options}
                series={assetAllocation.series}
                type="donut"
                height="100%"
              />
            </div>
          </div>

          {/* Properties List */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaFilter className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    <FaSort className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaDownload className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedProperty(property);
                    setShowPropertyDetails(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{property.name}</h4>
                      <p className="text-sm text-gray-500">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        ₹{property.value.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">+{property.appreciation}%</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="text-sm font-medium">{property.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Units</p>
                      <p className="text-sm font-medium">{property.units}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Income</p>
                      <p className="text-sm font-medium">₹{property.rentalIncome.toLocaleString()}</p>
                    </div>
                  </div>
                  {property.alerts && property.alerts.length > 0 && (
                    <div className="mt-4 flex items-center text-yellow-600 text-sm">
                      <FaExclamationTriangle className="w-4 h-4 mr-2" />
                      <span>{property.alerts.length} alerts</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Property Details Modal */}
      {showPropertyDetails && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => {
            setShowPropertyDetails(false);
            setSelectedProperty(null);
          }}
        />
      )}

      <DashboardPageFooter />
    </div>
  );
};

export default PortfolioOverview; 