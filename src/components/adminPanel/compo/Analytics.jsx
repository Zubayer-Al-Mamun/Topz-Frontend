import DashboardSidebar from "../DashboardSidebar";

export default function Analytics() {
    return (
        
                <main className="flex-1 p-6 overflow-y-auto space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 shadow">
                            <h2 className="text-lg font-semibold">
                                Website Analytics
                                
                            </h2>
                            <p className="text-sm opacity-80 mb-4">
                                Total 28.5k Visitors this month
                            </p>
                            <div className="flex gap-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-2xl">
                                        1.2k
                                    </span>
                                    <span className="text-sm">Leads</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-2xl">
                                        3.4k
                                    </span>
                                    <span className="text-sm">Conversions</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <h2 className="text-sm font-medium">
                                Average Daily Sales
                            </h2>
                            <p className="text-2xl font-bold">$28,450</p>
                            <div className="h-16 bg-gray-100 rounded mt-3 flex items-center justify-center">
                                Chart
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <h2 className="text-sm font-medium">
                                Sales Overview
                            </h2>
                            <p className="text-2xl font-bold">$42.5k</p>
                            <p className="text-green-500 text-sm">+18.5%</p>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <h2 className="font-medium">Earning Reports</h2>
                            <p className="text-2xl font-bold">$468</p>
                            <div className="flex justify-between mt-4 text-sm">
                                <span>Earnings</span>
                                <span className="font-semibold">$545.69</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Profit</span>
                                <span className="font-semibold">$256.34</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Expense</span>
                                <span className="font-semibold">$74.19</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <h2 className="font-medium">Support Tracker</h2>
                            <p className="text-2xl font-bold">164</p>
                            <div className="mt-4 h-20 flex items-center justify-center bg-gray-100 rounded">
                                Circular Chart
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <h2 className="font-medium">Total Earning</h2>
                            <p className="text-2xl font-bold">87%</p>
                            <p className="text-green-500 text-sm">+9.5%</p>
                        </div>
                    </div>
                </main>

    );
}
