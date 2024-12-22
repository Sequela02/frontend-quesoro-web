import { FC, useState } from "react";
import styled from "styled-components";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  FaUsers,
  FaBox,
  FaUserCog,
  FaExchangeAlt,
  FaBell,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContainer = styled.div.attrs({
  className: "p-6 bg-gray-50 min-h-screen",
})``;

const Header = styled.header.attrs({
  className:
    "flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm",
})``;

const StatsGrid = styled.div.attrs({
  className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
})``;

const Card = styled.div.attrs({
  className: "bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md",
})``;

const WarningCard = styled(Card).attrs({
  className: "border-l-4 border-yellow-500",
})``;

const ChartContainer = styled.div.attrs({
  className: "bg-white rounded-xl shadow-sm p-6 mb-8",
})``;

const TableContainer = styled.div.attrs({
  className: "bg-white rounded-xl shadow-sm p-6",
})``;

const mockClients = [
  {
    name: "Abarrotes INNA",
    sector: "2",
    colonia: "Capacho",
    ciudad: "Huandacareo",
    ruta: "3811",
    especial: "No",
    pago: "Credito",
  },
  {
    name: "Abarrotes la cruz",
    sector: "2",
    colonia: "Capacho",
    ciudad: "Hundacareo",
    ruta: "3811",
    especial: "No",
    pago: "Credito",
  },
  {
    name: "Abarrotes yazmin",
    sector: "2",
    colonia: "Capacho",
    ciudad: "Huandacareo",
    ruta: "3811",
    especial: "No",
    pago: "Credito",
  },
  {
    name: "Abarrotes Carol",
    sector: "2",
    colonia: "Capacho",
    ciudad: "Michuacan",
    ruta: "3811",
    especial: "No",
    pago: "Credito",
  },
];

const warnings = [
  { id: 1, message: "Stock bajo en Queso Fresco", severity: "high" },
  {
    id: 2,
    message: "3 pagos pendientes requieren atención",
    severity: "medium",
  },
  { id: 3, message: "Mantenimiento programado para mañana", severity: "low" },

];

const Dashboard: FC = () => {
  const [activeTab] = useState("overview");

  const lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ventas 2024",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Ventas 2023",
        data: [8, 12, 3, 4, 2, 1],
        borderColor: "#EC4899",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Lácteos", "Quesos", "Yogurt", "Mantequilla"],
    datasets: [
      {
        label: "Ventas por Categoría",
        data: [65, 59, 80, 81],
        backgroundColor: [
          "rgba(139, 92, 246, 0.6)",
          "rgba(236, 72, 153, 0.6)",
          "rgba(34, 211, 238, 0.6)",
          "rgba(248, 113, 113, 0.6)",
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["Completado", "En Proceso", "Pendiente"],
    datasets: [
      {
        data: [63, 25, 12],
        backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
      },
    ],
  };

  return (
    <DashboardContainer>
      <Header>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Bienvenido de nuevo</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaBell className="text-gray-600" />
          </button>
       
        </div>
      </Header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {warnings.map((warning) => (
          <WarningCard key={warning.id}>
            <div className="flex items-start gap-4">
              <FaExclamationTriangle
                className={`text-2xl ${
                  warning.severity === "high"
                    ? "text-red-500"
                    : warning.severity === "medium"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              />
              <div>
                <h3 className="font-medium mb-1">Advertencia</h3>
                <p className="text-sm text-gray-600">{warning.message}</p>
              </div>
            </div>
          </WarningCard>
        ))}
      </div>

      <StatsGrid>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaUsers className="text-xl text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Total Clientes</h3>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="text-green-500 mr-2" />
            <span className="text-green-500">+5.2%</span>
            <span className="text-gray-500 ml-2">vs mes anterior</span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaBox className="text-xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Total Productos</h3>
              <p className="text-2xl font-bold">345</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="text-red-500 mr-2" />
            <span className="text-red-500">-1.2%</span>
            <span className="text-gray-500 ml-2">vs mes anterior</span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaUserCog className="text-xl text-yellow-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Usuarios</h3>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="text-green-500 mr-2" />
            <span className="text-green-500">+10.5%</span>
            <span className="text-gray-500 ml-2">vs mes anterior</span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <FaExchangeAlt className="text-xl text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Ventas</h3>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="text-red-500 mr-2" />
            <span className="text-red-500">-5.2%</span>
            <span className="text-gray-500 ml-2">vs mes anterior</span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FaExchangeAlt className="text-xl text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Total Giros</h3>
              <p className="text-2xl font-bold">567</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="text-green-500 mr-2" />
            <span className="text-green-500">+3.8%</span>
            <span className="text-gray-500 ml-2">vs mes anterior</span>
          </div>
        </Card>

        {/* Similar cards for other stats */}
      </StatsGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartContainer>
          <h2 className="text-lg font-semibold mb-4">Tendencia de Ventas</h2>
          <Line data={lineChartData} />
        </ChartContainer>

        <ChartContainer>
          <h2 className="text-lg font-semibold mb-4">Ventas por Categoría</h2>
          <Bar data={barChartData} />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <ChartContainer>
          <h2 className="text-lg font-semibold mb-4">Estado de Pedidos</h2>
          <Doughnut data={doughnutData} />
        </ChartContainer>
      </div>

      <TableContainer>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Últimos Clientes</h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Ver todos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Sector</th>
                <th className="text-left py-3 px-4">Colonia</th>
                <th className="text-left py-3 px-4">Ciudad</th>
                <th className="text-left py-3 px-4">Ruta</th>
                <th className="text-left py-3 px-4">Precio Especial</th>
                <th className="text-left py-3 px-4">Tipo de Pago</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{client.name}</td>
                  <td className="py-3 px-4">{client.sector}</td>
                  <td className="py-3 px-4">{client.colonia}</td>
                  <td className="py-3 px-4">{client.ciudad}</td>
                  <td className="py-3 px-4">{client.ruta}</td>
                  <td className="py-3 px-4">{client.especial}</td>
                  <td className="py-3 px-4">{client.pago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
