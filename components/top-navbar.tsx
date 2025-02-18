import { Lightbulb, MessageSquare, Search, Settings } from "lucide-react";

const Header = () => {
	return (
		<div className="fixed left-12 top-0 w-[calc(100%-3rem)] h-12 bg-gray-100 flex items-center px-4 shadow-md z-50">
			<span className="text-blue-600 font-semibold mr-4">Outlook</span>
			<div className="flex items-center bg-white border rounded-md px-2 py-1 w-64">
				<Search className="w-4 h-4 text-gray-500 mr-2" />
				<input
					type="text"
					placeholder="Search"
					className="outline-none text-sm w-full"
				/>
			</div>
			<div className="flex items-center ml-auto space-x-4">
				<MessageSquare className="w-5 h-5 text-gray-600" />
				<Lightbulb className="w-5 h-5 text-gray-600" />
				<Settings className="w-5 h-5 text-gray-600" />
			</div>
		</div>
	);
};
export { Header };
