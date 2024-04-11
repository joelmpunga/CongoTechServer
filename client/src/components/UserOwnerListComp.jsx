
export default function UserOwnerListComp({thtypePostNom, thDecrEmail, thStatusRole, children }) {


    return (
        <div className="">
            <div className="overflow-hidden border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nom</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">{thtypePostNom}</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">{thDecrEmail}</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">{thStatusRole}</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    {children}
                </table>
            </div>
        </div>
    );
}
