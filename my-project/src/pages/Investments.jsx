import { FaChartLine, FaLandmark, FaCoins, FaCheck } from 'react-icons/fa'

const Investments = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Solutions</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Grow your wealth with our range of investment products and expert guidance.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Investment Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <FaChartLine className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stocks & ETFs</h3>
            <p className="text-gray-600 mb-6">Invest in a diverse range of stocks and exchange-traded funds.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Global markets access
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Low trading fees
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Real-time analytics
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Expert research
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Start Investing
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <FaLandmark className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fixed Deposits</h3>
            <p className="text-gray-600 mb-6">Secure your future with guaranteed returns on fixed deposits.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> High interest rates
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Flexible tenures
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Auto-renewal
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Monthly payouts
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Learn More
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <FaCoins className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mutual Funds</h3>
            <p className="text-gray-600 mb-6">Diversify your portfolio with professionally managed funds.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Expert management
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Regular income
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> Tax benefits
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" /> SIP options
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Explore Funds
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Investment Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">Get personalized investment advice from our financial experts.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Diversification</h3>
              <p className="text-gray-600">Spread your investments across various asset classes.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Regular Updates</h3>
              <p className="text-gray-600">Stay informed with real-time market updates and insights.</p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Investment Calculator</h2>
          <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6">Returns Calculator</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return (%)</label>
                <input
                  type="number"
                  placeholder="Enter rate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Period (years)</label>
                <input
                  type="number"
                  placeholder="Enter period"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Calculate Returns
              </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Investment Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Take the first step towards building your wealth with our investment solutions.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors">
            Begin Investing
          </button>
        </section>
      </div>
    </div>
  )
}

export default Investments 