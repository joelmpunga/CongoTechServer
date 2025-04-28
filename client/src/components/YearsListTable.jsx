
export default function YearsListTable({thBref, thDebut, thFin, children }) {


    return (
        <div className="">
            <div className="overflow-hidden border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">{thBref}</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">{thDebut}</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">{thFin}</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">En cours</th>
                        </tr>
                    </thead>
                    {children}
                </table>
            </div>
        </div>
    );
}
