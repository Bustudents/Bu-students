const EventLegend = () => {
  const legendItems = [
    { color: "bg-[#f09636]", label: "Important Event" },
    { color: "bg-red-500", label: "Assignment Due  3 days)" },
    { color: "bg-blue-500", label: "Upcoming Assignment " },
    { color: "bg-gray-400", label: "General Event" },
  ];

  return (
    <div className="bg-gray-800  text-white p-4 ml-0 rounded-lg shadow-md z-10 w-[300px] max-w-md">
      <h3 className="text-lg font-bold z-10 mb-3">Event Color Guide</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className={`w-4 h-4 z-10 rounded-full ${item.color}`}></span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventLegend;
